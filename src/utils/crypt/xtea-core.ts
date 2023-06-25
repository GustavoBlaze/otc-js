const DELTA = 0x61c88647;

type Props = {
  data: Buffer;
  key: Uint32Array;
};

export function decrypt({ data, key }: Props) {
  let readPos = 0;

  while (readPos < data.length) {
    let v0 = data.readUInt32LE(readPos) >>> 0;
    let v1 = data.readUInt32LE(readPos + 4) >>> 0;

    let sum = 0xc6ef3720;

    for (let i = 0; i < 32; i++) {
      v1 -=
        ((((v0 << 4) >>> 0) ^ (v0 >>> 5)) + v0) ^ (sum + key[(sum >> 11) & 3]);
      v1 >>>= 0;
      sum = (sum + DELTA) >>> 0;
      v0 -= ((((v1 << 4) >>> 0) ^ (v1 >>> 5)) + v1) ^ (sum + key[sum & 3]);
      v0 >>>= 0;
    }

    data.writeUInt32LE(v0, readPos);
    data.writeUInt32LE(v1, readPos + 4);
    readPos += 2 * 4;
  }
}

export function encrypt({ data, key }: Props) {
  let readPos = 0;

  while (readPos < data.length) {
    let v0 = data.readUInt32LE(readPos);
    let v1 = data.readUInt32LE(readPos + 4);

    let sum = 0;

    for (let i = 0; i < 32; i++) {
      v0 += ((((v1 << 4) >>> 0) ^ (v1 >>> 5)) + v1) ^ (sum + key[sum & 3]);
      v0 >>>= 0;
      sum = (sum - DELTA) >>> 0;
      v1 +=
        ((((v0 << 4) >>> 0) ^ (v0 >>> 5)) + v0) ^ (sum + key[(sum >> 11) & 3]);
      v1 >>>= 0;
    }

    data.writeUInt32LE(v0, readPos);
    data.writeUInt32LE(v1, readPos + 4);
    readPos += 2 * 4;
  }
}
