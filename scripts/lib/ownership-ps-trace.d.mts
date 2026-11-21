/** The fixed Linux `ps` locations Tensor selects for ownership inventory. */
export const ownershipPsExecutables: ReadonlySet<string>;

/**
 * Whether an strace `execve` line is Tensor's process-ownership `ps` inventory
 * run from one of `executables` (default: `ownershipPsExecutables`).
 */
export function isOwnershipPsExecution(
  line: string,
  executables?: ReadonlySet<string>,
): boolean;
