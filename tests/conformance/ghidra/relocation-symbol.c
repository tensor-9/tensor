/* Static ELF fixture: no target code is executed by the verifier. */
extern int tensor_external(int);
int (*volatile tensor_external_slot)(int) = tensor_external;
__attribute__((visibility("hidden"), noinline, used)) int tensor_local(int value) {
  return value + 1;
}
int (*volatile tensor_local_slot)(int) = tensor_local;
