/* Source-owned mixed-instruction shared-image control. */
.abicalls
.module fp=xx
.module nooddspreg
.text
.set noreorder
.set nomicromips
.set mips16
.globl tensor_mips16_probe
.type tensor_mips16_probe, @function
.ent tensor_mips16_probe
tensor_mips16_probe:
    li $2, 90
    xor $2, $4
    addiu $2, 7
    jrc $31
.end tensor_mips16_probe
.size tensor_mips16_probe, . - tensor_mips16_probe
.ifndef TENSOR_MIPS_SYMBOL_RELATIVE
.hidden tensor_mips16_probe
.endif

.set nomips16
.globl tensor_mips32_probe
.type tensor_mips32_probe, @function
.ent tensor_mips32_probe
tensor_mips32_probe:
    addiu $2, $4, 3
    jr $31
    nop
.end tensor_mips32_probe
.size tensor_mips32_probe, . - tensor_mips32_probe

.data
.balign 4
.globl tensor_mips16_pointer
.type tensor_mips16_pointer, @object
.size tensor_mips16_pointer, 4
tensor_mips16_pointer:
    .word tensor_mips16_probe
.section .note.GNU-stack, "", @progbits
