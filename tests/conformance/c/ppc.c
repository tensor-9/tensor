/* Freestanding, source-owned static-analysis fixture. Never executed by Tensor. */
volatile unsigned int tensor_ppc_global = 7;
const char tensor_ppc_marker[] = "tensor-ppc-source-owned-fixture";
struct TensorPpcBits { unsigned int first : 3; unsigned int second : 5; };
volatile struct TensorPpcBits tensor_ppc_bits = {1, 2};

__attribute__((noinline)) unsigned int tensor_ppc_leaf(unsigned int value)
{
    return value * 3u + tensor_ppc_global;
}

__attribute__((noinline)) unsigned int tensor_ppc_entry(unsigned int selector)
{
    unsigned int adjusted = selector > 10u ? selector : selector + 1u;
    return tensor_ppc_leaf(adjusted) + (unsigned char)tensor_ppc_marker[0];
}
