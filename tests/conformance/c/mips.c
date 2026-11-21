/* Freestanding, source-owned static-analysis fixture. Never executed by Tensor. */
volatile unsigned int tensor_mips_global = 7;
const char tensor_mips_marker[] = "tensor-mips-source-owned-fixture";

__attribute__((noinline)) unsigned int tensor_mips_leaf(unsigned int value)
{
    return value * 3u + tensor_mips_global;
}

__attribute__((noinline)) unsigned int tensor_mips_entry(unsigned int selector)
{
    unsigned int adjusted = selector > 10u ? selector : selector + 1u;
    return tensor_mips_leaf(adjusted) + (unsigned char)tensor_mips_marker[0];
}
