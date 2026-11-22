<div align="center">

**English** · [简体中文](docs/readme/README_zh.md) · [繁體中文](docs/readme/README_zh-TW.md) · [日本語](docs/readme/README_ja.md) · [한국어](docs/readme/README_ko.md) · [Türkçe](docs/readme/README_tr.md) · [Русский](docs/readme/README_ru.md) · [Tiếng Việt](docs/readme/README_vi.md) · [ไทย](docs/readme/README_th.md) · [Deutsch](docs/readme/README_de.md) · [Español](docs/readme/README_es.md) · [Français](docs/readme/README_fr.md) · [Українська](docs/readme/README_uk.md) · [Polski](docs/readme/README_pl.md) · [Português (Brasil)](docs/readme/README_pt-BR.md) · [العربية](docs/readme/README_ar.md) · [فارسی](docs/readme/README_fa.md) · [Bahasa Indonesia](docs/readme/README_id.md) · [Italiano](docs/readme/README_it.md)
· [Ελληνικά](docs/readme/README_el.md) · [മലയാളം](docs/readme/README_ml.md) · [Roman Urdu](docs/readme/README_ur-Latn.md) · [Română](docs/readme/README_ro.md) · [Български](docs/readme/README_bg.md)

# Tensor: Reverse Engineer Anything

### One MCP for reverse engineering across binaries, applications, and runtime behavior.

**See a feature you like. Understand how it works, down to the binary level.**

