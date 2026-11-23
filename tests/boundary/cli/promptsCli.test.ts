import { afterAll, expect, it } from "vitest";

import { closeCliResources, createCli } from "../../../src/cli.js";

afterAll(async () => closeCliResources());

const run = async (arguments_: string[]) => {
  const cli = createCli({});
  let stdout = "";
  let exitCode = 0;
  const previousExitCode = process.exitCode;
  process.exitCode = 0;
  try {
    await cli.serve([...arguments_, "--json"], {
      env: {},
      exit: (code) => {
        exitCode = code;
      },
      stdout: (chunk) => {
        stdout += chunk;
      },
    });
    return { exitCode: process.exitCode || exitCode, stdout };
  } finally {
    process.exitCode = previousExitCode ?? 0;
  }
};

it("lists the prompt library without a provider", async () => {
  const listed = await run(["prompts"]);
  expect(listed.exitCode, listed.stdout).toBe(0);
  const library = JSON.parse(listed.stdout) as {
    readonly status: string;
    readonly count: number;
    readonly prompts: readonly {
      readonly id: string;
      readonly group: string;
      readonly level: string;
    }[];
  };
  expect(library.status).toBe("library");
  expect(library.count).toBeGreaterThan(30);
  expect(library.prompts.map(({ id }) => id)).toContain("first-look");
  expect(library.prompts.every(({ id }) => !id.includes(" "))).toBe(true);

  const beginner = JSON.parse(
    (await run(["prompts", "--level", "beginner"])).stdout,
  ) as typeof library;
  expect(beginner.count).toBeGreaterThan(0);
  expect(beginner.prompts.every(({ level }) => level === "beginner")).toBe(
    true,
  );

  const workflows = JSON.parse(
    (await run(["prompts", "--group", "workflows"])).stdout,
  ) as typeof library;
  expect(workflows.prompts.map(({ id }) => id)).toEqual([
    "understand-software",
    "analyze-application",
    "compare-versions",
    "reconstruct-application",
  ]);
});

it("prints one copy-ready prompt with its workflow steps", async () => {
  const shown = await run([
    "prompts",
    "--action",
    "show",
    "--prompt",
    "reconstruct-application",
  ]);
  expect(shown.exitCode, shown.stdout).toBe(0);
  const result = JSON.parse(shown.stdout) as {
    readonly status: string;
    readonly prompt: {
      readonly id: string;
      readonly prompt: string;
      readonly expect: string;
      readonly steps: readonly { readonly id: string }[];
    };
  };
  expect(result.status).toBe("prompt");
  expect(result.prompt.id).toBe("reconstruct-application");
  expect(result.prompt.prompt).toContain("Use Tensor");
  expect(result.prompt.expect).not.toBe("");
  expect(result.prompt.steps.map(({ id }) => id)).toEqual([
    "reconstruct-module",
    "rebuild-module",
    "rank-reconstruction-gaps",
    "verify-reconstruction",
    "rebuild-bundle",
  ]);
});

it("searches and rejects invalid selections", async () => {
  const found = await run(["prompts", "--action", "search", "--query", "map"]);
  expect(found.exitCode, found.stdout).toBe(0);
  expect(JSON.parse(found.stdout)).toMatchObject({ status: "matches" });
  const absent = await run([
    "prompts",
    "--action",
    "search",
    "--query",
    "zqxv",
  ]);
  expect(JSON.parse(absent.stdout)).toMatchObject({
    status: "no_matches",
    count: 0,
  });
  const unknown = await run([
    "prompts",
    "--action",
    "show",
    "--prompt",
    "not-a-prompt",
  ]);
  expect(unknown.exitCode).not.toBe(0);
  expect(JSON.parse(unknown.stdout)).toMatchObject({
    code: "VALIDATION_ERROR",
    fieldErrors: [expect.objectContaining({ path: "prompt" })],
  });
  const missing = await run(["prompts", "--action", "show"]);
  expect(missing.exitCode).not.toBe(0);
  const strayQuery = await run(["prompts", "--query", "map"]);
  expect(strayQuery.exitCode).not.toBe(0);
  const badLevel = await run(["prompts", "--level", "expert"]);
  expect(badLevel.exitCode).not.toBe(0);
});
