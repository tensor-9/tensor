#include <stdio.h>

volatile int tensor_c_global = 7;

#define TENSOR_LONG_CHUNK "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
#define TENSOR_LONG_256 TENSOR_LONG_CHUNK TENSOR_LONG_CHUNK TENSOR_LONG_CHUNK TENSOR_LONG_CHUNK
#define TENSOR_LONG_1024 TENSOR_LONG_256 TENSOR_LONG_256 TENSOR_LONG_256 TENSOR_LONG_256
/* Keep the full-size literal even when a loader does not type it as a string. */
__attribute__((used)) const char tensor_long_literal[] =
    "TENSOR_LONG_LITERAL_" TENSOR_LONG_1024 TENSOR_LONG_1024 TENSOR_LONG_1024 TENSOR_LONG_1024 "needle";
/* Verified Hopper loaders recognize this extent and split it into native objects. */
__attribute__((used)) const char tensor_fragmented_literal[] =
    "TENSOR_FRAGMENTED_LITERAL_" TENSOR_LONG_256 TENSOR_LONG_256 "fragment_tail";
__attribute__((used)) const char tensor_utf8_literal[] = "TENSOR_UTF8_é_😀";
__attribute__((used)) const char tensor_ellipsis_literal[] = "TENSOR_LITERAL_…";
__attribute__((used)) const char tensor_latin1_literal[] = "TENSOR_LATIN1_\xff";

__attribute__((noinline, used)) void tensor_long_literal_procedure(void) {
  puts(tensor_long_literal);
  puts(tensor_fragmented_literal);
  puts(tensor_utf8_literal);
  puts("TENSOR_ESCAPED_\"\\line\nend\t\r");
  puts("TENSOR_LITERAL_BACKSLASH_\\n");
  puts(tensor_ellipsis_literal);
  puts(tensor_latin1_literal);
}

__attribute__((noinline, used)) int tensor_leaf(int value) {
  puts("TENSOR_C_LEAF");
  return value + tensor_c_global;
}

__attribute__((noinline, used)) int tensor_branch(int value) {
  return value > 3 ? tensor_leaf(value) : tensor_leaf(-value);
}

__attribute__((noinline, used)) int tensor_entry(void) {
  puts("TENSOR_C_ENTRY");
  /* Give the native locals oracle explicit stack storage. */
  volatile int input = 5;
  return tensor_branch(input);
}

int main(void) { return tensor_entry() == 12 ? 0 : 1; }

__attribute__((noinline, used)) int tensor_cycle_b(int value);

__attribute__((noinline, used)) int tensor_cycle_a(int value) {
  return value > 0 ? tensor_cycle_b(value - 1) : value;
}

__attribute__((noinline, used)) int tensor_cycle_b(int value) {
  return value > 0 ? tensor_cycle_a(value - 1) : value;
}
