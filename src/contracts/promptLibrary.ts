/**
 * The starter prompt library: copy-ready questions ordered from a first look at
 * an application to bounded reconstruction work. Every entry is documentation
 * only; rendering or selecting one never inspects a target, starts analysis, or
 * changes session state. Workflow entries compose entry identifiers rather than
 * repeating their instructions.
 */

export const PROMPT_LIBRARY_GROUPS = [
  "quick-start",
  "commands",
  "workflows",
] as const;
export type PromptLibraryGroup = (typeof PROMPT_LIBRARY_GROUPS)[number];

export const PROMPT_LIBRARY_LEVELS = [
  "beginner",
  "intermediate",
  "advanced",
] as const;
export type PromptLibraryLevel = (typeof PROMPT_LIBRARY_LEVELS)[number];

export const PROMPT_LIBRARY_CATEGORIES = [
  "getting-started",
  "software-analysis",
  "architecture",
  "ui-analysis",
  "code-analysis",
  "reconstruction",
] as const;
export type PromptLibraryCategory = (typeof PROMPT_LIBRARY_CATEGORIES)[number];

/** Which kind of target a prompt expects, so the reader can pick a useful one. */
export const PROMPT_LIBRARY_ROUTES = [
  "any",
  "native",
  "javascript",
  "android",
  "managed",
  "apple",
] as const;
export type PromptLibraryRoute = (typeof PROMPT_LIBRARY_ROUTES)[number];

/** One copy-ready prompt, or one ordered workflow of library entries. */
export interface PromptLibraryEntry {
  /** Stable identifier accepted by `tensor prompts --prompt`. */
  readonly id: string;
  readonly title: string;
  readonly group: PromptLibraryGroup;
  readonly category: PromptLibraryCategory;
  readonly level: PromptLibraryLevel;
  /** When this prompt is the right starting point. */
  readonly summary: string;
  /** The exact text a reader pastes into their coding agent. */
  readonly prompt: string;
  /** What a useful answer contains, so an incomplete reply is recognizable. */
  readonly expect: string;
  readonly route: PromptLibraryRoute;
  /** Ordered entry identifiers; set on workflow entries only. */
  readonly steps?: readonly string[];
}

/** Filters shared by `tensor prompts` list and search. */
export interface PromptLibraryFilters {
  readonly group?: PromptLibraryGroup;
  readonly category?: PromptLibraryCategory;
  readonly level?: PromptLibraryLevel;
  readonly route?: PromptLibraryRoute;
}

