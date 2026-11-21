import { expect, it } from "vitest";

import { MAX_NODE_TIMER_DELAY_MS } from "../domain/analysisResourceLimits.js";
import { ConfigurationError } from "../domain/configurationErrors.js";
import { parseEnvironment } from "./environment.js";
import {
  MCP_PHASE_BUDGET_FLOOR_MS,
  parseMcpStartupBudgets,
  resolveMcpStartupBudgets,
} from "./mcpStartupBudgets.js";

it("resolves default budgets with the launch setting for each startup phase", () => {
  const budgets = resolveMcpStartupBudgets({});
  for (const [phase, setting, milliseconds] of [
    ["initialize", "TENSOR_MCP_INITIALIZE_BUDGET_MS", 15_000],
    ["toolsList", "TENSOR_MCP_TOOLS_LIST_BUDGET_MS", 5_000],
    ["firstCatalog", "TENSOR_MCP_FIRST_CATALOG_BUDGET_MS", 20_000],
    ["doctor", "TENSOR_MCP_DOCTOR_DEADLINE_MS", 30_000],
  ] as const)
    expect(budgets[phase]).toMatchObject({
      setting,
      milliseconds,
      defaultMilliseconds: milliseconds,
      source: "default",
    });
});

it("admits distinct overrides for all four startup phases", () => {
  const environment = {
    TENSOR_MCP_INITIALIZE_BUDGET_MS: String(MCP_PHASE_BUDGET_FLOOR_MS),
    TENSOR_MCP_TOOLS_LIST_BUDGET_MS: "6000",
    TENSOR_MCP_FIRST_CATALOG_BUDGET_MS: "21000",
    TENSOR_MCP_DOCTOR_DEADLINE_MS: String(MAX_NODE_TIMER_DELAY_MS),
  };
  expect(resolveMcpStartupBudgets(environment)).toMatchObject({
    initialize: { milliseconds: MCP_PHASE_BUDGET_FLOOR_MS, source: "setting" },
    toolsList: { milliseconds: 6_000, source: "setting" },
    firstCatalog: { milliseconds: 21_000, source: "setting" },
    doctor: { milliseconds: MAX_NODE_TIMER_DELAY_MS, source: "setting" },
  });
  const parsed = parseEnvironment(environment);
  if (!parsed.ok) throw parsed.error;
  expect(parsed.value).toMatchObject({
    TENSOR_MCP_INITIALIZE_BUDGET_MS: MCP_PHASE_BUDGET_FLOOR_MS,
    TENSOR_MCP_TOOLS_LIST_BUDGET_MS: 6_000,
    TENSOR_MCP_FIRST_CATALOG_BUDGET_MS: 21_000,
    TENSOR_MCP_DOCTOR_DEADLINE_MS: MAX_NODE_TIMER_DELAY_MS,
  });
});

it.each([
  ["TENSOR_MCP_INITIALIZE_BUDGET_MS", ""],
  ["TENSOR_MCP_TOOLS_LIST_BUDGET_MS", "0"],
  ["TENSOR_MCP_FIRST_CATALOG_BUDGET_MS", "1e3"],
  ["TENSOR_MCP_DOCTOR_DEADLINE_MS", String(MAX_NODE_TIMER_DELAY_MS + 1)],
])("rejects invalid %s=%j as a configuration error", (setting, value) => {
  const environment = { [setting]: value };
  const parsed = parseMcpStartupBudgets(environment);
  if (parsed.ok)
    throw new Error(`Accepted ${setting}=${JSON.stringify(value)}`);
  expect(parsed.error.settings).toEqual([
    { setting, constraint: expect.stringContaining(setting) },
  ]);
  const startup = parseEnvironment(environment);
  if (startup.ok) throw new Error(`Startup accepted ${setting}`);
  expect(startup.error.settings).toEqual(parsed.error.settings);
});

it("reports both invalid phase budgets alongside a valid override", () => {
  const environment = {
    TENSOR_MCP_INITIALIZE_BUDGET_MS: "0",
    TENSOR_MCP_TOOLS_LIST_BUDGET_MS: "6000",
    TENSOR_MCP_DOCTOR_DEADLINE_MS: "nope",
  };
  const parsed = parseMcpStartupBudgets(environment);
  if (parsed.ok) throw new Error("Invalid budgets were accepted");
  expect(parsed.error.settings.map(({ setting }) => setting)).toEqual([
    "TENSOR_MCP_INITIALIZE_BUDGET_MS",
    "TENSOR_MCP_DOCTOR_DEADLINE_MS",
  ]);
  expect(parsed.error.message).not.toContain(
    environment.TENSOR_MCP_TOOLS_LIST_BUDGET_MS,
  );
  expect(() => resolveMcpStartupBudgets(environment)).toThrow(
    ConfigurationError,
  );
});
