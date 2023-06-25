/* eslint-disable no-lone-blocks */
/* eslint-disable no-undef */
import assert from "node:assert";
import { randomBytes } from "node:crypto";
import * as XTEA from "../src/utils/crypt/xtea-core";

const key = randomBytes(32);
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

    XTEA.encrypt({ data, key: Uint32Array.from(key) });
    encryptedBuffer = data;
  }

  let decryptedBuffer = null;
  console.log("\t- Decrypting...");

  {
    const data = Buffer.from(encryptedBuffer);

    XTEA.decrypt({ data, key: Uint32Array.from(key) });

    decryptedBuffer = data;
  }

  assert(
    bufferToEncrypt.toString() === decryptedBuffer.toString(),
    "Invalid decrypted buffer"
  );

  console.log("\t- Test passed!\n");
}
