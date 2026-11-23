import type { Logger } from "pino";
import { z } from "zod";

import { CLI_COMMANDS } from "../contracts/cliCommandNames.js";
import {
  PROMPT_LIBRARY_CATEGORIES,
  PROMPT_LIBRARY_GROUPS,
  PROMPT_LIBRARY_LEVELS,
  PROMPT_LIBRARY_ROUTES,
  listPromptLibrary,
  promptLibraryEntry,
  promptLibrarySteps,
  searchPromptLibrary,
  type PromptLibraryEntry,
  type PromptLibraryFilters,
} from "../contracts/promptLibrary.js";
import { logCliCommand } from "../cliLogging.js";
import { registerCliCommand } from "./commandRegistry.js";
import type { CliInstance } from "./types.js";

const filtersFrom = (options: {
  readonly group?: (typeof PROMPT_LIBRARY_GROUPS)[number] | undefined;
  readonly category?: (typeof PROMPT_LIBRARY_CATEGORIES)[number] | undefined;
  readonly level?: (typeof PROMPT_LIBRARY_LEVELS)[number] | undefined;
  readonly route?: (typeof PROMPT_LIBRARY_ROUTES)[number] | undefined;
}): PromptLibraryFilters => ({
  ...(options.group === undefined ? {} : { group: options.group }),
  ...(options.category === undefined ? {} : { category: options.category }),
  ...(options.level === undefined ? {} : { level: options.level }),
  ...(options.route === undefined ? {} : { route: options.route }),
});

const summaryOf = (entry: PromptLibraryEntry) => ({
  id: entry.id,
  title: entry.title,
  group: entry.group,
  category: entry.category,
  level: entry.level,
  route: entry.route,
  summary: entry.summary,
});

const detailedOf = (entry: PromptLibraryEntry) => ({
  ...summaryOf(entry),
  prompt: entry.prompt,
  expect: entry.expect,
  steps: promptLibrarySteps(entry).map(({ id, title }) => ({ id, title })),
});

/** Register the offline, provider-free starter prompt and workflow library. */
export const registerPromptLibraryCommands = (
  cli: CliInstance,
  logger: Logger,
): void => {
  registerCliCommand(cli, CLI_COMMANDS.prompts, {
    description:
      "List, search or print copy-ready Tensor prompts and workflows, from a first look at an app to reconstruction",
    args: z.object({}),
    options: z
      .object({
        action: z
          .enum(["list", "show", "search"])
          .default("list")
          .describe("Library action to perform: list, show or search"),
        prompt: z
          .string()
          .min(1)
          .refine((id) => promptLibraryEntry(id) !== undefined, {
            message:
              "Unknown prompt id; run `tensor prompts` to list identifiers",
          })
          .optional()
          .describe(
            "Prompt or workflow identifier; required with --action show",
          ),
        query: z
          .string()
          .min(1)
          .refine((value) => value.trim().length > 0)
          .optional()
          .describe("Words to match; required with --action search"),
        group: z
          .enum(PROMPT_LIBRARY_GROUPS)
          .optional()
          .describe("Restrict to quick-start, commands or workflows"),
        category: z
          .enum(PROMPT_LIBRARY_CATEGORIES)
          .optional()
          .describe("Restrict to one library category"),
        level: z
          .enum(PROMPT_LIBRARY_LEVELS)
          .optional()
          .describe("Restrict to beginner, intermediate or advanced"),
        route: z
          .enum(PROMPT_LIBRARY_ROUTES)
          .optional()
          .describe("Restrict to prompts suited to one target route"),
      })
      .superRefine((options, context) => {
        if (options.action === "show") {
          if (options.prompt === undefined)
            context.addIssue({
              code: "custom",
              path: ["prompt"],
              message: "--prompt is required with --action show",
            });
        } else if (options.prompt !== undefined)
          context.addIssue({
            code: "custom",
            path: ["prompt"],
            message: "--prompt can only be used with --action show",
          });
        if (options.action === "search") {
          if (options.query === undefined)
            context.addIssue({
              code: "custom",
              path: ["query"],
              message: "--query is required with --action search",
            });
        } else if (options.query !== undefined)
          context.addIssue({
            code: "custom",
            path: ["query"],
            message: "--query can only be used with --action search",
          });
      }),
    run: ({ options }) =>
      logCliCommand(logger, CLI_COMMANDS.prompts, async () => {
        const filters = filtersFrom(options);
        if (options.action === "show") {
          const entry = promptLibraryEntry(options.prompt ?? "");
          // The option schema rejected unknown identifiers before this run.
          return entry === undefined
            ? { status: "no_matches" as const, count: 0, matches: [] }
            : { status: "prompt" as const, prompt: detailedOf(entry) };
        }
        if (options.action === "search") {
          const matches = searchPromptLibrary(options.query ?? "", filters);
          return {
            status: matches.length === 0 ? "no_matches" : "matches",
            query: options.query,
            count: matches.length,
            matches: matches.map(summaryOf),
          };
        }
        const prompts = listPromptLibrary(filters);
        return {
          status: "library",
          count: prompts.length,
          prompts: prompts.map(summaryOf),
        };
      }),
  });
};