export const PROMPT_LIBRARY: readonly PromptLibraryEntry[] = [
  // Quick start: beginner
  {
    id: "first-look",
    title: "What am I looking at?",
    group: "quick-start",
    category: "getting-started",
    level: "beginner",
    route: "any",
    summary:
      "Identify an application, its platform and its build shape before asking anything harder.",
    prompt:
      "Use Tensor to look at the application I have open. Tell me what kind of application it is, which platform it targets, what it appears to be built with, and which files carry the real logic. Base the answer only on what you can actually observe, and list what you could not determine.",
    expect:
      "A short target profile: format, platform, runtime or framework, main files, and explicit unknowns.",
  },
  {
    id: "what-does-it-do",
    title: "Explain what this app does",
    group: "quick-start",
    category: "getting-started",
    level: "beginner",
    route: "any",
    summary:
      "Get a plain-language tour of the features a user sees, with no jargon.",
    prompt:
      "Use Tensor to explain this application in plain language. What is it for, what are the main things a user can do, which screens or commands expose those features, and how do the parts connect? Mark anything you inferred instead of observed, and skip details that need a deeper investigation.",
    expect:
      "A readable overview of the user-facing features and how they join, with inferences labeled.",
  },
  {
    id: "find-text",
    title: "Find where a text appears",
    group: "quick-start",
    category: "getting-started",
    level: "beginner",
    route: "any",
    summary:
      "Start from a string you can see on screen, such as an error message or a label.",
    prompt:
      'Use Tensor to find the text "<paste the text here>" in this application. Show every place it appears, what file, module or address holds it, and what uses it. If it appears in more than one place, list each one instead of picking a favourite.',
    expect:
      "Each occurrence with its location and nearby code, plus the parts of the application that reference it.",
  },
  // Quick start: intermediate
  {
    id: "trace-screen-action",
    title: "Trace one UI action",
    group: "quick-start",
    category: "getting-started",
    level: "intermediate",
    route: "any",
    summary:
      "Follow a single click, command or keystroke from the event to its effect.",
    prompt:
      'Use Tensor to trace what happens when I use "<the button, menu item or command>" in this application. Find the handler, follow the work it performs, and describe the result the user sees. Name the files or functions on the path, and say where the trail stopped if you could not follow it all the way.',
    expect:
      "An ordered path from the event to the visible result, with the evidence for each hop and any break in the chain.",
  },
  {
    id: "find-data-source",
    title: "Where does this data come from?",
    group: "quick-start",
    category: "getting-started",
    level: "intermediate",
    route: "any",
    summary:
      "Connect something shown on screen to the file, network call or service behind it.",
    prompt:
      'Use Tensor to find where the data on "<the screen or field>" comes from. Identify the code that loads it, the file, network endpoint or service it reads, and the format it expects. Show the loading path and what happens when the source is missing or malformed.',
    expect:
      "A data path from source to display, the format involved, and the failure behavior when data is absent.",
  },
  {
    id: "compare-two-builds",
    title: "Compare two versions",
    group: "quick-start",
    category: "getting-started",
    level: "intermediate",
    route: "any",
    summary:
      "Find what changed between two builds without assuming every difference matters.",
    prompt:
      "Use Tensor to compare the two versions of this application that I have open or supplied. List what changed in files, code and user-visible behavior, and what stayed the same. Treat a difference as a possible behavior change until you have evidence for both sides, and call out anything you could not compare.",
    expect:
      "A change list grouped by file, code and behavior, with the same-as and could-not-compare results kept separate.",
  },
  // Quick start: advanced
  {
    id: "trace-feature-end-to-end",
    title: "Trace a feature end to end",
    group: "quick-start",
    category: "getting-started",
    level: "advanced",
    route: "any",
    summary:
      "Answer a real product question with one finding ledger instead of scattered calls.",
    prompt:
      'Use Tensor to trace how "<the feature>" works end to end. Start from the user action, follow it through the code and data it touches, and finish with a finding ledger: what you observed with its evidence, what you inferred and how confident you are, and what remains unknown. Do not fill gaps with plausible-sounding guesses.',
    expect:
      "A finding ledger that ties every conclusion to observed evidence and states the remaining unknowns.",
  },
  {
    id: "audit-unknowns",
    title: "Audit what is still unknown",
    group: "quick-start",
    category: "getting-started",
    level: "advanced",
    route: "any",
    summary:
      "Review open questions before trusting an investigation's conclusions.",
    prompt:
      "Use Tensor to review the open questions from this investigation. For each one, say whether the evidence we now have answers it, contradicts it, or still cannot resolve it, and name the authority or environment that would settle it. Do not close a question just because it is inconvenient.",
    expect:
      "A per-question status with the evidence that decides it and the specific next probe for the rest.",
  },
  {
    id: "reconstruct-module",
    title: "Reconstruct one module",
    group: "quick-start",
    category: "getting-started",
    level: "advanced",
    route: "any",
    summary:
      "Turn observed behavior of a small area into readable source you can keep.",
    prompt:
      'Use Tensor to reconstruct "<the module, class or set of functions>" as readable source that reproduces the behavior you can observe. Keep the original interfaces and error behavior where they are visible, comment the places where you had to infer intent, and list what the reconstruction does not cover.',
    expect:
      "Compilable or runnable code for the named area, with inferred decisions marked and unverified behavior listed.",
  },

  // Command library: software analysis
  {
    id: "inventory-target",
    title: "Inventory an application",
    group: "commands",
    category: "software-analysis",
    level: "beginner",
    route: "any",
    summary:
      "Get the file-level picture: formats, entry points, dependencies and metadata.",
    prompt:
      "Use Tensor to inventory this application. Summarize the top-level files, their formats, the declared entry points, bundled dependencies, embedded resources and any signing or integrity metadata. Group the findings so I can see what is application code, what is third-party, and what is data.",
    expect:
      "A structured inventory that separates application code, dependencies, resources and metadata.",
  },
  {
    id: "map-entry-points",
    title: "Map the entry points",
    group: "commands",
    category: "software-analysis",
    level: "intermediate",
    route: "native",
    summary:
      "Find how execution starts and which code the platform calls first.",
    prompt:
      "Use Tensor to find the entry points of this native application. Identify the platform start routine, the application's own initialization, and how control reaches its main features. Show the chain from entry to the first feature-level function, and say which links are uncertain.",
    expect:
      "An entry-point list with the initialization chain and the evidence for each hop.",
  },
  {
    id: "find-network-calls",
    title: "Find network calls",
    group: "commands",
    category: "software-analysis",
    level: "intermediate",
    route: "any",
    summary:
      "List the endpoints an application talks to and where each request starts.",
    prompt:
      "Use Tensor to find every outbound network request this application can make. For each one, give the endpoint or template, the method, the payload shape if visible, and the code that triggers it. Mark requests you inferred from strings or configuration as unconfirmed until you see the call site.",
    expect:
      "A request inventory with endpoints, triggers and confidence, separating observed calls from inferred ones.",
  },
  {
    id: "check-signing-integrity",
    title: "Check signing and integrity",
    group: "commands",
    category: "software-analysis",
    level: "intermediate",
    route: "any",
    summary:
      "Establish whether a build is signed as shipped and whether it was modified.",
    prompt:
      "Use Tensor to check the signing and integrity information of this application. Report the signature type, the signer, the digest algorithms used, and whether any file appears modified after signing. Explain what each result proves and what it does not prove.",
    expect:
      "A signing summary with the verification steps, their results and the limits of each claim.",
  },
  // Command library: architecture
  {
    id: "map-modules",
    title: "Map modules and dependencies",
    group: "commands",
    category: "architecture",
    level: "intermediate",
    route: "any",
    summary:
      "See the real module boundaries and which direction dependencies run.",
    prompt:
      "Use Tensor to map the modules of this application and the dependencies between them. Group related files into modules using observed references, not filenames alone, and show the dependency direction. Point out cycles, hub modules and anything that looks like a boundary the code does not respect.",
    expect:
      "A module map with dependency directions, plus cycles and boundary violations called out.",
  },
  {
    id: "trace-request-path",
    title: "Follow one request path",
    group: "commands",
    category: "architecture",
    level: "advanced",
    route: "any",
    summary:
      "Document one path from input to storage, including the layers it crosses.",
    prompt:
      "Use Tensor to follow one request through this application: from where it enters, through validation, business logic and any persistence or network step, to its response. Name the layer each step belongs to, and stop at any step where the evidence runs out instead of assuming the rest.",
    expect:
      "A layer-by-layer path with the evidence for each step and explicit gaps.",
  },
  {
    id: "find-state-owners",
    title: "Find who owns state",
    group: "commands",
    category: "architecture",
    level: "advanced",
    route: "any",
    summary: "Identify the owner of each piece of persistent or shared state.",
    prompt:
      "Use Tensor to identify which components own the persistent and shared state in this application. For each store, cache or settings file, name the code that reads it, the code that writes it, the format, and what happens on conflicting or partial writes. Say where ownership is unclear.",
    expect:
      "A state inventory with owners, formats, read/write sites and unclear ownership flagged.",
  },
  {
    id: "document-extension-points",
    title: "Document extension points",
    group: "commands",
    category: "architecture",
    level: "advanced",
    route: "any",
    summary:
      "Find plugins, scripts, updates and other places where outside code enters.",
    prompt:
      "Use Tensor to find the extension points in this application: plugins, scripts, macros, update channels and configuration hooks. For each one, explain what it can do, what it is allowed to trust, and how the application validates it. Treat a missing validation as an observation to verify, not automatically as a vulnerability.",
    expect:
      "An extension-point list with capabilities, trust decisions and the evidence behind each.",
  },
  // Command library: UI analysis
  {
    id: "map-screens",
    title: "Map every screen",
    group: "commands",
    category: "ui-analysis",
    level: "beginner",
    route: "any",
    summary:
      "Inventory the user interface: screens, dialogs and how you reach them.",
    prompt:
      "Use Tensor to map the user interface of this application. List the screens and dialogs, how each one is reached, the data it shows, and the actions or settings it writes. Note any screen or menu that exists in the resources but is not reachable from normal navigation.",
    expect:
      "A screen map with navigation paths, displayed data, written settings and hidden surfaces called out.",
  },
  {
    id: "trace-ui-action",
    title: "Trace a UI action in detail",
    group: "commands",
    category: "ui-analysis",
    level: "intermediate",
    route: "any",
    summary:
      "Follow one interaction through validation, update and error paths.",
    prompt:
      'Use Tensor to trace the interaction behind "<the control>" in detail: the event, the validation it performs, the state it updates, the UI it refreshes and every error path the user could hit. Show the code for each step and say which branch you exercised only by reading.',
    expect:
      "A step-by-step interaction trace with validation, state changes, redraws and error paths.",
  },
  {
    id: "inspect-ui-assets",
    title: "Inspect UI resources",
    group: "commands",
    category: "ui-analysis",
    level: "intermediate",
    route: "any",
    summary:
      "Read layouts, strings, icons and styles for what they reveal about the product.",
    prompt:
      "Use Tensor to inspect the UI resources of this application: layouts, string tables, icons, styles and localized text. Summarize what they reveal about features, languages, unfinished work or hidden screens, and link each observation to the resource it came from.",
    expect:
      "A resource summary tied to specific files, including features or languages the UI hides.",
  },
  {
    id: "compare-ui-versions",
    title: "Compare the UI across versions",
    group: "commands",
    category: "ui-analysis",
    level: "advanced",
    route: "any",
    summary:
      "Diff two builds from the user's point of view: screens, labels and flows.",
    prompt:
      "Use Tensor to compare the user interface of two versions of this application. Report screens added, removed or renamed, labels and defaults that changed, and flows whose steps differ. Separate what you observed in resources from what you inferred about the running app.",
    expect:
      "A UI change list by screen and label, with observed and inferred changes separated.",
  },
  // Command library: code analysis
  {
    id: "explain-function",
    title: "Explain a function",
    group: "commands",
    category: "code-analysis",
    level: "beginner",
    route: "native",
    summary:
      "Understand one function's intent, inputs, outputs and side effects.",
    prompt:
      'Use Tensor to explain what "<function name or address>" does. Cover its inputs, return value, side effects, error handling and any global state it touches, then give a short plain-language summary of its purpose. Quote the evidence you relied on.',
    expect:
      "A function dossier with signature, behavior, side effects and a plain-language purpose.",
  },
  {
    id: "find-callers",
    title: "Find callers and conditions",
    group: "commands",
    category: "code-analysis",
    level: "intermediate",
    route: "native",
    summary: "See who reaches a function and under which conditions.",
    prompt:
      'Use Tensor to find every caller of "<function name or address>" and the condition under which each call happens. Include indirect calls through pointers or tables when you can resolve them, and label the references you could not confirm instead of dropping them.',
    expect:
      "A caller list with call conditions, plus unresolved indirect references labeled as such.",
  },
  {
    id: "recover-types",
    title: "Recover data types",
    group: "commands",
    category: "code-analysis",
    level: "advanced",
    route: "native",
    summary:
      "Rebuild the structures a piece of code relies on, field by field.",
    prompt:
      'Use Tensor to recover the data types used by "<function, module or area>". For each structure, list the fields you can justify, their widths and offsets, and how the code validates or initializes them. Mark padding, unknown fields and guessed names, and explain the evidence for each layout claim.',
    expect:
      "Recovered type definitions with offsets, field evidence and guessed or unknown fields clearly marked.",
  },
  {
    id: "review-error-handling",
    title: "Review error handling",
    group: "commands",
    category: "code-analysis",
    level: "advanced",
    route: "any",
    summary: "Check failure paths, swallowed errors and what the user is told.",
    prompt:
      'Use Tensor to review the error handling in "<area or feature>". List the failure paths you can find, the errors that are swallowed or logged without a recovery action, retries and their limits, and the messages the user actually sees. Rank the findings by user impact and cite the code for each.',
    expect:
      "An error-handling review with failure paths, swallowed errors, retry behavior and user-visible messages.",
  },
  // Command library: reconstruction
  {
    id: "rebuild-module",
    title: "Rebuild a module",
    group: "commands",
    category: "reconstruction",
    level: "advanced",
    route: "any",
    summary:
      "Produce working source for one module that matches observed behavior.",
    prompt:
      'Use Tensor to rebuild "<module>" as working source in "<language or framework>". Match the interfaces and behavior you can observe, keep the original error handling, and leave a comment wherever you had to choose an implementation detail. List the behavior the rebuild does not reproduce.',
    expect:
      "Source code for the module with inferred choices marked and unreproduced behavior listed.",
  },
  {
    id: "rank-reconstruction-gaps",
    title: "Rank the remaining gaps",
    group: "commands",
    category: "reconstruction",
    level: "advanced",
    route: "any",
    summary:
      "Decide what to investigate next instead of chasing every unknown.",
    prompt:
      "Use Tensor to list what is still missing from this reconstruction and rank it. For each gap, give the behavior at risk, how likely it is to matter, what evidence would close it, and the cost of getting that evidence. Put the highest-risk, cheapest-to-settle gaps first.",
    expect:
      "A ranked gap list with risk, required evidence and cost, ordered for the next session.",
  },
  {
    id: "verify-reconstruction",
    title: "Verify a reconstruction",
    group: "commands",
    category: "reconstruction",
    level: "advanced",
    route: "any",
    summary:
      "Test a rebuild claim by claim instead of declaring it equivalent.",
    prompt:
      'Use Tensor to verify this reconstruction against the original for the behaviors I list: "<behavior 1, behavior 2>". Give a pass, fail or unknown result per claim with the evidence behind it, and state plainly that the result covers only those claims, not the whole application.',
    expect:
      "Per-claim results with evidence and an explicit statement of what the verification does not cover.",
  },
  {
    id: "rebuild-bundle",
    title: "Rebuild a runnable bundle",
    group: "commands",
    category: "reconstruction",
    level: "advanced",
    route: "javascript",
    summary: "Turn an extracted bundle into a project that runs again.",
    prompt:
      "Use Tensor to help me rebuild a runnable project from this extracted JavaScript bundle. Identify the entry points, module format, assets and configuration, then scaffold a project that starts the same way. Keep a list of what you had to add, rename or stub, and note anything that still depends on the original runtime.",
    expect:
      "A runnable scaffold with entry points wired, plus the list of additions, renames and remaining runtime dependencies.",
  },

  // Workflow library
  {
    id: "understand-software",
    title: "Understand a piece of software",
    group: "workflows",
    category: "getting-started",
    level: "beginner",
    route: "any",
    summary: "Go from a first look to a working mental model in one pass.",
    prompt:
      "Use Tensor to help me understand this software from scratch. Start with a plain-language overview, then inventory the files and dependencies, then map the modules and entry points. Finish with a one-page summary: what it is, what it does, how it is organized, and what still needs a deeper look.",
    expect:
      "One summary page that carries the overview, inventory, module map and entry points, with open questions listed.",
    steps: [
      "first-look",
      "inventory-target",
      "map-modules",
      "map-entry-points",
    ],
  },
  {
    id: "analyze-application",
    title: "Analyze an application",
    group: "workflows",
    category: "getting-started",
    level: "intermediate",
    route: "any",
    summary:
      "Build a behavior map of screens, actions, data sources and network calls.",
    prompt:
      "Use Tensor to analyze how this application behaves. Map the screens, trace the main action on each one, find where the data comes from and which network calls are involved. Produce a behavior map that links each user action to its handler, its data source and its visible result.",
    expect:
      "A behavior map from screens to actions to handlers to data sources, with evidence at each link.",
    steps: [
      "map-screens",
      "trace-screen-action",
      "find-data-source",
      "find-network-calls",
    ],
  },
  {
    id: "compare-versions",
    title: "Compare two versions",
    group: "workflows",
    category: "getting-started",
    level: "advanced",
    route: "any",
    summary: "Produce a defensible change report between two builds.",
    prompt:
      "Use Tensor to compare these two versions and report the differences that matter. Compare the files and code, then the user interface, then signing and integrity metadata. Separate confirmed changes from possible ones, say what you could not compare, and audit the changes you are unsure about before finishing.",
    expect:
      "A comparison report grouped by code, UI and integrity, with confirmed, possible and incomparable changes kept apart.",
    steps: [
      "compare-two-builds",
      "compare-ui-versions",
      "check-signing-integrity",
      "audit-unknowns",
    ],
  },
  {
    id: "reconstruct-application",
    title: "Reconstruct an application",
    group: "workflows",
    category: "getting-started",
    level: "advanced",
    route: "any",
    summary:
      "Move from one module rebuild to a verified, prioritized reconstruction.",
    prompt:
      "Use Tensor to reconstruct this application in stages. Rebuild one module first and check it, then rank what is still missing, verify the claims you can actually test, and assemble a runnable bundle where that makes sense. Keep the verified and unverified parts of the result clearly separated.",
    expect:
      "A staged reconstruction with the rebuilt module, a ranked gap list, verification results and a runnable assembly where possible.",
    steps: [
      "reconstruct-module",
      "rebuild-module",
      "rank-reconstruction-gaps",
      "verify-reconstruction",
      "rebuild-bundle",
    ],
  },
];

