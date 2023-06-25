export function adler32(buffer) {
  let size = buffer.length;
  let a = 1;
  let b = 0;
  let i = 0;
  let tlen;

  while (size > 0) {
    tlen = size > 5552 ? 5552 : size;
    size -= tlen;

    do {
      a += buffer[i++];
      b += a;
    } while (--tlen);

    a %= 65521;
    b %= 65521;
  }

  return ((b << 16) | a) >>> 0;
}
