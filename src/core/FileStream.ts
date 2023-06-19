import fs from "node:fs";
import { Buffer } from "node:buffer";
import { assert } from "node:console";

type FileStreamMode = "r";

type FileDescriptor = number;

// Only for reading
export default class FileStream {
  private _file?: FileDescriptor;

  private _bytesRead = 0;

  get bytesRead() {
    return this._bytesRead;
  }

  open(file: string, mode: FileStreamMode = "r") {
    this._bytesRead = 0;
    this._file = fs.openSync(file, mode);
  }

  close() {
    this.isFileOpen();
    fs.closeSync(this._file!);
  }

  isFileOpen() {
    assert(this._file, "Try to use a closed file stream");
  }

  private fsReadSync(buffer: Buffer, size: number) {
    this.isFileOpen();
    const bytesRead = fs.readSync(this._file!, buffer, 0, size, null);
    this._bytesRead += bytesRead;
    return bytesRead;
  }

  getU8() {
    this.isFileOpen();

    const buffer = Buffer.allocUnsafe(1);
    this.fsReadSync(buffer, 1);
    return buffer.readUInt8(0);
  }

  getU16() {
    this.isFileOpen();

    const buffer = Buffer.allocUnsafe(2);
    this.fsReadSync(buffer, 2);
    return buffer.readUInt16LE(0);
  }

  getU32() {
    this.isFileOpen();

    const buffer = Buffer.allocUnsafe(4);
    this.fsReadSync(buffer, 4);
    return buffer.readUInt32LE(0);
  }

  getU64() {
    this.isFileOpen();

    const buffer = Buffer.allocUnsafe(8);
    this.fsReadSync(buffer, 8);
    return buffer.readBigUInt64LE(0);
  }

  get8() {
    this.isFileOpen();

    const buffer = Buffer.allocUnsafe(1);
    this.fsReadSync(buffer, 1);
    return buffer.readInt8(0);
  }

  get16() {
    this.isFileOpen();

    const buffer = Buffer.allocUnsafe(2);
    this.fsReadSync(buffer, 2);
    return buffer.readInt16LE(0);
  }

  get32() {
    this.isFileOpen();

    const buffer = Buffer.allocUnsafe(4);
    this.fsReadSync(buffer, 4);
    return buffer.readInt32LE(0);
  }

  get64() {
    this.isFileOpen();

    const buffer = Buffer.allocUnsafe(8);
    this.fsReadSync(buffer, 8);
    return buffer.readBigInt64LE(0);
  }

  getString() {
    this.isFileOpen();
    const len = this.getU16();

    if (len === 0 || len >= 8192) {
      throw new Error(`[FileStream]: Invalid string length (${len})`);
    }

    const buffer = Buffer.allocUnsafe(len);
    this.fsReadSync(buffer, len);
    return buffer.toString("ascii"); // or UTF8? i don't know
  }

  read(buffer: Buffer, size: number) {
    this.isFileOpen();
    this.fsReadSync(buffer, size);
  }
}
