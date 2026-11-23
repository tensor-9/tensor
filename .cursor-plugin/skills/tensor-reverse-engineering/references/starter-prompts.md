# Starter prompts and workflows

Use this reference when the reader asks what to try, wants a starting question
for a new target, or needs a workflow they can repeat. Copy-ready prompts live
on the [prompt library page](https://tensor-9.github.io/tensor/prompts/) and in
the installed CLI. Neither surface inspects a target or changes session state;
they only supply wording.

```bash
tensor prompts --level beginner
tensor prompts --action show --prompt analyze-application
tensor prompts --action search --query compare
```

With no `tensor` executable, run `npx -y tensor-agents@latest prompts` from a
trusted directory. Prefer a prompt's question over its wording when the reader
already described their target: keep their names, paths and constraints.

## Choose a route, not a tool

Pick the smallest prompt that answers the current question. The same library is
grouped by reader experience and by job:

- **Quick start** walks from a first look to a trace and then a findings
  ledger. Use it when the reader is new or the target is unfamiliar.
- **Command library** holds one question per job: software analysis,
  architecture, UI analysis, code analysis and reconstruction. Use it when the
  answer shape is already known.
- **Workflow library** composes commands in order. Use it for a session that
  must end with one result rather than a collection of observations.

## Keep every answer in the same evidence frame

1. Name the target and its identity before the first conclusion.
2. Cite returned Evidence for observations; label reasoning as inference with
   confidence and competing explanations.
3. Keep incomplete coverage, unsupported capabilities and contradictions as
   unknowns instead of rounding them into a clean story.
4. Stop when the question is answered. Follow up only for a concrete gap.

A prompt that asks for reconstruction or version comparison has a narrower
success condition than it sounds: passes cover only declared claims. Say what
the result does not establish.

## The four workflows

| Workflow                   | Steps                                                                                 | Result                                                             |
| -------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Understand software        | first look → inventory → module map → entry points                                    | One summary page with open questions                               |
| Analyze an application     | screen map → UI action trace → data sources → network calls                           | Behavior map from action to handler to data                        |
| Compare versions           | code comparison → UI comparison → signing and integrity → unknown audit               | Change report with confirmed, possible and incomparable kept apart |
| Reconstruct an application | reconstruct a module → rebuild source → rank gaps → verify claims → assemble a bundle | Staged result with verified and unverified parts separated         |

## Offer, do not impose

Mention the library once, with the prompt that fits the reader's question, and
continue with their actual target. Do not paste a whole workflow when one
question would answer it, and do not replace a precise request with a generic
starter prompt.
