/* Source-owned Linux ELF fixture for the Ghidra loader-relocation boundary. */
typedef unsigned int tensor_loader_word;

/* This file-backed value is the constant the unprotected decompiler may fold. */
__attribute__((used, visibility("default")))
const tensor_loader_word tensor_loader_value = 0x11111111u;

#if defined(__ELF__)
#define TENSOR_LOADER_POINTER_SECTION ".data.rel.ro"
#elif defined(__APPLE__)
#define TENSOR_LOADER_POINTER_SECTION "__DATA_CONST,__const"
#else
#error "The loader-relocation fixture requires an ELF or Mach-O compiler"
#endif

/* The loader fills this pointer before its RELRO block is sealed read-only. */
__attribute__((used, visibility("default"), section(TENSOR_LOADER_POINTER_SECTION)))
const tensor_loader_word *volatile const tensor_loader_pointer = &tensor_loader_value;

/* A const object defined by the provider. In a PIE, GCC and the linker copy
 * it into RELRO with a copy relocation that Ghidra cannot apply, so the file
 * holds zero where the loader writes the provider's value: the #4177 shape. */
extern const tensor_loader_word tensor_external_const;

__attribute__((noinline, used, visibility("default")))
tensor_loader_word tensor_loader_reader(void) {
  return tensor_external_const;
}

__attribute__((noinline, used, visibility("default")))
void tensor_loader_writer(void) {
  *(volatile tensor_loader_word *)(void *)&tensor_external_const = 0;
}

/* An applied relocation in the same RELRO segment; it is not protected. */
__attribute__((noinline, used, visibility("default")))
tensor_loader_word tensor_loader_pointer_reader(void) {
  return *tensor_loader_pointer;
}

extern tensor_loader_word tensor_external(int value);
/* Weak so -fPIE code reads it through a RELRO GOT entry. A strong reference
 * lets GCC use a copy relocation into writable .bss instead. */
extern tensor_loader_word tensor_external_value __attribute__((weak));

__attribute__((noinline, used, visibility("default")))
tensor_loader_word tensor_loader_got_caller(tensor_loader_word value) {
  return tensor_external((int)value) + tensor_external_value;
}

/* An initial-exec TLS variable from the provider. Its R_X86_64_TPOFF64 slot
 * sits in the same read-only .got as the applied entries above, and only the
 * runtime loader fills it, so Ghidra imports it unapplied. Protecting that
 * slot must not make the applied GOT entries beside it opaque. */
extern __thread tensor_loader_word tensor_external_tls
    __attribute__((tls_model("initial-exec")));

__attribute__((noinline, used, visibility("default")))
tensor_loader_word tensor_loader_tls_reader(void) {
  return tensor_external_tls;
}

__attribute__((used, visibility("default"))) void tensor_loader_start(void) {
  volatile tensor_loader_word result = tensor_loader_reader();
  (void)result;
  for (;;) {
  }
}

#undef TENSOR_LOADER_POINTER_SECTION
