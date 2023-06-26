import OutputMessage from "~/net/OutputMessage";
import InputMessage from "~/net/InputMessage";

import * as XTEA_CORE from "./xtea-core";

export function decrypt(message: InputMessage, key: Uint32Array): Boolean {
  const encryptedSize = message.getUnreadSize();

  if (encryptedSize % 8 != 0) {
    console.log("[XTEA]: invalid encrypted message size");
    return false;
  }

  const buffer = message.getReadBuffer();

  XTEA_CORE.decrypt({ data: buffer, key });

  const decryptedSize = message.getU16() + 2;

  const sizeDelta = decryptedSize - encryptedSize;

  if (sizeDelta > 0 || -sizeDelta > encryptedSize) {
    console.log("[XTEA]: invalid decrypted network message");
    return false;
  }

  message.setMessageSize(message.getMessageSize() + sizeDelta);
  return true;
}

export function encrypt(outputMessage: OutputMessage, key: Uint32Array): void {
  outputMessage.writeMessageSize();
  let encryptedSize = outputMessage.getMessageSize();

  // add padding bytes if it needs
  if (encryptedSize % 8 != 0) {
    const padding = 8 - (encryptedSize % 8);
    outputMessage.addPaddingBytes(padding, 0);
    encryptedSize += padding;
  }

  const buffer = outputMessage.getDataBuffer(-2);

  XTEA_CORE.encrypt({ data: buffer, key });
}
