import fs from "node:fs/promises";
import { Buffer } from "node:buffer";
import { assert } from "node:console";

type FileStreamMode = "r";

// Only for reading
export default class FileStream {
  private _file?: fs.FileHandle;

  async open(file: string, mode: FileStreamMode = "r") {
    this._file = await fs.open(file, mode);
  }

  async close() {
    await this._file?.close();
  }

  isFileOpen() {
    assert(this._file, "Try to use a closed file stream");
  }

  async getU8() {
    this.isFileOpen();

    const buffer = Buffer.allocUnsafe(1);
    await this._file?.read(buffer, 0, 1);
    return buffer.readUInt8(0);
  }

  async getU16() {
    this.isFileOpen();

    const buffer = Buffer.allocUnsafe(2);
    await this._file?.read(buffer, 0, 2);
    return buffer.readUInt16LE(0);
  }

  async getU32() {
    this.isFileOpen();

    const buffer = Buffer.allocUnsafe(4);
    await this._file?.read(buffer, 0, 4);
    return buffer.readUInt32LE(0);
  }

  async getU64() {
    this.isFileOpen();

    const buffer = Buffer.allocUnsafe(8);
    await this._file?.read(buffer, 0, 8);
    return buffer.readBigUInt64LE(0);
  }

  async get8() {
    this.isFileOpen();

    const buffer = Buffer.allocUnsafe(1);
    await this._file?.read(buffer, 0, 1);
    return buffer.readInt8(0);
  }

  async get16() {
    this.isFileOpen();

    const buffer = Buffer.allocUnsafe(2);
    await this._file?.read(buffer, 0, 2);
    return buffer.readInt16LE(0);
  }

  async get32() {
    this.isFileOpen();

    const buffer = Buffer.allocUnsafe(4);
    await this._file?.read(buffer, 0, 4);
    return buffer.readInt32LE(0);
  }

  async get64() {
    this.isFileOpen();

    const buffer = Buffer.allocUnsafe(8);
    await this._file?.read(buffer, 0, 8);
    return buffer.readBigInt64LE(0);
  }

  async getString() {
    this.isFileOpen();
    const len = await this.getU16();

    if (len === 0 || len > 8192) {
      throw new Error(`[FileStream]: Invalid string length (${len})`);
    }

    const buffer = Buffer.allocUnsafe(len);
    await this._file?.read(buffer, 0, len);
    return buffer.toString("ascii"); // or UTF8? i don't know
  }

  async read(buffer: Buffer, size: number) {
    this.isFileOpen();
    await this._file?.read(buffer, 0, size);
  }
}
