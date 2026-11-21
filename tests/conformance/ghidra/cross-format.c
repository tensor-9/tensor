typedef int (*tensor_cross_callback)(int);

volatile int tensor_cross_global = 7;
const volatile char tensor_cross_message[] = "TENSOR_GHIDRA_CROSS_FORMAT";

__attribute__((noinline, used)) int tensor_cross_leaf(int value) {
  return value + tensor_cross_global + tensor_cross_message[0] - 'R';
}

__attribute__((noinline, used)) int tensor_cross_branch(int value) {
  /* A volatile-dependent loop keeps this callee multi-block at every
     optimization level: newer clang folds a symmetric if/else of tail calls
     into a conditional negate, and cross-format verification requires a
     recovered multi-block callee. */
  int adjusted = value > 10 ? value + 1 : -value;
  while (adjusted > 100) {
    adjusted -= tensor_cross_global;
  }
  return tensor_cross_leaf(adjusted);
}

__attribute__((noinline, used)) int tensor_cross_indirect(
    tensor_cross_callback callback, int value) {
  return callback(value);
}

#define TENSOR_CROSS_SWITCH_CASE(case_value) \
  case case_value:                        \
    return tensor_cross_leaf(payload + case_value)

__attribute__((noinline, used)) int tensor_cross_dense_switch(unsigned int selector,
                                                           int payload) {
  switch (selector) {
    TENSOR_CROSS_SWITCH_CASE(0);
    TENSOR_CROSS_SWITCH_CASE(1);
    TENSOR_CROSS_SWITCH_CASE(2);
    TENSOR_CROSS_SWITCH_CASE(3);
    TENSOR_CROSS_SWITCH_CASE(4);
    TENSOR_CROSS_SWITCH_CASE(5);
    TENSOR_CROSS_SWITCH_CASE(6);
    TENSOR_CROSS_SWITCH_CASE(7);
    TENSOR_CROSS_SWITCH_CASE(8);
    TENSOR_CROSS_SWITCH_CASE(9);
    TENSOR_CROSS_SWITCH_CASE(10);
    TENSOR_CROSS_SWITCH_CASE(11);
    TENSOR_CROSS_SWITCH_CASE(12);
    TENSOR_CROSS_SWITCH_CASE(13);
    TENSOR_CROSS_SWITCH_CASE(14);
    TENSOR_CROSS_SWITCH_CASE(15);
    TENSOR_CROSS_SWITCH_CASE(16);
    TENSOR_CROSS_SWITCH_CASE(17);
    TENSOR_CROSS_SWITCH_CASE(18);
    TENSOR_CROSS_SWITCH_CASE(19);
    TENSOR_CROSS_SWITCH_CASE(20);
    TENSOR_CROSS_SWITCH_CASE(21);
    TENSOR_CROSS_SWITCH_CASE(22);
    TENSOR_CROSS_SWITCH_CASE(23);
    TENSOR_CROSS_SWITCH_CASE(24);
    TENSOR_CROSS_SWITCH_CASE(25);
    TENSOR_CROSS_SWITCH_CASE(26);
    TENSOR_CROSS_SWITCH_CASE(27);
    TENSOR_CROSS_SWITCH_CASE(28);
    TENSOR_CROSS_SWITCH_CASE(29);
    TENSOR_CROSS_SWITCH_CASE(30);
    TENSOR_CROSS_SWITCH_CASE(31);
    TENSOR_CROSS_SWITCH_CASE(32);
    TENSOR_CROSS_SWITCH_CASE(33);
    TENSOR_CROSS_SWITCH_CASE(34);
    TENSOR_CROSS_SWITCH_CASE(35);
    TENSOR_CROSS_SWITCH_CASE(36);
    TENSOR_CROSS_SWITCH_CASE(37);
    TENSOR_CROSS_SWITCH_CASE(38);
    TENSOR_CROSS_SWITCH_CASE(39);
    default:
      return -1;
  }
}

#undef TENSOR_CROSS_SWITCH_CASE

__attribute__((noinline, used, visibility("default"))) int tensor_cross_entry(void) {
  return tensor_cross_branch(35) + tensor_cross_indirect(tensor_cross_leaf, 0);
}

__attribute__((used, visibility("default"))) void tensor_cross_start(void) {
  volatile int result = tensor_cross_entry();
  (void)result;
  for (;;) {
  }
}
