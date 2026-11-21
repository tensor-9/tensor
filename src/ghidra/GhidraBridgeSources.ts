/**
 * Required packaged sources, selected by their runtime role rather than order.
 * scripts/verify-ghidra-bridge-sources.mjs loads this module directly with
 * Node type stripping, which does not resolve `.js` specifiers to `.ts`
 * sources, so it keeps no runtime imports. The producer identity built from
 * these sources lives in GhidraProducerIdentity.ts.
 */
export const GHIDRA_BRIDGE_SOURCES = Object.freeze({
  bridge: "TensorGhidraBridge.java",
  bundleActivator: "TensorGhidraBundleActivator.java",
  extensions: "TensorGhidraExtensions.java",
  prepareCom: "TensorGhidraPrepareCom.java",
  prepareRaw: "TensorGhidraPrepareRaw.java",
  prepareDol: "TensorGhidraPrepareDol.java",
  applySeeds: "TensorGhidraApplySeeds.java",
  analysisOptions: "TensorGhidraAnalysisOptions.java",
  noReturnFix: "TensorGhidraNoReturnFix.java",
  mipsSoftFloat: "TensorGhidraMipsSoftFloat.java",
  riscvCallingConvention: "TensorGhidraRiscvCallingConvention.java",
} as const);
