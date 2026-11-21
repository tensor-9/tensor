/** Host controls that cannot also be supplied as bundle settings. */
export const BUILD_COMPUTER_SETTINGS = [
  "TENSOR_AGENT_ENV_COMMAND",
  "TENSOR_DOCKER_COMMAND",
  "TENSOR_BUILD_COMPUTER_TENSOR_ARCHIVE",
] as const;

/** Bundle variable names; host-control names are excluded separately. */
export const BUNDLE_SETTING_VARIABLE = /^TENSOR_[A-Z0-9_]{1,60}$/u;
