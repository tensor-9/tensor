/** Provider identity for deterministic composed analysis workflows. */
export const TENSOR_WORKFLOW_PROVIDER = {
  id: "tensor-workflow",
  name: "Tensor composed investigation workflow",
  version: "1",
} as const;

/** Provider identity for deterministic artifact inventories. */
export const ARTIFACT_GRAPH_PROVIDER = Object.freeze({
  id: "tensor-artifact-graph",
  name: "Tensor safe artifact graph provider",
  version: "1",
} as const);

/** Provider identity for execution-free managed PE/CLI analysis. */
export const MANAGED_STATIC_PROVIDER = Object.freeze({
  id: "tensor-dotnet-static",
  name: "Tensor managed static analysis provider",
  version: "1",
} as const);

/** Provider identity for portable, execution-free PE resource decoding. */
export const PE_RESOURCES_PROVIDER = Object.freeze({
  id: "tensor-pe-resources",
  name: "Tensor PE resource parser",
  version: "1",
} as const);

/** Provider identity for portable, execution-free PE Authenticode table decoding. */
export const PE_CERTIFICATES_PROVIDER = Object.freeze({
  id: "tensor-pe-certificates",
  name: "Tensor PE certificate parser",
  version: "1",
} as const);

/** Provider identity for portable, execution-free PE import-table decoding. */
export const PE_IMPORTS_PROVIDER = Object.freeze({
  id: "tensor-pe-imports",
  name: "Tensor PE import parser",
  version: "1",
} as const);

/** Provider identity for portable, execution-free Shell Link decoding. */
export const WINDOWS_SHORTCUT_PROVIDER = Object.freeze({
  id: "tensor-windows-shortcut",
  name: "Tensor Windows shortcut parser",
  version: "1",
} as const);

/** Provider identity for portable, execution-free ELF note-table decoding. */
export const DEVICETREE_PROVIDER = Object.freeze({
  id: "tensor-devicetree",
  name: "Tensor flattened devicetree parser",
  version: "1",
} as const);

export const ELF_NOTES_PROVIDER = Object.freeze({
  id: "tensor-elf-notes",
  name: "Tensor ELF note parser",
  version: "1",
} as const);

/** Provider identity for portable, execution-free DWARF compile-unit inspection. */
export const DWARF_UNITS_PROVIDER = Object.freeze({
  id: "tensor-dwarf-units",
  name: "Tensor DWARF compile-unit parser",
  version: "1",
} as const);

/** Provider identity for portable, execution-free ELF separate-debug linkage. */
export const ELF_DEBUG_LINK_PROVIDER = Object.freeze({
  id: "tensor-elf-debug-link",
  name: "Tensor ELF debug-link parser",
  version: "1",
} as const);

/** Provider identity for portable, execution-free ELF unwind-table decoding. */
export const ELF_UNWIND_RANGES_PROVIDER = Object.freeze({
  id: "tensor-elf-unwind-ranges",
  name: "Tensor ELF unwind range parser",
  version: "1",
} as const);

/** Provider identity for portable, execution-free Apple .ips crash-report decoding. */
export const APPLE_IPS_PROVIDER = Object.freeze({
  id: "tensor-apple-ips",
  name: "Tensor Apple IPS parser",
  version: "1",
} as const);
/** Provider identity for portable, execution-free Linux kernel-module metadata. */
export const KERNEL_MODULE_PROVIDER = Object.freeze({
  id: "tensor-kernel-module",
  name: "Tensor kernel module parser",
  version: "1",
} as const);

/** Provider identity for portable, execution-free ELF dynamic-dependency inventories. */
export const ELF_DEPENDENCIES_PROVIDER = Object.freeze({
  id: "tensor-elf-dependencies",
  name: "Tensor ELF dependency parser",
  version: "1",
} as const);

/** Provider identity for portable, execution-free ELF and Mach-O initializer and finalizer tables. */
export const NATIVE_INITIALIZERS_PROVIDER = Object.freeze({
  id: "tensor-native-initializers",
  name: "Tensor ELF and Mach-O initializer parser",
  version: "1",
} as const);

/** Provider identity for portable, execution-free Linux kernel banner and IKCONFIG decoding. */
export const KERNEL_BUILD_CONFIG_PROVIDER = Object.freeze({
  id: "tensor-kernel-build-config",
  name: "Tensor kernel build config parser",
  version: "1",
} as const);

