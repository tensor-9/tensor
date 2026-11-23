import { describe, expect, it } from "vitest";

import {
  PROMPT_LIBRARY,
  PROMPT_LIBRARY_CATEGORIES,
  PROMPT_LIBRARY_LEVELS,
  listPromptLibrary,
  promptLibraryEntry,
  promptLibrarySteps,
  searchPromptLibrary,
} from "./promptLibrary.js";

describe("prompt library catalog", () => {
  it("uses unique, stable, slug-shaped identifiers", () => {
    const ids = PROMPT_LIBRARY.map(({ id }) => id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/u);
  });

  it("describes every entry completely and copy-ready", () => {
    for (const entry of PROMPT_LIBRARY) {
      expect(entry.title.trim(), entry.id).not.toBe("");
      expect(entry.summary.trim(), entry.id).not.toBe("");
      expect(entry.prompt.trim(), entry.id).not.toBe("");
      expect(entry.expect.trim(), entry.id).not.toBe("");
      expect(PROMPT_LIBRARY_LEVELS).toContain(entry.level);
      expect(PROMPT_LIBRARY_CATEGORIES).toContain(entry.category);
      expect(entry.prompt.endsWith("."), entry.id).toBe(true);
    }
  });

  it("composes workflows from command entries only", () => {
    const workflows = PROMPT_LIBRARY.filter(
      ({ group }) => group === "workflows",
    );
    expect(workflows.map(({ id }) => id)).toEqual([
      "understand-software",
      "analyze-application",
      "compare-versions",
      "reconstruct-application",
    ]);
    for (const workflow of workflows) {
      const steps = promptLibrarySteps(workflow);
      expect(steps.length, workflow.id).toBeGreaterThanOrEqual(4);
      expect(steps.map(({ id }) => id)).toEqual(workflow.steps);
      for (const step of steps) expect(step.group).not.toBe("workflows");
    }
    for (const entry of PROMPT_LIBRARY)
      if (entry.group !== "workflows") expect(entry.steps).toBeUndefined();
  });

  it("gives the quick start one prompt per level and every category entries", () => {
    const quickStart = listPromptLibrary({ group: "quick-start" });
    for (const level of PROMPT_LIBRARY_LEVELS)
      expect(quickStart.filter((entry) => entry.level === level).length).toBe(
        3,
      );
    for (const category of PROMPT_LIBRARY_CATEGORIES)
      expect(
        listPromptLibrary({ category }).length,
        category,
      ).toBeGreaterThanOrEqual(3);
  });

  it("filters by level, route and category together", () => {
    expect(
      listPromptLibrary({ level: "beginner" }).every(
        ({ level }) => level === "beginner",
      ),
    ).toBe(true);
    expect(
      listPromptLibrary({ group: "commands", level: "advanced" }).length,
    ).toBeGreaterThan(0);
    expect(
      listPromptLibrary({ route: "javascript" }).map(({ id }) => id),
    ).toContain("rebuild-bundle");
    expect(promptLibraryEntry("unknown-prompt")).toBeUndefined();
  });

  it("requires every search word and ranks heading matches first", () => {
    expect(searchPromptLibrary("   ")).toEqual([]);
    expect(searchPromptLibrary("zqxv")).toEqual([]);
    const callers = searchPromptLibrary("callers");
    expect(callers[0]?.id).toBe("find-callers");
    const compared = searchPromptLibrary("compare versions");
    expect(compared.map(({ id }) => id)).toContain("compare-two-builds");
    expect(compared.map(({ id }) => id)).toContain("compare-ui-versions");
    expect(
      searchPromptLibrary("compare", { group: "workflows" }).map(
        ({ id }) => id,
      ),
    ).toEqual(["compare-versions"]);
  });
});
