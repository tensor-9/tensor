#include <stdio.h>
__attribute__((noinline, used)) int tensor_version_leaf(void) {
  puts("TENSOR_VERSION_ONE");
  return 1;
}
__attribute__((noinline, used)) int tensor_version_entry(void) {
  return tensor_version_leaf();
}
int main(void) { return tensor_version_entry() == 1 ? 0 : 1; }