/** Provider identity for execution-free Shannon byte-entropy profiling. */
export const BYTE_ENTROPY_PROVIDER = Object.freeze({
  id: "byte-entropy",
  name: "Tensor byte entropy",
  version: "1",
} as const);

/** Provider identity for portable, execution-free PE and ELF export tables. */
export const NATIVE_EXPORTS_PROVIDER = Object.freeze({
  id: "tensor-native-exports",
  name: "Tensor PE/ELF export table reader",
  version: "1",
} as const);

/** Provider identity for deterministic managed-code comparison workflows. */
export const MANAGED_WORKFLOW_PROVIDER = {
  id: "tensor-dotnet-workflows",
  name: "Tensor managed-code workflows",
  version: "1",
} as const;

/** Provider identity for deterministic Apple application projections. */
export const APPLE_APPLICATION_PROVIDER = {
  id: "tensor-apple-application",
  name: "Tensor Apple application workflows",
  version: "1",
} as const;

/** Provider identity for deterministic Android application projections. */
export const ANDROID_APPLICATION_PROVIDER = {
  id: "tensor-android-application",
  name: "Tensor Android application workflows",
  version: "1",
} as const;

/** Provider identity for deterministic HarmonyOS application projections. */
export const HARMONY_APPLICATION_PROVIDER = {
  id: "tensor-harmony-application",
  name: "Tensor HarmonyOS application workflows",
  version: "1",
} as const;

/** Provider identity for verified publication of retained website scripts. */
export const WEB_SCRIPT_EXPORT_PROVIDER = {
  id: "tensor-web-script-export",
  name: "Tensor captured script export",
  version: "1",
} as const;

/** Provider identity for deterministic static JavaScript application analysis. */
export const JAVASCRIPT_APPLICATION_PROVIDER = {
  id: "tensor-javascript-application",
  name: "Tensor JavaScript application analyzer",
  version: "1",
} as const;

/** Provider identity for static/passive-runtime JavaScript reconciliation. */
export const JAVASCRIPT_RUNTIME_RECONCILIATION_PROVIDER = {
  id: "tensor-javascript-runtime-reconciliation",
  name: "Tensor JavaScript runtime reconciliation",
  version: "1",
} as const;

/** Provider identity for selected views of retained analysis Evidence. */
export const ANALYSIS_VIEW_PROVIDER = {
  id: "tensor-analysis-view",
  name: "Tensor analysis view projection",
  version: "1",
} as const;

/** Provider identity for graph-native feature tracing and version comparison. */
export const JAVASCRIPT_APPLICATION_WORKFLOW_PROVIDER = {
  id: "tensor-javascript-application-workflows",
  name: "Tensor JavaScript application workflows",
  version: "1",
} as const;

/** Provider identity for deterministic Evidence bundle comparisons. */
export const BUNDLE_COMPARISON_PROVIDER = {
  id: "tensor-bundle-comparison",
  name: "Tensor Evidence bundle comparison",
  version: "1",
} as const;

/** Provider identity for comparison-Evidence behavior aggregation. */
export const CHANGED_BEHAVIOR_PROVIDER = {
  id: "tensor-changed-behavior",
  name: "Tensor changed behavior investigation",
  version: "1",
} as const;

/** Provider identity for Evidence-backed call-path reconstruction. */
export const CALL_PATH_PROVIDER = {
  id: "tensor-call-path",
  name: "Tensor call path reconstruction",
  version: "1",
} as const;

/** Provider identity for explicit static/runtime hypothesis correlation. */
export const STATIC_RUNTIME_PROVIDER = {
  id: "tensor-static-runtime-correlation",
  name: "Tensor static/runtime correlation",
  version: "1",
} as const;

/** Provider identity for finite reconstruction specification verification. */
export const RECONSTRUCTION_PROVIDER = {
  id: "tensor-reconstruction-verifier",
  name: "Tensor reconstruction verifier",
  version: "1",
} as const;

export const PE_LOAD_CONFIG_PROVIDER = Object.freeze({
  id: "tensor-pe-load-config",
  name: "Tensor PE TLS/load-config parser",
  version: "1",
} as const);

/** Provider identity for the read-only release exposure audit. */
export const RELEASE_EXPOSURE_PROVIDER = Object.freeze({
  id: "tensor-release-exposure",
  name: "Tensor release exposure audit",
  version: "1",
} as const);

/** Provider identity for portable ELF, PE, and Mach-O hardening inspection. */
export const BINARY_HARDENING_PROVIDER = Object.freeze({
  id: "tensor-binary-hardening",
  name: "Tensor binary hardening parser",
  version: "1",
} as const);
