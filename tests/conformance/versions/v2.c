#include <stdio.h>
__attribute__((noinline, used)) int tensor_version_leaf(void) {
  puts("TENSOR_VERSION_TWO");
  return 2;
}
__attribute__((noinline, used)) int tensor_added(void) { return 40; }
__attribute__((noinline, used)) int tensor_version_entry(void) {
  return tensor_version_leaf() + tensor_added();
}
int main(void) { return tensor_version_entry() == 42 ? 0 : 1; }
