import fs from "node:fs";
import { Buffer } from "node:buffer";
import { assert } from "node:console";

type FileStreamMode = "r";

type FileDescriptor = number;

// Only for reading
export default class FileStream {
  private _file?: FileDescriptor;

  open(file: string, mode: FileStreamMode = "r") {
    this._file = fs.openSync(file, mode);
  }

  close() {
    this.isFileOpen();
    fs.closeSync(this._file!);
  }

  isFileOpen() {
    assert(this._file, "Try to use a closed file stream");
  }

  getU8() {
    this.isFileOpen();

    const buffer = Buffer.allocUnsafe(1);
    fs.readSync(this._file!, buffer, 0, 1, null);
    return buffer.readUInt8(0);
  }

  getU16() {
    this.isFileOpen();

    const buffer = Buffer.allocUnsafe(2);
    fs.readSync(this._file!, buffer, 0, 2, null);
    return buffer.readUInt16LE(0);
  }

  getU32() {
    this.isFileOpen();

    const buffer = Buffer.allocUnsafe(4);
    fs.readSync(this._file!, buffer, 0, 4, null);
    return buffer.readUInt32LE(0);
  }

  getU64() {
    this.isFileOpen();

    const buffer = Buffer.allocUnsafe(8);
    fs.readSync(this._file!, buffer, 0, 8, null);
    return buffer.readBigUInt64LE(0);
  }

  get8() {
    this.isFileOpen();

    const buffer = Buffer.allocUnsafe(1);
    fs.readSync(this._file!, buffer, 0, 1, null);
    return buffer.readInt8(0);
  }

  get16() {
    this.isFileOpen();

    const buffer = Buffer.allocUnsafe(2);
    fs.readSync(this._file!, buffer, 0, 2, null);
    return buffer.readInt16LE(0);
  }

  get32() {
    this.isFileOpen();

    const buffer = Buffer.allocUnsafe(4);
    fs.readSync(this._file!, buffer, 0, 4, null);
    return buffer.readInt32LE(0);
  }

  get64() {
    this.isFileOpen();

    const buffer = Buffer.allocUnsafe(8);
    fs.readSync(this._file!, buffer, 0, 8, null);
    return buffer.readBigInt64LE(0);
  }

  getString() {
    this.isFileOpen();
    const len = this.getU16();

    if (len === 0 || len >= 8192) {
      throw new Error(`[FileStream]: Invalid string length (${len})`);
    }

    const buffer = Buffer.allocUnsafe(len);
    fs.readSync(this._file!, buffer, 0, len, null);
    return buffer.toString("ascii"); // or UTF8? i don't know
  }

  read(buffer: Buffer, size: number) {
    this.isFileOpen();
    fs.readSync(this._file!, buffer, 0, size, null);
  }
}
