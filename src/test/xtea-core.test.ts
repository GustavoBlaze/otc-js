/* eslint-disable no-lone-blocks */
/* eslint-disable no-undef */
import assert from "node:assert";
import { randomBytes } from "node:crypto";
import * as XTEA from "../utils/crypt/xtea-core";

const randomKey = randomBytes(16);
const strToEncrypt = "This string must be % 8 == 0";

{
  console.log("Testing xtea-core.test.ts");
  let bufferToEncrypt = Buffer.from(strToEncrypt);

  if (bufferToEncrypt.length % 8 != 0) {
    const paddingLength = 8 - (bufferToEncrypt.length % 8);
    const padding = Buffer.alloc(paddingLength, 0);
    bufferToEncrypt = Buffer.concat([bufferToEncrypt, padding]);
  }

  let encryptedBuffer = null;

  console.log("\t- Encrypting...");
  {
    const data = Buffer.from(bufferToEncrypt);
    const key = Uint32Array.from([
      randomKey.readUInt32LE(0),
      randomKey.readUInt32LE(4),
      randomKey.readUInt32LE(8),
      randomKey.readUInt32LE(12),
    ]);

    XTEA.encrypt({ data, key });
    encryptedBuffer = data;
  }

  let decryptedBuffer = null;
  console.log("\t- Decrypting...");

  {
    const data = Buffer.from(encryptedBuffer);

    const key = Uint32Array.from([
      randomKey.readUInt32LE(0),
      randomKey.readUInt32LE(4),
      randomKey.readUInt32LE(8),
      randomKey.readUInt32LE(12),
    ]);

    XTEA.decrypt({ data, key });

    decryptedBuffer = data;
  }

  assert(
    bufferToEncrypt.toString() === decryptedBuffer.toString(),
    "Invalid decrypted buffer"
  );

  console.log("\t- Test passed!\n");
}
