/* Freestanding GameCube DOL fixture, source-owned static-analysis input. Never executed by Tensor. */
volatile unsigned int tensor_dol_global = 0x11223344u;
unsigned int tensor_dol_zero[4];
__attribute__((section(".dol_tail"), used)) unsigned int tensor_dol_tail[4] = {1u, 2u, 3u, 4u};
