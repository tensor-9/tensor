/* Relocatable (ET_REL) static-analysis fixture, built with -c -G0 and never
 * executed or linked by Tensor. It exercises the relocations Linux MIPS kernel
 * modules use: R_MIPS_26 calls, HI16/LO16 address pairs (one HI16 shared by
 * several LO16s, two HI16s resolved by one LO16, and a LO16 >= 0x8000 that
 * forces a HI16 carry), R_MIPS_32
 * data words, and undefined external code and data symbols. powf is an
 * external whose float prototype Ghidra's C library archive supplies by name,
 * so soft-float builds must give it the soft-float prototype too.
 */
extern int tensor_mips_rel_external(int value);
extern int tensor_mips_rel_external_data;
extern float powf(float base, float exponent);

struct tensor_mips_rel_pair {
    int first;
    int second;
};

struct tensor_mips_rel_pair tensor_mips_rel_pair = { 0x1111, 0x2222 };
/* Places tensor_mips_rel_carry past a signed 16-bit low-half boundary. */
char tensor_mips_rel_padding[0x8000] = { 1 };
int tensor_mips_rel_carry = 0x3333;
/* Referenced only by tensor_mips_rel_highs, so its single LO16 stays unique. */
int tensor_mips_rel_highs_target = 0x4444;
static const char tensor_mips_rel_marker[] = "tensor-mips-relocatable-fixture";

__attribute__((noinline)) int tensor_mips_rel_leaf(int value)
{
    return value * 3 + tensor_mips_rel_pair.first + tensor_mips_rel_pair.second;
}

__attribute__((noinline, long_call)) int tensor_mips_rel_far(int value);

int tensor_mips_rel_far(int value)
{
    return value + tensor_mips_rel_marker[value & 7] + tensor_mips_rel_carry;
}

int (*const tensor_mips_rel_table[])(int) = {
    tensor_mips_rel_leaf,
    tensor_mips_rel_far,
    tensor_mips_rel_external,
};

__attribute__((noinline)) int tensor_mips_rel_scaled(int value)
{
    float scaled = powf(1.5f, 2.5f);
    return value ^ *(int *)&scaled;
}

/* Most GCC-built kernel modules checked contain LO16s that resolve several
 * pending HI16s; Clang does not produce that from C. Two %hi and exactly one
 * %lo of a symbol nothing else references: any assembler that orders each
 * HI16 before a matching LO16 (GNU as, every LLVM version) must emit both
 * HI16s ahead of that single LO16, which therefore resolves both.
 */
__asm__(".text\n"
        ".globl tensor_mips_rel_highs\n"
        ".type tensor_mips_rel_highs, @function\n"
        ".set push\n"
        ".set noreorder\n"
        "tensor_mips_rel_highs:\n"
        "    lui $2, %hi(tensor_mips_rel_highs_target)\n"
        "    lui $3, %hi(tensor_mips_rel_highs_target)\n"
        "    addiu $2, $2, %lo(tensor_mips_rel_highs_target)\n"
        "    jr $31\n"
        "    move $3, $2\n"
        ".set pop\n"
        ".size tensor_mips_rel_highs, .-tensor_mips_rel_highs\n");

int tensor_mips_rel_entry(int value)
{
    return tensor_mips_rel_leaf(value) + tensor_mips_rel_far(value) +
        tensor_mips_rel_external(value) + tensor_mips_rel_external_data +
        tensor_mips_rel_table[value & 1](value) + tensor_mips_rel_scaled(value);
}
