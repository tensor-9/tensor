#include <pspkernel.h>

PSP_MODULE_INFO("tensor_psp_fixture", 0, 1, 0);
#ifndef TENSOR_PSP_GLOBAL
#define TENSOR_PSP_GLOBAL 7
#endif
volatile unsigned int tensor_psp_global = TENSOR_PSP_GLOBAL;
const char tensor_psp_marker[] = "tensor-psp-source-owned-fixture";
unsigned int tensor_psp_probe(void);

__attribute__((noinline)) unsigned int tensor_psp_leaf(unsigned int value) {
  return value * 3u + tensor_psp_global;
}
__attribute__((noinline)) unsigned int tensor_psp_entry(unsigned int selector) {
  unsigned int adjusted = selector > 10u ? selector : selector + 1u;
  return tensor_psp_leaf(adjusted) + tensor_psp_probe();
}
int main(void) {
  return (int)tensor_psp_entry(11u);
}
