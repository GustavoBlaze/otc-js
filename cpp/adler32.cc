#include <napi.h>

uint32_t localAdler32(Napi::Buffer<char> buffer) {
    size_t size = buffer.Length();
    size_t a = 1, b = 0, tlen, i = 0;

    while(size > 0) {
        tlen = size > 5552 ? 5552 : size;
        size -= tlen;
        do {
            a += buffer[i++];
            b += a;
        } while (--tlen);

        a %= 65521;
        b %= 65521;
    }
    return (b << 16) | a;
}

Napi::Value Adler32(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1) {
    Napi::TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
    return env.Null();
  }

  if (!info[0].IsBuffer()) {
    Napi::TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    return env.Null();
  }

  Napi::Buffer<char> buffer = info[0].As<Napi::Buffer<char>>();
  uint32_t adler = localAdler32(buffer);

  return Napi::Number::New(env, adler);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "adler32"),
              Napi::Function::New(env, Adler32));
  return exports;
}

NODE_API_MODULE(adler32, Init)
