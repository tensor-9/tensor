import type { DoctorProviderInspection } from "../ports/DoctorProviderInspection.js";
import { compareUnicodeCodePoints } from "../domain/unicodeCodePointOrder.js";

const SELECTED_REGISTRATION_SETTINGS = [
  "GHIDRA_INSTALL_DIR",
  "GHIDRA_HEADLESS_MAXMEM",
  "GHIDRA_MAXMEM",
  "JAVA_HOME",
  "HOPPER_LAUNCHER_PATH",
  "HOPPER_LOADER_ARGS_JSON",
  "TENSOR_ILSPY_CMD_PATH",
  "TENSOR_ADB_PATH",
  "TENSOR_APKTOOL_COMMAND",
  "TENSOR_TSHARK_COMMAND",
  "TENSOR_CAPINFOS_COMMAND",
  "TENSOR_TSHARK_PRLIMIT_COMMAND",
  "TENSOR_OBJDUMP_COMMAND",
  "TENSOR_GDB_COMMAND",
  "TENSOR_RIZIN_COMMAND",
  "TENSOR_CUTTER_BRIDGE_DIR",
  "TENSOR_WABT_BIN_DIRECTORY",
  "TENSOR_WAKARU_COMMAND",
  "TENSOR_JAVASCRIPT_PRLIMIT_COMMAND",
  "TENSOR_BINWALK_COMMAND",
  "TENSOR_UNBLOB_COMMAND",
  "TENSOR_FIRMWARE_PRLIMIT_COMMAND",
  "TENSOR_EVM_PRLIMIT_COMMAND",
  "TENSOR_SIGROK_COMMAND",
  "TENSOR_SIGROK_PRLIMIT_COMMAND",
  "TENSOR_MITMDUMP_COMMAND",
  "TENSOR_BROWSER_EXECUTABLE",
  "TENSOR_BROWSER_NO_SANDBOX",
  "TENSOR_PWNTOOLS_PYTHON",
  "TENSOR_PWNTOOLS_MAX_INPUT_BYTES",
  "TENSOR_PWNDBG_GDB",
  "TENSOR_PWNDBG_GDBINIT",
  "TENSOR_PWNDBG_VENV_PATH",
  "TENSOR_DARWIN_SWIFTC_PATH",
  "TENSOR_DARWIN_MODULE_CACHE_PATH",
  "SDKROOT",
  "TENSOR_SWIFTC_COMPILE_TIMEOUT_MS",
  "TENSOR_LOG_LEVEL",
  "TENSOR_REFERENCE_SECRET_PATTERNS_JSON",
  "TENSOR_IDA_MCP_CONFIG",
  "TENSOR_JADX_MCP_JAR",
  "TENSOR_JADX_HEAP_MIB",
  "TENSOR_JADX_ACTIVE_PROCESSOR_COUNT",
  "TENSOR_JADX_OPERATION_TIMEOUT_MS",
  "TENSOR_KUNA_COMMAND",
  "TENSOR_KUNA_CACHE_DIR",
  "TENSOR_KUNA_CACHE_MAX_BYTES",
  "TENSOR_KUNA_PROJECT_TIMEOUT_MS",
  "TENSOR_KUNA_TIMEOUT_MS",
  "TENSOR_KUNA_JOBS",
  "TENSOR_ANALYSIS_PROVIDER",
  "TENSOR_ASAR_MAX_HEADER_BYTES",
  "TENSOR_ASAR_MAX_LISTING_BYTES",
  "TENSOR_GHIDRA_VALUE_FLOW_MAX_OPERATIONS",
  "TENSOR_GHIDRA_VALUE_FLOW_MAX_INPUTS_PER_OPERATION",
  "TENSOR_GHIDRA_VALUE_FLOW_MAX_EDGES",
  "TENSOR_GHIDRA_DECOMPILE_MAX_PAYLOAD_MIB",
  "TENSOR_BRIDGE_MAX_REQUEST_BYTES",
  "TENSOR_BRIDGE_MAX_REPLY_BYTES",
  "TENSOR_CAPTURE_DECODER_OLD_GENERATION_MIB",
  "TENSOR_CAPTURE_PACKET_JSON_EXPANSION_BYTES",
  "TENSOR_GHIDRA_DECOMPILE_TIMEOUT_SECONDS",
  "TENSOR_GHIDRA_STARTUP_TIMEOUT_MS",
  "TENSOR_GHIDRA_LANGUAGE_ID",
  "TENSOR_GHIDRA_COMPILER_SPEC_ID",
  "TENSOR_GHIDRA_DISABLED_ANALYZERS",
  "TENSOR_GHIDRA_SEED_FILE",
  "TENSOR_GHIDRA_PROJECT_PATH",
  "TENSOR_GHIDRA_CHECKPOINT_DIR",
  "TENSOR_GHIDRA_PROGRAM_NAME",
  "TENSOR_GHIDRA_NATIVEAOT_JAR",
  "TENSOR_HOPPER_CALLER_SCAN_BUDGET_MS",
  "TENSOR_HOPPER_STARTUP_TIMEOUT_MS",
  "TENSOR_JEB_MCP_URL",
  "TENSOR_JEB_MCP_TIMEOUT_MS",
  "TENSOR_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES",
  "TENSOR_MCP_INPUT_SCHEMA_PROFILE",
  "TENSOR_MCP_TOOL_FAMILIES",
  "TENSOR_MCP_OUTPUT_SCHEMA_PROFILE",
  "TENSOR_MCP_TOOL_CATALOG_PROFILE",
  "TENSOR_MCP_MAX_RESPONSE_BYTES",
  "TENSOR_MCP_MAX_INPUT_ELEMENTS",
  "TENSOR_NATIVE_MATCHING_REPRESENTATION_BYTES",
  "TENSOR_REGEX_MATCHING_DEADLINE_MS",
  "TENSOR_REGEX_WORKER_HEAP_REQUEST_MIB",
  "TENSOR_WINDOWS_CHANGE_TIME_DRIFT_MS",
  "TENSOR_WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS",
  "TENSOR_WINDOWS_CHANGE_TIME_SETTLE_POLL_MS",
  "TENSOR_MCP_INITIALIZE_BUDGET_MS",
  "TENSOR_MCP_TOOLS_LIST_BUDGET_MS",
  "TENSOR_MCP_FIRST_CATALOG_BUDGET_MS",
  "TENSOR_MCP_DOCTOR_DEADLINE_MS",
] as const;