const matchesFilters = (
  entry: PromptLibraryEntry,
  filters: PromptLibraryFilters,
): boolean =>
  (filters.group === undefined || entry.group === filters.group) &&
  (filters.category === undefined || entry.category === filters.category) &&
  (filters.level === undefined || entry.level === filters.level) &&
  (filters.route === undefined ||
    filters.route === "any" ||
    entry.route === filters.route);

/** Library entries in authored order, optionally narrowed by filters. */
export const listPromptLibrary = (
  filters: PromptLibraryFilters = {},
): readonly PromptLibraryEntry[] =>
  PROMPT_LIBRARY.filter((entry) => matchesFilters(entry, filters));

/** Resolve one entry by its stable identifier. */
export const promptLibraryEntry = (
  id: string,
): PromptLibraryEntry | undefined =>
  PROMPT_LIBRARY.find((entry) => entry.id === id);

/** Resolve the entries a workflow composes, in their declared order. */
export const promptLibrarySteps = (
  entry: PromptLibraryEntry,
): readonly PromptLibraryEntry[] =>
  (entry.steps ?? []).flatMap((id) => {
    const step = promptLibraryEntry(id);
    return step === undefined ? [] : [step];
  });

const searchableText = (entry: PromptLibraryEntry): string =>
  [
    entry.id,
    entry.title,
    entry.summary,
    entry.category.replaceAll("-", " "),
    entry.level,
    entry.route,
    ...(entry.steps === undefined ? [] : [entry.steps.join(" ")]),
  ]
    .join(" ")
    .toLowerCase();

/**
 * Rank entries whose searchable fields contain every query word. A title or
 * identifier match outranks a summary match, and authored order breaks ties.
 */
export const searchPromptLibrary = (
  query: string,
  filters: PromptLibraryFilters = {},
): readonly PromptLibraryEntry[] => {
  const words = query.toLowerCase().split(/\s+/u).filter(Boolean);
  if (words.length === 0) return [];
  return listPromptLibrary(filters)
    .flatMap((entry, index) => {
      const text = searchableText(entry);
      if (!words.every((word) => text.includes(word))) return [];
      const heading = `${entry.id} ${entry.title}`.toLowerCase();
      const score = words.filter((word) => heading.includes(word)).length;
      return [{ entry, index, score }];
    })
    .sort((left, right) =>
      left.score === right.score
        ? left.index - right.index
        : right.score - left.score,
    )
    .map(({ entry }) => entry);
};
