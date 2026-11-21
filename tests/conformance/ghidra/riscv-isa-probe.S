/* Zifencei and Zicsr oracle for the soft-float fixture, independent of the
 * compiler's C code generation. Returns its argument unchanged. */
.section .text
.option norvc
.global tensor_riscv_isa_probe
.type tensor_riscv_isa_probe, @function
tensor_riscv_isa_probe:
    fence.i
    csrr t0, mcycle
    ret
.size tensor_riscv_isa_probe, .-tensor_riscv_isa_probe
