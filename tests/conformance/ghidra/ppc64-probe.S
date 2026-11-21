/* Source-owned 64-bit PowerPC instructions with fixed, reviewable encodings.
 * No target execution. The conditional branch at +8 targets +20. The VSX
 * xxlor at +12 decodes only in a Power ISA language, not in Ghidra's G2-era
 * 64-bit default.
 */
.text
.p2align 2
.globl tensor_ppc64_probe
.type tensor_ppc64_probe, @function
tensor_ppc64_probe:
    addi 3, 4, 0x1234
    cmpdi 0, 4, 0
    beq 0, .Lzero
    xxlor 0, 1, 2
    blr
.Lzero:
    li 3, 7
    blr
.size tensor_ppc64_probe, .-tensor_ppc64_probe
.section .note.GNU-stack,"",@progbits
