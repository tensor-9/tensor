import { HOST_PLATFORM } from "../platform/HostPlatform.js";
import { describe, expect, it } from "vitest";
import { parse as parseJsonc, type ParseError } from "jsonc-parser";

import {
  clientServerPath,
  parseClientConfiguration,
  serializeClientConfiguration,
  withClientServers,
  type ClientConfigurationEditOptions,
  type ClientConfigurationFormat,
} from "./ClientConfigurationDocument.js";

const owned = { command: "tensor", args: ["mcp"] };
const foreign = { command: "/usr/bin/false" };

const removeTensor = (
  text: string,
  format: ClientConfigurationFormat,
  options?: ClientConfigurationEditOptions,
) => {
  const parsed = parseClientConfiguration(text, format);
  const { tensor: _removed, ...remaining } = parsed.servers;
  return serializeClientConfiguration(
    withClientServers(parsed, remaining, HOST_PLATFORM.platform),
    format,
    text,
    [clientServerPath(parsed, "tensor")],
    options,
  );
};

const parseStrictJson = (text: string): Record<string, unknown> =>
  JSON.parse(text.replace(/^\uFEFF/u, "")) as Record<string, unknown>;

describe("JSON client configuration repeated-member edits", () => {
  it("keeps the default refusal for repeated deletions", () => {
    const text =
      `{"mcpServers":{"tensor":${JSON.stringify(foreign)},` +
      `"tensor":${JSON.stringify(owned)}}}`;
    expect(removeTensor(text, "claude_code")).toEqual({
      ok: false,
      error: {
        kind: "shadowed_member",
        path: ["mcpServers", "tensor"],
      },
    });
  });

  it("removes all authorized repeats and preserves peer values in strict JSON", () => {
    const text =
      `{"mcpServers":{"tensor":${JSON.stringify(foreign)},` +
      `"peer":{"command":"peer"},` +
      `"tensor":${JSON.stringify(owned)},` +
      `"other":{"args":[1,2]},` +
      `"tensor":${JSON.stringify(owned)}}}`;
    const parsed = parseClientConfiguration(text, "claude_code");
    const path = clientServerPath(parsed, "tensor");
    const result = removeTensor(text, "claude_code", {
      removeShadowedMembersAt: [path],
    });

    if (!result.ok) throw new Error("authorized repeats were refused");
    expect(parseStrictJson(result.value)).toEqual({
      mcpServers: {
        peer: { command: "peer" },
        other: { args: [1, 2] },
      },
    });
    expect(result.value).not.toContain('"tensor"');
  });

  it("does not apply repeat-removal authority to a different path", () => {
    const text = `{"mcpServers":{"tensor":1,"tensor":2,"peer":3,"peer":4}}`;
    const parsed = parseClientConfiguration(text, "json");
    const document = withClientServers(parsed, {}, HOST_PLATFORM.platform);
    const result = serializeClientConfiguration(
      document,
      "json",
      text,
      [clientServerPath(parsed, "tensor"), clientServerPath(parsed, "peer")],
      { removeShadowedMembersAt: [clientServerPath(parsed, "tensor")] },
    );

    expect(result).toEqual({
      ok: false,
      error: {
        kind: "shadowed_member",
        path: ["mcpServers", "peer"],
      },
    });
  });

  it.each([
    ["no registration", `{"mcpServers":{"peer":1}}`, { peer: 1 }, undefined],
    [
      "one registration",
      `{"mcpServers":{"tensor":1,"peer":2}}`,
      { peer: 2 },
      undefined,
    ],
    [
      "multiple registrations",
      `{"mcpServers":{"tensor":1,"peer":2,"tensor":3,"other":4,"tensor":5}}`,
      { peer: 2, other: 4 },
      { removeShadowedMembersAt: [["mcpServers", "tensor"]] },
    ],
  ] as const)(
    "handles %s without losing peers",
    (_label, text, expectedServers, authority) => {
      const result = removeTensor(text, "json", authority);
      if (!result.ok) throw new Error("non-shadowed removal was refused");
      expect(parseStrictJson(result.value)).toEqual({
        mcpServers: expectedServers,
      });
    },
  );

  it("matches escaped keys and retains a repeated inactive parent byte for byte", () => {
    const inactive = `{"tensor":${JSON.stringify(foreign)}}`;
    const text =
      `{"mcpServers":${inactive},` +
      `"mcpServers":{"t\\u0065nsor":${JSON.stringify(foreign)},` +
      `"peer":2,"tensor":${JSON.stringify(owned)}}}`;
    const result = removeTensor(text, "claude_code", {
      removeShadowedMembersAt: [["mcpServers", "tensor"]],
    });

    if (!result.ok) throw new Error("authorized escaped repeat was refused");
    expect(result.value).toContain(`"mcpServers":${inactive}`);
    expect(parseStrictJson(result.value)).toEqual({
      mcpServers: { peer: 2 },
    });
  });

  it("preserves JSONC comments and parses BOM/CRLF output independently", () => {
    const text =
      `\uFEFF{\r\n  // top comment\r\n  "mcp": {\r\n` +
      `    "t\\u0065nsor": ${JSON.stringify(foreign)}, // first\r\n` +
      `    "peer": { "command": "peer" },\r\n` +
      `    /* second */ "tensor": ${JSON.stringify(owned)},\r\n` +
      `  },\r\n}\r\n`;
    const result = removeTensor(text, "opencode", {
      removeShadowedMembersAt: [["mcp", "tensor"]],
    });

    if (!result.ok) throw new Error("authorized JSONC repeats were refused");
    expect(result.value).toContain("// top comment");
    expect(result.value).toContain("// first");
    expect(result.value).toContain("/* second */");
    expect(result.value.startsWith("\uFEFF")).toBe(true);
    const errors: ParseError[] = [];
    const document = parseJsonc(result.value.replace(/^\uFEFF/u, " "), errors, {
      allowTrailingComma: true,
    });
    expect(errors).toEqual([]);
    expect(result.value.replaceAll("\r\n", "")).not.toContain("\n");
    expect(document).toEqual({
      mcp: { peer: { command: "peer" } },
    });
  });
});