/**
 * Settings setup can add to a registration from provider discovery when the
 * caller did not select them: Hopper's launcher (doctor's Hopper search) and
 * Ghidra's installation and Java (Ghidra's inspection). Other providers'
 * registration settings echo explicit selections. Update maintenance does not
 * run that discovery, so it cannot tell what setup would write for these.
 */
export const DISCOVERED_REGISTRATION_SETTINGS = [
  "HOPPER_LAUNCHER_PATH",
  "GHIDRA_INSTALL_DIR",
  "JAVA_HOME",
] as const;

/** Explicit selections override discovered defaults even when a provider is unavailable.
 * This is a registration policy, not a prefix match against the ambient environment.
 */
export const explicitSetupRegistrationEnvironment = (
  environment: Readonly<Record<string, string | undefined>>,
): Readonly<Record<string, string>> =>
  Object.fromEntries(
    SELECTED_REGISTRATION_SETTINGS.flatMap((key) => {
      const value = environment[key];
      return value === undefined ? [] : [[key, value]];
    }),
  );

/** Discovered provider defaults; explicit selections are applied separately. */
export const providerRegistrationEnvironment = (
  inspections: readonly DoctorProviderInspection[],
): Readonly<Record<string, string>> =>
  Object.fromEntries(
    inspections
      .flatMap(({ registrationEnvironment }) =>
        Object.entries(registrationEnvironment),
      )
      .sort(([left], [right]) => compareUnicodeCodePoints(left, right)),
  );

/** Spell selected settings as setup records them: an explicit selection wins. */
export const registrationSpelledSettings = (
  settings: Readonly<Record<string, string>>,
  environment: Readonly<Record<string, string | undefined>>,
): Readonly<Record<string, string>> => {
  const explicit = explicitSetupRegistrationEnvironment(environment);
  return Object.fromEntries(
    Object.entries(settings).map(([key, value]) => [
      key,
      explicit[key] ?? value,
    ]),
  );
};
