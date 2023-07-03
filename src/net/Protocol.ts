import { Socket } from "node:net";
import { randomBytes } from "node:crypto";

import { XTEA } from "~/utils/crypt";

import OutputMessage from "./OutputMessage";
import InputMessage from "./InputMessage";

const READ_TIMEOUT = 30 * 1000;
// const WRITE_TIMEOUT = 30 * 1000;
// const SEND_BUFFER_SIZE = 65536;
// const RECEIVE_BUFFER_SIZE = 65536;

export default class Protocol {
  private _host = "";

  private _port = 7171;

  private _connected = false;

  private _connecting = false;

  private _socket?: Socket;

  private _xteaEncryptionEnabled = false;

  private _checksumEnabled = false;

  private _inputMessage: InputMessage;

  private _xteaKey: Buffer = Buffer.alloc(4 * 4); // 32 bits (4 bytes)  * 4 = 128 bits (16 bytes)

  get host() {
    return this._host;
  }

  get port() {
    return this._port;
  }

  get isConnected() {
    return this._connected;
  }

  get isConnecting() {
    return this._connecting;
  }

  constructor() {
    this._inputMessage = new InputMessage();
  }

  enableXTEAEncryption() {
    this._xteaEncryptionEnabled = true;
  }

  enableChecksum() {
    this._checksumEnabled = true;
  }

  generateXTEAKey() {
    this._xteaKey = randomBytes(16);
  }

  getXTEAKey() {
    return Uint32Array.from([
      this._xteaKey.readUInt32LE(0),
      this._xteaKey.readUInt32LE(4),
      this._xteaKey.readUInt32LE(8),
      this._xteaKey.readUInt32LE(12),
    ]);
  }

  disconnect() {
    this._socket?.destroy();
  }

  connect(host: string, port: number) {
    this._host = host;
    this._port = port;
    this._connected = false;
    this._connecting = true;
    this._socket = new Socket();

    this._socket.setTimeout(READ_TIMEOUT);

    this._socket.on("data", this.handleSocketData.bind(this));
    this._socket.on("timeout", this.handleSocketTimeout.bind(this));
    this._socket.on("close", this.handleSocketClose.bind(this));
    this._socket.on("error", this.handleSocketError.bind(this));

    console.log(`[Protocol]: Connecting to ${host}:${port}`);
    this._socket.connect(port, host, this.handleConnect.bind(this));
  }

  protected handleConnect() {
    this._connected = true;
    this._connecting = false;

    console.log(`[Protocol]: Connected to ${this._host}:${this._port} successfully`);
  }

  private handleSocketTimeout() {
    this._connected = false;
    this._connecting = false;

    console.log("[Protocol]: Socket timeout");
  }

  private handleSocketClose(hadError: boolean) {
    this._connected = false;
    this._connecting = false;

    console.log(`[Protocol]: Socket close ${hadError ? "with error" : "without error"}`);
  }

  private handleSocketError(error: Error) {
    console.log(`[Protocol]: Socket error: ${error.message}`);
  }

  private handleSocketData(data: Buffer) {
    this._inputMessage.reset();

    let headerSize = 2;

    if (this._checksumEnabled) {
      headerSize += 4;
    }

    if (this._xteaEncryptionEnabled) {
      headerSize += 2;
    }

    this._inputMessage.setHeaderSize(headerSize);

    this.internalReceiveHeader(data, 2);
  }

  private internalReceiveHeader(data: Buffer, size: number) {
    this._inputMessage.fillBuffer(data, size);

    const remainingSize = this._inputMessage.readSize();
    const remainingData = data.subarray(2, remainingSize + 2);

    this.internalReceiveData(remainingData, remainingSize);
  }

  private internalReceiveData(data: Buffer, size: number) {
    if (!this.isConnected) {
      console.log("[Protocol]: Received data while disconnected");
      return;
    }

    this._inputMessage.fillBuffer(data, size);

    if (this._checksumEnabled) {
      const validChecksum = this._inputMessage.hasValidChecksum();
      if (!validChecksum) {
        console.log("[Protocol]: Got a network message with invalid checksum");
        return;
      }
    }

    if (this._xteaEncryptionEnabled) {
      if (!XTEA.decrypt(this._inputMessage, this.getXTEAKey())) {
        console.log("[Protocol]: Got a network message with invalid XTEA encryption");
        return;
      }
    }

    this.onReceive(this._inputMessage);
  }

  protected onReceive(message: InputMessage): void {}

  send(outputMessage: OutputMessage) {
    if (this._xteaEncryptionEnabled) {
      XTEA.encrypt(outputMessage, this.getXTEAKey());
    }

    if (this._checksumEnabled) {
      outputMessage.writeChecksum();
    }

    outputMessage.writeMessageSize();

    if (this._socket && this._connected) {
      const message = outputMessage.getHeaderBuffer();

      this._socket.write(message.subarray(0, outputMessage.getMessageSize()));
    } else {
      console.log("[Protocol]: Tried to send a message while disconnected");
    }

    outputMessage.reset();
  }
}
