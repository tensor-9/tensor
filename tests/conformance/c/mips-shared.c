/* Position-independent shared-library (ET_DYN) static-analysis fixture, built
 * with -fPIC -shared and never executed or loaded by Tensor. It exercises what
 * MIPS32 o32 libraries rely on: calls and data accesses through local and
 * global GOT entries, R_MIPS_REL32 pointers to a local function (symbol index
 * zero), to a preemptible exported function and to an undefined import, a
 * general-dynamic TLS variable whose DTPMOD32/DTPREL32 slots and an
 * initial-exec one whose TPREL32 slot only the dynamic loader can fill. The
 * direct call to the static function goes through a local GOT page entry;
 * .text lies in page zero, so that entry is zero in the file and must still be
 * rebased with the image.
 */
extern int tensor_mips_so_external(int value);
extern int tensor_mips_so_external_data;

__thread int tensor_mips_so_tls = 5;
__attribute__((tls_model("initial-exec"))) __thread int tensor_mips_so_tls_ie = 9;

__attribute__((noinline)) static int tensor_mips_so_local(int value)
{
    return value * 3 + 1;
}

__attribute__((noinline)) int tensor_mips_so_exported(int value)
{
    return value + 7;
}

int (*const tensor_mips_so_table[])(int) = {
    tensor_mips_so_local,
    tensor_mips_so_exported,
};

int (*const tensor_mips_so_external_pointer)(int) = tensor_mips_so_external;

int tensor_mips_so_entry(int value)
{
    return tensor_mips_so_external(value) + tensor_mips_so_external_data +
        tensor_mips_so_table[value & 1](value) + tensor_mips_so_local(value) +
        tensor_mips_so_external_pointer(value) + tensor_mips_so_tls +
        tensor_mips_so_tls_ie;
}
