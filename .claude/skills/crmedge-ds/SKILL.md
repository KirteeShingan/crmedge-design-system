---
name: crmedge-ds
description: Conventions, tokens, components, and Figma↔code workflow for the CRMEdge design system (React 18 + TypeScript + Vite + Storybook + Style Dictionary). Load whenever the user mentions CRMEdge, crmedge-ds, this design system, or works in the repo at /Users/kirteeshingan/Documents/Figma /DS/crmedge-ds/ — or references the Figma file key DmL4gv3m10KzL2Y6yLMDJ5.
---

# CRMEdge Design System

This skill is the contract collaborators and AI assistants follow when working in the `crmedge-ds` repo or the matching Figma file. It is a **snapshot of the current state** — if something here disagrees with the code, the code wins and this skill needs an update in the same PR.

## What CRMEdge is

A B2B design system spanning two surfaces:

- **Figma file** `DmL4gv3m10KzL2Y6yLMDJ5` — source of truth for tokens, components, visual specs. On a Figma plan without Developer seats, so Code Connect publish is blocked.
- **Code repo** `crmedge-ds/` — React 18 + TypeScript (strict) + Vite 5 + Storybook 8 + Style Dictionary 4. Published privately at https://github.com/KirteeShingan/crmedge-design-system. Visual regression via Chromatic at https://main--6a05bba954dfc6eb612aa60c.chromatic.com/.

Token flow is **Figma → `tokens/figma-export.json` → Style Dictionary → `src/styles/tokens.css`**. Code consumes the generated CSS variables, never raw hex values.

## When to consult which reference

| If the task touches… | Read |
|---|---|
| A specific component (props, variants, file layout) | `references/components.md` |
| Tokens — adding, renaming, semantic vs primitive, ramps | `references/tokens.md` |
| File layout, CSS-module pattern, `cx`, `index.ts`, TS strictness | `references/conventions.md` |
| Responsive layout, breakpoints, columns, gutters | `references/grid.md` |
| Pulling Figma changes into code, or pushing code back to Figma | `references/figma-sync.md` |
| Storybook config, Chromatic, GitHub Pages deploy, scripts | `references/build-and-publish.md` |

Read only what the task needs — these are reference docs, not required reading.

## Hard rules (apply to every change)

1. **Never hardcode design values.** Use a CSS variable from `tokens.css`. If the right variable doesn't exist, the token should be added in Figma first, then re-exported — see `references/figma-sync.md`.
2. **One component per directory** under `src/components/<Name>/` with the four-file layout: `Name.tsx`, `Name.module.css`, `Name.stories.tsx`, `index.ts`. Sub-components that ship from the same import path live in the same folder (e.g. `SegmentedButton.tsx` inside `Button/`, `TooltipTrigger.tsx` inside `Tooltip/`).
3. **CSS Module class-name pattern is `styles[\`<dimension>_${value}\`]`** — e.g. `styles[\`variant_${variant}\`]`, `styles[\`size_${size}\`]`. Vite is configured with camelCase = false so snake_case keys survive — keep it that way.
4. **TypeScript is strict.** `strict`, `noUncheckedIndexedAccess`, `noImplicitOverride`, `noFallthroughCasesInSwitch` are all on. Don't disable; satisfy them.
5. **Every new component or sub-component must be exported from `src/index.ts`** along with its prop types and enum types (e.g. `ButtonVariant`, `ButtonSize`).
6. **Every component gets a Storybook story** under title `Components/<Name>` (or `Components/<Parent>/<Child>` for sub-components). Include a `Playground` story plus per-dimension stories (variants, sizes, states).
7. **`aria-label` is required on icon-only controls** (e.g. `IconButton`, `Search` clear button). Make it a required prop.
8. **Do not commit secrets in env files** — the Chromatic project token is the only inline token, and it is write-only by Chromatic's design (safe to commit per their docs).
9. **Update this skill in the same PR that changes any DS convention** — see "Maintenance contract" below.

## Maintenance contract

When a PR changes any of the following, the same PR must update the relevant skill file:

- Adds, removes, or renames a component or sub-component → `references/components.md` + `src/index.ts`-related notes in `references/conventions.md`
- Adds, removes, or renames a token namespace → `references/tokens.md`
- Changes the file layout, CSS-module pattern, or library entry conventions → `references/conventions.md`
- Changes breakpoints, grid utilities, or viewport presets → `references/grid.md`
- Changes the token sync pipeline or unblocks Code Connect → `references/figma-sync.md`
- Changes scripts, CI workflows, or deploy target → `references/build-and-publish.md`

A reviewer rejecting a PR that violates this is enforcing the contract, not nitpicking.

## Known constraints (as of skill authoring)

- **Code Connect blocked** — requires a Figma Developer seat on Organization or Enterprise plan. No `code-connect.config.json` or `*.figma.tsx` files exist.
- **Figma Variables REST API blocked** on current plan — `npm run tokens:pull` can't fetch directly; token sync is manual (Path A in `references/figma-sync.md`).
- **Gilroy font files absent** — `fonts.css` references `/fonts/Gilroy/*.woff2` which 404; Roboto is the live display fallback.
- **No CI for tokens build** — `tokens.css` is committed; rebuild locally and include in your PR when the export changes.

## Where state lives outside this skill

- **Project memory** at `~/.claude/projects/-Users-kirteeshingan-Documents-Figma--DS/memory/project_crmedge.md` — Figma file key, repo URL, Chromatic URL, current phase status. Memory may be stale; the skill is fresher.
- **Session logs** at `/Users/kirteeshingan/Documents/Figma /DS/session-logs/` — chronological narrative of past sessions. Use for context on *why* a thing was done, not *what* the current state is.
