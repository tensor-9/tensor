import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { expect, it } from "vitest";

import {
  PROMPT_LIBRARY,
  promptLibrarySteps,
} from "../../../src/contracts/promptLibrary.js";

const page = async () =>
  readFile(join("website", "public", "prompts", "index.html"), "utf8");

const decode = (value: string) =>
  value
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&");

const normalized = (value: string) =>
  decode(value.replaceAll(/<[^>]*>/gu, ""))
    .replaceAll(/\s+/gu, " ")
    .trim();

const copyTarget = (source: string, id: string): string | undefined =>
  new RegExp(`<span id="prompt-${id}"[^>]*>([\\s\\S]*?)</span\\s*>`, "u").exec(
    source,
  )?.[1];

it("lists every prompt and workflow from the CLI catalog", async () => {
  const source = await page();
  for (const entry of PROMPT_LIBRARY) {
    expect(
      source.match(new RegExp(`data-prompt="${entry.id}"`, "gu")),
    ).toHaveLength(1);
    expect(
      source.match(new RegExp(`data-copy="prompt-${entry.id}"`, "gu")),
    ).toHaveLength(1);
  }
});

it("keeps the page title, summary and copy text identical to the catalog", async () => {
  const source = await page();
  for (const entry of PROMPT_LIBRARY) {
    const section =
      new RegExp(
        `<details[^>]*data-prompt="${entry.id}"[^>]*>([\\s\\S]*?)</details>`,
        "u",
      ).exec(source)?.[1] ?? "";
    const summary = /<summary>([\s\S]*?)<\/summary>/u.exec(section)?.[1] ?? "";
    expect(normalized(summary), entry.id).toBe(entry.title);
    const target = copyTarget(source, entry.id);
    expect(target, entry.id).toBeDefined();
    expect(normalized(target ?? ""), entry.id).toBe(entry.prompt);
    for (const step of promptLibrarySteps(entry))
      expect(normalized(section), entry.id).toContain(step.title);
  }
});
