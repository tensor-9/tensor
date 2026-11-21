import { HOST_PLATFORM } from "../platform/HostPlatform.js";
import { expect, it } from "vitest";

import {
  clientServerPath,
  parseClientConfiguration,
  serializeClientConfiguration,
  withClientServers,
  type ClientConfigurationFormat,
} from "./ClientConfigurationDocument.js";

const replaceLauncher = (source: string, format: ClientConfigurationFormat) => {
  const parsed = parseClientConfiguration(source, format);
  const existing = parsed.servers.tensor;
  if (typeof existing !== "object" || existing === null)
    throw new Error("fixture registration missing");
  const document = withClientServers(
    parsed,
    {
      ...parsed.servers,
      tensor: { ...existing, command: "new-tensor" },
    },
    HOST_PLATFORM.platform,
  );
  const result = serializeClientConfiguration(document, format, source, [
    clientServerPath(parsed, "tensor"),
  ]);
  if (!result.ok) throw new Error("launcher replacement refused");
  return result.value;
};

it.each(["json", "fx", "copilot_cli", "copilot_cli_project"] as const)(
  "%s retains opaque number and string tokens inside and outside the edited row",
  (format) => {
    const source = `{"metadata":{"opaque":9007199254740993},"mcpServers":{"peer":{"opaque":9007199254740993},"tensor":{"command":"old-tensor","metadata":{"opaque":9007199254740993,"nested":[{"number":1e+03,"negative":-0,"text":"\\u0061"}]}}}}`;
    const output = replaceLauncher(source, format);
    expect(output.match(/9007199254740993/gu)).toHaveLength(3);
    expect(output).not.toContain("9007199254740992");
    expect(output).toContain("1e+03");
    expect(output).toContain('"negative":-0');
    expect(output).toContain('"\\u0061"');
    expect(
      parseClientConfiguration(output, format).servers.tensor,
    ).toMatchObject({
      command: "new-tensor",
    });
  },
);

it.each(["fx", "copilot_cli", "copilot_cli_project"] as const)(
  "%s strips only non-native JSON syntax while retaining opaque source tokens",
  (format) => {
    const source = `\uFEFF{/*root*/"metadata":{"opaque":9007199254740993,},"mcpServers":{"tensor":{"command":"old-tensor",// row\n"opaque":9007199254740993,"text":"/*literal*/",},},}`;
    const output = replaceLauncher(source, format);
    expect(() => JSON.parse(output)).not.toThrow();
    expect(output.match(/9007199254740993/gu)).toHaveLength(2);
    expect(output).toContain('"/*literal*/"');
    expect(output).not.toContain("/*root*/");
    expect(output).not.toContain("// row");
  },
);

it("retains JSONC comments, trailing commas, BOM and untouched token spellings", () => {
  const source = `\uFEFF{/*root*/"mcpServers":{"tensor":{"command":"old-tensor",/*owned metadata*/"opaque":9007199254740993,},},}`;
  const output = replaceLauncher(source, "json");
  expect(output.startsWith("\uFEFF")).toBe(true);
  expect(output).toContain("/*root*/");
  expect(output).toContain("/*owned metadata*/");
  expect(output).toContain("9007199254740993");
  expect(output).toMatch(/,\s*\}/u);
});

it("retains nested array tokens while changing siblings, shrinking and extending arrays", () => {
  const source = `{"mcpServers":{"tensor":{"command":"tensor","items":[{"opaque":9007199254740993,"label":"old"},2,3],"grow":[9007199254740993]}}}`;
  const parsed = parseClientConfiguration(source, "json");
  const result = serializeClientConfiguration(
    withClientServers(
      parsed,
      {
        tensor: {
          command: "tensor",
          items: [{ opaque: 9007199254740992, label: "new" }],
          grow: [9007199254740992, 4],
        },
      },
      HOST_PLATFORM.platform,
    ),
    "json",
    source,
    [clientServerPath(parsed, "tensor")],
  );
  if (!result.ok) throw new Error("nested edit refused");
  expect(result.value.match(/9007199254740993/gu)).toHaveLength(2);
  expect(JSON.parse(result.value).mcpServers.tensor).toMatchObject({
    items: [{ label: "new" }],
    grow: [9007199254740992, 4],
  });
});

it("retains source tokens when the caller supplies a whole edited document", () => {
  const source = `{"opaque":9007199254740993,"mcpServers":{"tensor":{"command":"old"}}}`;
  const parsed = parseClientConfiguration(source, "fx");
  const result = serializeClientConfiguration(
    withClientServers(
      parsed,
      { tensor: { command: "new" } },
      HOST_PLATFORM.platform,
    ),
    "fx",
    source,
  );
  if (!result.ok) throw new Error("whole document edit refused");
  expect(result.value).toContain("9007199254740993");
  expect(JSON.parse(result.value).mcpServers.tensor.command).toBe("new");
});

it("removes all repeated nested fields without activating an earlier value", () => {
  const source = `{"mcpServers":{"tensor":{"remove":1,"remove":2,"retain":9007199254740993,"command":"old"}}}`;
  const parsed = parseClientConfiguration(source, "json");
  const result = serializeClientConfiguration(
    withClientServers(
      parsed,
      {
        tensor: {
          retain: 9007199254740992,
          command: "new",
          added: { enabled: true },
        },
      },
      HOST_PLATFORM.platform,
    ),
    "json",
    source,
    [clientServerPath(parsed, "tensor")],
  );
  if (!result.ok) throw new Error("owned row edit refused");
  expect(result.value).not.toContain('"remove"');
  expect(result.value).toContain("9007199254740993");
  expect(JSON.parse(result.value).mcpServers.tensor).toMatchObject({
    command: "new",
    added: { enabled: true },
  });
});

it.each([
  ["replace all members", { replacement: true }],
  ["remove all members", {}],
  ["replace array contents", { items: [5] }],
  ["empty arrays", { items: [] }],
])("keeps collection separators valid when editing %s", (_name, tensor) => {
  const source = `{"mcpServers":{"tensor":{"items":[1,2,],"old":3,}}}`;
  const parsed = parseClientConfiguration(source, "fx");
  const result = serializeClientConfiguration(
    withClientServers(parsed, { tensor }, HOST_PLATFORM.platform),
    "fx",
    source,
    [clientServerPath(parsed, "tensor")],
  );
  if (!result.ok) throw new Error("collection edit refused");
  expect(JSON.parse(result.value).mcpServers.tensor).toEqual(tensor);
});
