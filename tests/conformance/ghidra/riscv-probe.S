/* Fixed instruction oracle, independent of the compiler's C code generation. */
.section .text
.option norvc
.global tensor_riscv_probe
.type tensor_riscv_probe, @function
tensor_riscv_probe:
    addi a0, a0, 17
    ret
.size tensor_riscv_probe, .-tensor_riscv_probe
