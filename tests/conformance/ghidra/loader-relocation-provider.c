typedef unsigned int tensor_loader_word;

__attribute__((visibility("default")))
tensor_loader_word tensor_external(int value) {
  return (tensor_loader_word)value + 3u;
}

__attribute__((visibility("default")))
tensor_loader_word tensor_external_value = 0x22222222u;

__attribute__((visibility("default")))
const tensor_loader_word tensor_external_const = 0x11111111u;

__attribute__((visibility("default")))
__thread tensor_loader_word tensor_external_tls = 0x33333333u;
