#include <napi.h>

typedef struct TSLanguage TSLanguage;

extern "C" TSLanguage *tree_sitter_razen();

namespace {

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports["name"] = Napi::String::New(env, "razen");
  auto language = Napi::External<TSLanguage>::New(env, tree_sitter_razen());
  exports["language"] = language;
  return exports;
}

NODE_API_MODULE(tree_sitter_razen_binding, Init)

}