[![npm version](https://img.shields.io/npm/v/tensor-agents?style=flat-square&color=cb3837)](https://www.npmjs.com/package/tensor-agents)
[![MCP tool catalog](https://img.shields.io/badge/MCP-tool_catalog-5c4ee5?style=flat-square)](docs/reference/mcp-contracts.md#generated-catalog)
[![Node.js requirements](https://img.shields.io/badge/Node.js-requirements-339933?style=flat-square&logo=nodedotjs&logoColor=white)](#what-you-can-analyze)
[![skills.sh](https://skills.sh/b/tensor-9/tensor?style=flat-square)](https://skills.sh/tensor-9/tensor/tensor-reverse-engineering)
[![MIT license](https://img.shields.io/badge/license-MIT-f4c430?style=flat-square)](LICENSE)
[![Discord](https://img.shields.io/discord/1556595354999332884?logo=discord&logoColor=white&label=Discord&color=5865F2)](https://discord.gg/GkcryMnJDM)

<a href="https://trendshift.io/repositories/82054?utm_source=repository-badge&amp;utm_medium=badge&amp;utm_campaign=badge-repository-82054" target="_blank" rel="noopener noreferrer"><img src="https://trendshift.io/api/badge/repositories/82054" alt="tensor-9%2Ftensor | Trendshift" width="250" height="55"/></a>

**[Website](https://tensor-9.github.io/tensor/) · [Guides](https://tensor-9.github.io/tensor/guides/) · [Showcases](https://tensor-9.github.io/tensor/showcase/)**

<a href="https://discord.com/invite/GkcryMnJDM"><img alt="Join the Tensor community on Discord" src="https://img.shields.io/badge/Join%20us%20on%20Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" height="40"></a>

[Quick start](#quick-start) · [How Tensor works](#how-tensor-works) · [What you can analyze](#what-you-can-analyze) · [Showcases](#showcases) · [Build RL environments](#build-rl-environments) · [FAQ](#faq) · [Documentation](#documentation)

<code>npx tensor-agents setup</code>

</div>

> [!IMPORTANT]
> Get Tensor from [tensor-9/tensor](https://github.com/tensor-9/tensor),
> [tensor-9.github.io/tensor](https://tensor-9.github.io/tensor/), or the [tensor-agents npm package](https://www.npmjs.com/package/tensor-agents).
> Follow the installation and release links from these official sources. A similar
> repository name or copied README does not establish that a download is official.

<div align="center">

<br />

<img src="docs/assets/tensor-hopper-analysis.png" alt="Tensor launching its analysis bridge inside Hopper while inspecting a native binary" width="1200" />

<br /><br />

<table aria-label="Tensor community">
<tr>
<td align="center" width="360">
  <a href="https://discord.gg/GkcryMnJDM">
    <img src="docs/assets/discord.svg" height="42" alt="Discord" /><br />
    <strong>Join the Reverse Engineering Community</strong>
  </a><br />
  <sub>Discord · Q&amp;A · Show and Tell</sub>
</td>
</tr>
</table>

<br />

</div>

---

See a feature in an app that you want in your own product? Ask your agent to investigate it with Tensor. It can inspect the app without its source code, explain how the feature works, show the evidence, and build a version for your project.

Tensor connects your agent to tools for inspecting native binaries, JavaScript and Electron apps, .NET assemblies, and websites. You can also use the same tools from your terminal. Analysis runs locally, and results include the evidence and limitations behind each conclusion.

Setup registers Tensor with your agent and installs matching workflow instructions. Native analysis can use an existing Hopper, Ghidra, IDA or Kuna installation; setup can optionally install Hopper with approval. Static JavaScript analysis needs no native analysis engine.

> **[Visit the Tensor website](https://tensor-9.github.io/tensor/)** for setup instructions, illustrated guides, and real case studies.

## Quick start

On Linux, Ghidra, JADX, firmware tool launches and static JavaScript/Electron
analysis require a procps-compatible system `ps` for process ownership
checks. Recovery steps are in `docs/getting-started/installation.md` under
"Linux owned-process prerequisite".

### Install

With Node.js and npm installed, run:

```bash
npm install --global tensor-agents
tensor setup
```

`tensor setup` configures your agents and installs matching workflow
instructions. Prefer not to install globally? `npx tensor-agents setup` runs
the same setup without a persistent install.

### Set up your agent

Choose your agents, review the proposed changes, and approve them. Setup adds
Tensor's MCP server and matching workflow instructions, with backups of existing
configuration. Restart your agent afterward. Setup records the selected runtime and Tensor
entry script directly. If acquired through a package runner, keep its cache entry
available. Run package acquisition from a trusted directory outside the target
project. Installation and recovery details are in the setup guide below.

Setup supports Claude Code, Codex, Cursor, Gemini CLI, Grok Build and
[other agents](docs/getting-started/installation.md#supported-agents). See
[installation and setup](docs/getting-started/installation.md) for provider configuration,
manual MCP registration, Claude Code/Codex plugins, and the Cursor Marketplace
plugin.

MCP advertises compact input schemas to reduce context overhead; guidance a
compact schema omits follows the tool description. The full tool set and
canonical server validation are unchanged. See "Compact input schema profile"
in the MCP contracts guide.

Output schemas are omitted from `tools/list` by default: no model API reads
them, and Tensor validates every result itself. Set
`TENSOR_MCP_OUTPUT_SCHEMA_PROFILE=compact` to advertise each output schema within
a 4,096-byte budget. Both settings keep canonical server-side validation and
complete structured results. See "Output schemas" in the MCP contracts guide.

### Ask your agent

```text
Understand how search works in the Notes app, show me the evidence, and build a
similar feature for my project.
```

Replace Notes with your target app and the feature you want to understand.

### Use the terminal

Inspect an extracted JavaScript/Electron app directory or ASAR:

```bash
npx -y tensor-agents@latest analyze-javascript-application /absolute/path/to/app --json
```

The result includes modules, imports, Electron boundaries and their evidence.
Replace the path with your target, such as `"D:/apps/example"` on Windows.

To install the `tensor` command for regular use:

```bash
npm install --global tensor-agents
tensor --help
```

For native analysis, configure a provider first. See the
[CLI and Evidence guide](docs/getting-started/cli.md) for native commands, provider selection,
snapshots and scripting.

### Update Tensor

Tensor changes quickly, and new releases include frequent bug fixes. Keep your
installation up to date.

For a CLI installed with `npm install --global` or `bun add --global`:

```bash
tensor update
```

`tensor --update` is an alias for this verified workflow and accepts the same global
output flags. Use `tensor update` when combining it with other command controls.

Updater commands retain at most 4 MiB of stdout and stderr combined. Oversized
metadata replies are rejected after the command exits; verbose installs continue
with bounded diagnostics. Human progress output respects terminal backpressure
and waits for submitted writes to finish.

Bun global updates require Bun 1.2.17 or later. With an older Bun release,
upgrade Bun manually before running `tensor update`.

To refresh your agent registrations and skill, run the setup command printed
by the update.

If you use `npx`, update your agent setup with:

```bash
npx tensor-agents@latest setup
```

Review the setup changes and restart your agent. For one-off CLI commands,
use `npx tensor-agents@latest` followed by the command. With Bun, use
`bunx tensor-agents@latest` in place of `npx tensor-agents@latest`.

## How Tensor works

Your agent calls Tensor through MCP to inspect the target and trace relevant code.
Tensor returns findings with their evidence. The agent uses them to ask follow-up
questions, explain the behavior, or write and test an implementation.
CLI commands use the same workflows.

![Tensor investigation flow: your agent asks about a local target, Tensor inspects and traces it using analysis tools, and the agent uses the returned code, references and unknowns to explain, implement and test.](website/public/assets/figures/tensor-investigation-flow.svg)

[Open the full-size figure](website/public/assets/figures/tensor-investigation-flow.svg).

<a id="current-status"></a>

## What you can analyze

Tensor requires Node.js 22.x (>=22.23.4), 24.x (>=24.22.1), or 26.12.1+, plus npm.
Additional tools and host support depend on the target:

| Target                  | What Tensor returns                                                                               | Requirements and guide                                                                                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Desktop installations   | Runtime candidates, supporting files, component markers and next probes                           | Built-in bounded directory/header inspection; [desktop applications](docs/desktop-applications.md)                                                                   |
| Native binaries         | Pseudocode, assembly, strings, symbols, calls and references                                      | Hopper, Ghidra, IDA or Kuna; [native analysis](docs/guides/native/native-investigation.md)                                                                           |
| Offline ELF layout      | Sections, segments, original symbols/relocations and static mitigation candidates                 | Caller-supplied pwntools on Linux x64; [binary diagnostics](docs/guides/native/binary-diagnostics.md)                                                                |
| Go binaries             | Embedded compiler version, modules, replacements and build settings                               | Built-in static ELF/PE/thin Mach-O inspection; no Go installation required                                                                                           |
| GPU code objects        | CUDA/HIP targets, selected kernel parameters and resources, retained PTX text                     | Built-in static ELF/PE/fatbin/CUBIN/PTX inspection; [GPU code objects](docs/gpu-code-objects.md)                                                                     |
| Model artifacts         | GGUF / safetensors metadata, tensor declarations and derived totals                               | Built-in header inspection; optional full-file hash; [model files](docs/model-artifacts.md)                                                                          |
| IL2CPP metadata         | Unity global-metadata.dat assembly images, type and method names and index ranges                 | Built-in static decoding of versions 24, 27, 29, 31 and 39; no Unity required                                                                                        |
| Godot PCK               | Archive inventory and extraction, original header/directory facts and selected content identities | Built-in static formats 2, 3 and 4; no Godot required                                                                                                                |
| Rust binaries           | Embedded cargo-auditable crate names, versions, sources and dependency edges                      | Built-in static ELF/PE/thin Mach-O/WebAssembly module inspection; [Rust binaries](docs/rust-binaries.md)                                                             |
| PE certificates         | Authenticode WIN_CERTIFICATE entries and PKCS#7 signer/X.509 identity fields                      | Built-in static PE inspection; [PE certificates](docs/pe-certificates.md)                                                                                            |
| PE imports              | Import and delay-load DLL names, ordinals, IAT RVAs and pefile import hash                        | Built-in static PE inspection; [PE imports](docs/pe-imports.md)                                                                                                      |
| Windows shortcuts       | Shell Link target, arguments, working dir, ExtraData and Tracker droid facts                      | Built-in static LNK inspection; [Windows shortcuts](docs/guides/native/windows-shortcut.md)                                                                          |
| ELF notes               | PT_NOTE/SHT_NOTE owners, types, and supported note metadata                                       | Built-in static ELF inspection; [ELF notes](docs/elf-notes.md)                                                                                                       |
| DWARF compile units     | Compile-unit name, directory, producer, language, and dwo_name                                    | Built-in static ELF, Mach-O, and PE inspection; [DWARF compile units](docs/guides/native/dwarf-units.md)                                                             |
| ELF dependencies        | DT_NEEDED, SONAME, RPATH/RUNPATH, GNU versions, and undefined imports                             | Built-in static ELF inspection; [ELF dependencies](docs/elf-dependencies.md)                                                                                         |
| Binary hardening        | PIE, NX, RELRO, CFG and related header flags for ELF, PE and Mach-O                               | Built-in static header inspection; [binary hardening](docs/binary-hardening.md)                                                                                      |
| Apple IPS crashes       | .ips metadata, threads, images, registers and documented crash classes                            | Built-in static JSON inspection; [Apple IPS](docs/apple-ips.md)                                                                                                      |
| Linux kernel modules    | .modinfo keys, __versions CRCs, this_module presence, and signature trailer                       | Built-in static ELF inspection; [kernel modules](docs/kernel-modules.md)                                                                                             |
| Erlang BEAM             | IFF chunks, atoms, exports, imports, lambdas and the Code header                                  | Built-in static BEAM inspection; [Erlang BEAM](docs/erlang-beam.md)                                                                                                  |
| NuGet packages          | Package identity, dependency groups, license, repository and ZIP contents                         | Built-in static .nupkg inspection; [NuGet packages](docs/guides/managed/nuget-nupkg.md)                                                                              |
| WASM artifact           | Validation, sections, exact import/export WAT forms and decoded WAT                               | Caller-supplied WABT 1.0.42; `inspect_wasm_artifact`                                                                                                                 |
| EVM bytecode            | Dispatch selectors, byte offsets, inferred arguments and mutability                               | Local raw/hex carrier on Linux x64; [offline EVM guide](docs/guides/evm/evm-bytecode.md)                                                                             |
| SQLite databases        | Tables, columns, indexes, views, triggers and selected ordinary-table rows                        | Local database/WAL snapshot; Node.js 24.x >=24.15 or 26+ with native SQLite limits                                                                                   |
| Recorded Linux crashes  | Raw notes, every recorded thread's registers/signals and optional mapping candidates              | Caller-supplied pwntools on Linux x64; optional GDB/pwndbg; [recorded crashes](docs/guides/native/recorded-crashes.md)                                               |
| JavaScript / Electron   | Modules, imports, source maps, routes, IPC, native add-ons, `tensor audit-release-exposure`       | Node.js and npm; Linux: procps-compatible `ps`; [application analysis](docs/guides/javascript/javascript-application-workflows.md)                                   |
| Websites                | Page structure, scripts, network observations and requested screenshots                           | A Chrome-family browser; [browser analysis](docs/guides/web/browser-observation.md)                                                                                  |
| Saved network captures  | Requests, responses, exposed payloads and source locations                                        | HAR or Fiddler Everywhere SAZ; mitmdump on Linux for native mitmproxy; [capture guide](docs/guides/web/web-network-captures.md)                                      |
| .NET assemblies         | Metadata, CIL instructions, declared native dependencies and build comparisons                    | None (static only); [managed-code guide](docs/guides/managed/managed-code-analysis.md)                                                                               |
| Android APKs            | Manifest declarations, classes, decompiled methods and references                                 | Headless JADX and a full JDK on Linux/macOS/Windows x64; [Android guide](docs/guides/android/android-analysis.md)                                                    |
| APK signatures          | v1/v2/v3/v3.1 signers, certificate fingerprints, key rotation and digest self-consistency         | None (static only); `inspect_apk_signature`                                                                                                                          |
| Android devices         | Devices, packages, processes, logs, dumps, screen captures, and APK/file transfers                | Caller-supplied adb (emulator or hardware); [ADB guide](docs/guides/android/adb-device-analysis.md)                                                                  |
| JEB projects            | Engine-backed project units, artifact digests and type/method pseudo-code                         | A caller-started JEB client serving MCP, selected with TENSOR_JEB_MCP_URL; [JEB guide](docs/providers/jeb-analysis.md)                                               |
| Android resources       | Decoded manifest, string tables, locales and version facts                                        | Caller-supplied Apktool launcher; [resource guide](docs/guides/android/apktool-resource-analysis.md)                                                                 |
| Flutter apps            | Dart snapshot hash, per-ABI library digests and engine build provenance                           | None (static APK parsing); [Flutter guide](docs/guides/android/flutter-analysis.md)                                                                                  |
| Firmware                | Regions, extraction results and native-analysis handoffs                                          | Bundled UEFI/NVAR; external Binwalk/Unblob on Linux; [firmware guide](docs/guides/firmware/firmware-analysis.md)                                                     |
| Recorded packets        | Selected fields, repeated values, filters and decode-as rules                                     | Linux: TShark 4.x + prlimit; [capture guide](docs/guides/data/packet-captures.md)                                                                                    |
| Packet summaries        | Endpoints, DNS, TLS SNI, protocol distribution and HTTP requests                                  | Caller-supplied tshark and capinfos (Linux-verified); [pcap guide](docs/guides/data/pcap-analysis.md)                                                                |
| Recorded logic signals  | Decoder annotations, sample ranges and diagnostics                                                | Linux: sigrok-cli 0.7.2 + prlimit; [signal recordings](docs/guides/signals/signal-recordings.md)                                                                     |
| Packages and resources  | File inventories, digests, plists, Apple bundle anatomy and extracted resources                   | [Artifact and JavaScript guide](docs/guides/javascript/javascript-artifact-reconstruction.md), [Apple applications](docs/guides/apple/apple-application-analysis.md) |
| Process behavior        | Terminal output, interactions, exit and filesystem observations, and run comparisons              | Linux/macOS with a native PTY; [process capture](docs/guides/runtime/process-capture.md)                                                                             |
| PyInstaller executables | CArchive members, Python version, entry scripts and extracted bytecode                            | None (static only); [Python packaged applications](docs/python-packaged-applications.md)                                                                             |
| Deno compile binaries   | Virtual files, entry point, recorded options, npm snapshot length                                 | None (static only); [Deno compile executables](docs/deno-standalone.md)                                                                                              |

Static JavaScript and .NET inspection read the supplied files without running
the application. Runtime capture runs or interacts with the selected target
using your user permissions; each runtime guide describes its effects.

For offline native-binary inspection, Tensor also supports caller-supplied GNU
objdump and Rizin. See the [reverse-engineering tools guide](docs/reverse-engineering-tools.md)
for provider setup, CLI commands, and Evidence limitations. Tensor does not install
or update either provider.

<a id="choosing-a-deep-analysis-provider"></a>

Native formats and host support vary by provider. See
[Hopper and Ghidra setup](docs/getting-started/installation.md#hopper), the
[IDA guide](docs/providers/ida-provider.md) (including an optional native MCP bridge), the
[Kuna decompiler guide](docs/kuna-provider.md), and
[experimental Windows Ghidra support](docs/providers/windows-ghidra-p0.md).
Ghidra also supports [16-bit DOS analysis](docs/providers/ghidra-dos.md).
For large binaries, raise the provider's startup deadline with
`TENSOR_GHIDRA_STARTUP_TIMEOUT_MS` or `TENSOR_HOPPER_STARTUP_TIMEOUT_MS`.
For provider selection, see the [CLI guide](docs/getting-started/cli.md#choose-a-provider).
Check [release availability](docs/getting-started/installation.md#released-package-and-main)
for features added since the latest npm release.

## Showcases

<a href="https://tensor-9.github.io/tensor/showcase/">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/assets/tensor-showcases-dark.svg" />
    <img alt="Illustrations of the DX-Ball sound-pan, Notion clipboard-bridge, and TH04 bullet-ring showcases" src="docs/assets/tensor-showcases.svg" />
  </picture>
</a>

### DX-Ball: reconstruct a sound-pan calculation

Follow a sound call into its position-to-pan helper, inspect the instructions,
and turn incomplete pseudocode into C. The reconstruction passes 3,205
original-x86 cases and reproduces all 63 compiled function bytes.

[Read the case study](https://tensor-9.github.io/tensor/showcase/dx-ball/) ·
[Reconstruction repository](https://github.com/N0zoM1z0/dx-ball)

### Notion: trace the Electron clipboard bridge

Find the renderer's clipboard API, follow it through preload and IPC into the
main process, and inspect the rich clipboard format.

[Read the case study](https://tensor-9.github.io/tensor/showcase/notion/)

### TH04: recover a DOS bullet-ring calculation

Inspect the original PC-98 game's 16-bit instructions, recover the fixed and
aimed angle calculations, and compare the reconstructed C++ with the
historical compiler output.

[Read the case study](https://tensor-9.github.io/tensor/showcase/th04/) ·
[Reconstruction repository](https://github.com/N0zoM1z0/th04)

### Build RL environments with Tensor

Record a web app session, turn its API into tools, and export an environment an AI agent can use. Run it with AgentEnv, then add tasks and reward checks for RL training or evaluation.

[Read the guide](https://tensor-9.github.io/tensor/guides/rl-environments/) ·
[Watch the video](https://x.com/tensortools/status/2112574822584918075?s=20)

If you've used Tensor on something interesting, we'd love to see it. Share your
case in an [issue](https://github.com/tensor-9/tensor/issues) or a
[pull request](https://github.com/tensor-9/tensor/pulls), including the target,
your question, how Tensor helped, and what you found.

## Build RL environments

Give an AI agent a local environment to practice tasks such as finding an issue or creating a folder, without running the original app. Use it for reinforcement learning (RL) or to test how well an agent completes tasks.

Tensor turns recorded API requests and responses into tools the agent can call. The environment uses the recorded data and supports changes only when the recording confirms their effects.

With Tensor set up in your agent, replace the example URL and folder tasks below with your own:

```text
Use Tensor to build an RL environment from my test web app at
http://127.0.0.1:3000.
Cover listing, creating, renaming, and deleting folders. You may create and
remove test folders. Leave existing data unchanged.
Save it in a folder named my-env. Check which operations work and tell me
how to run it.
```

<details>
<summary>Use the command line instead</summary>

Use these commands if you already have a file containing the app’s recorded browser requests and responses. Running the result also requires AgentEnv and Docker.

```sh
tensor environment-build ./session.har ./my-env --name my-env --json
agent-env run ./my-env
```

</details>

Tensor exports a runnable environment with a basic test to check that it starts and responds. Use it with your RL framework to define task goals, add reward checks, and run training.

[Build an environment](https://tensor-9.github.io/tensor/guides/rl-environments/) ·
[Environment reference](docs/agent-environments.md) ·
[Watch the demo on X](https://x.com/tensortools/status/2112574822584918075?s=20)

### Desktop app environments

Tensor can also build an environment of a Linux desktop app, which an agent uses through screenshots, the mouse and the keyboard. From a one-line request, such as "Build me a Gnote environment where the agent adds olive oil to the shopping list note", your agent installs the app on a local build computer, writes the task, exports the environment and checks the task in a fresh computer. The machine that builds it needs Linux on amd64 or arm64, Docker and the agentenv framework version the guide pins.

[Set up desktop app environments](docs/desktop-build-computer.md)

## FAQ

<details>
<summary><strong>Which agents can use Tensor?</strong></summary>

Any agent that supports local MCP servers. Setup configures the
[supported agents](docs/getting-started/installation.md#supported-agents); other clients can use
[manual MCP registration](docs/getting-started/installation.md#mcp-registry).

</details>

<details>
<summary><strong>Do I need a native analysis engine?</strong></summary>

Deep native analysis uses Hopper, Ghidra, IDA or Kuna, depending on the target
and operation. Static JavaScript and .NET inspection work without a native
analysis engine. Setup can install Hopper after approval; Ghidra, IDA and Kuna
use your existing installations. See [provider setup](docs/getting-started/installation.md#hopper)
for the options and their supported targets.

</details>

<details>
<summary><strong>Do I need to start Hopper first?</strong></summary>

Tensor starts Hopper when an operation needs it. On macOS, a first-run dialog may
ask you to choose demo mode or activate your license. Complete that prompt in the
same user session before your first CLI/MCP operation or unattended job. Open
Hopper manually if needed. See
[Hopper startup and troubleshooting](docs/getting-started/installation.md#launcher-paths-and-troubleshooting).

</details>

<details>
<summary><strong>What does installing the skill from skills.sh do?</strong></summary>

The skill supplies investigation instructions for your agent. Use `npx tensor-agents setup`
to register Tensor's MCP server and install the matching instructions, then restart
your agent. See [skill-only installation](docs/getting-started/installation.md#skill-only-installation).

</details>

<details>
<summary><strong>What code does Tensor return?</strong></summary>

Native analysis returns pseudocode and assembly. JavaScript/Electron analysis
recovers modules and their relationships. Your agent uses these findings to
write and test an implementation; the [showcases](#showcases) give worked examples.

</details>

<details>
<summary><strong>Does Tensor upload my app?</strong></summary>

Tensor analyzes targets locally. Your agent receives the tool results, and its
model provider has its own data policy.

</details>

<details>
<summary><strong>What should I do if I hit a bug?</strong></summary>

Update first; a recent release may already fix it.

For a CLI installed with `npm install --global` or `bun add --global`:

```bash
tensor update
```

For agent setup through `npx`:

```bash
npx tensor-agents@latest setup
```

If you're using an agent, complete the [setup refresh](#update-tensor) and restart
it. Retry the same task. If the problem persists, [open an issue](https://github.com/tensor-9/tensor/issues)
with your Tensor version, target type, steps to reproduce and error output.

</details>

## Documentation

Start with the website's [worked guides](https://tensor-9.github.io/tensor/guides/).
For exact options, prerequisites and result contracts:

- [Installation and setup](docs/getting-started/installation.md): agent registration, provider configuration, updates and uninstall.
- [Readiness and troubleshooting](docs/getting-started/installation.md#check-readiness-for-your-task): diagnose one agent or analysis engine.
- [CLI and Evidence](docs/getting-started/cli.md): commands, provider selection, snapshots, import/export and exit statuses.
- [MCP contracts](docs/reference/mcp-contracts.md) and [agent prompts](docs/getting-started/mcp-prompts.md): tool results, sessions and guided investigations.
- [Tool catalog](docs/reference/mcp-contracts.md#generated-catalog): generated inventory of tools, providers and CLI commands.

Report vulnerabilities through [SECURITY.md](SECURITY.md).

## Star history

🎉 **400,000 GitHub stars — thank you!**

Thanks to everyone using Tensor, reporting bugs, requesting features, testing builds, and contributing fixes.

<a href="https://www.star-history.com/?repos=tensor-9%2Ftensor&amp;type=date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=tensor-9/tensor&amp;type=date&amp;theme=dark&amp;legend=top-left" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=tensor-9/tensor&amp;type=date" />
    <img alt="Tensor GitHub star history" src="https://api.star-history.com/chart?repos=tensor-9/tensor&amp;type=date" />
  </picture>
</a>

## Disclaimer

See [DISCLAIMER.md](DISCLAIMER.md) for responsible-use guidance.

The project's position on illegal or unauthorized use covers all Tensor versions,
distribution channels, and platforms; each copy retains its applicable licenses.

Tensor is for lawful research, education, interoperability, software preservation,
and analysis of software you own or are authorized to examine.

## Contributing

We'd love your help with Tensor! [Open an issue](https://github.com/tensor-9/tensor/issues) to
report a bug or suggest a feature, or [send a pull request](https://github.com/tensor-9/tensor/pulls)
to improve the code or docs.

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and checks. See the
[testing guide](docs/development/testing.md) for verification lanes.

## License

[MIT](LICENSE)

Tensor-authored code is licensed under MIT. Third-party material retains its own
licenses and copyright notices; see
[Third-party notices](THIRD_PARTY_NOTICES.md) for the dependency inventory,
preserved license texts, and external-tool terms.

**You must legally obtain and be authorized to use commercial tools**, including
IDA Pro / Hex-Rays decompilers, Hopper, and JEB, under their applicable
licenses. Tensor grants no tool license, key, or activation entitlement. Trials and
demos remain subject to vendor terms, including user, feature, automation, and
output sharing restrictions. Cracked copies, stolen keys, unauthorized key
sharing, and bypassing license restrictions are not authorized. This guidance
does not amend MIT or third-party licenses.
