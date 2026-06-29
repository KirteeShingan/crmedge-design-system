# Figma ↔ Code Sync

Figma is the source of truth for tokens, visual specs, and master components. Code is the source of truth for behavior and prop APIs. This file documents how to move changes between the two — and what is currently blocked.

## File reference

- **Figma file key:** `DmL4gv3m10KzL2Y6yLMDJ5`
- **URL:** `https://www.figma.com/design/DmL4gv3m10KzL2Y6yLMDJ5/`
- **Code repo:** https://github.com/KirteeShingan/crmedge-design-system (private)
- **Local repo path:** `/Users/kirteeshingan/Documents/Figma /DS/crmedge-ds/`
- **Chromatic (published Storybook):** https://main--6a05bba954dfc6eb612aa60c.chromatic.com/

## Direction 1 — Figma → code (token sync)

**Active path: A (manual).** B and C are documented for context but not in use.

### Path A — manual edit (current)

1. In Figma, change the variable in the source collection (Colours / Size / Spacing / Radius / Grid / Semantic Colours).
2. Open `tokens/figma-export.json`. Locate the matching DTCG node. Update the `$value`.
3. Run `npm run tokens:build` to regenerate `src/styles/tokens.css`.
4. Verify in Storybook: the `Foundations/Token Palette/All` story renders every primitive + semantic. The `Foundations/Grid` story renders the live grid contract.
5. Commit both `figma-export.json` and `tokens.css` in the same commit. Open a PR.

This is the default — no plan dependencies, full review surface, works today.

### Path B — Tokens Studio plugin (not adopted)

Plugin that syncs token sets to a GitHub repo via PAT and opens PRs from inside the plugin. Requires migrating token source-of-truth from native Figma variables to Tokens Studio's data model. Not adopted; would be a non-trivial migration.

### Path C — `tokens:pull` + GitHub Action (blocked)

`scripts/export-figma-vars.ts` exists and is wired to fetch via the Figma REST Variables API. Blocked because the API requires an Enterprise or Organization plan. Once the plan upgrades, enabling this path is small: set `FIGMA_ACCESS_TOKEN` in the environment, run `npm run tokens` (which chains `tokens:pull && tokens:build`), wire it to `peter-evans/create-pull-request` in CI.

## Direction 2 — Code → Figma (visual / component sync)

**There is no automated path.** A Figma layout change cannot be machine-translated into the equivalent CSS edit (the mapping ambiguity — which class, which token, which file — is the killer step). Two manual paths exist:

### AI-assisted (recommended)

User points at the Figma node (node ID or page name). The AI assistant:

1. Reads the updated Figma node via the Figma MCP (`get_design_context`, `get_metadata`).
2. Diffs against the current component CSS / TSX.
3. Writes the code change, runs typecheck, commits, pushes, opens a PR.

This is the route to use when a Figma layout / spacing / color change needs to land in code.

### Fully manual

Open Dev Mode in Figma → inspect new values → translate to CSS by hand → commit → PR via GitHub web UI.

## Code Connect (blocked)

`get_code_connect_suggestions` requires a Developer seat in an Organization or Enterprise plan. Until then:

- No `code-connect.config.json` at repo root
- No `*.figma.tsx` mapping files
- `npm run code-connect:publish` will fail

When the plan upgrades, the work is:

1. Create `code-connect.config.json` at repo root with the Figma file key + a glob pattern for `*.figma.tsx`.
2. For each component, author a `<Name>.figma.tsx` mapping its Figma variants → React props.
3. Run `npm run code-connect:publish` to push mappings to Figma.

## Storybook Connect (live)

Already configured per-component. Story permalinks (Chromatic URL pattern):

- `https://main--6a05bba954dfc6eb612aa60c.chromatic.com/?path=/story/components-<name>--<story-id>`

These are paste-into-Figma URLs for the Storybook Connect (Chromatic) plugin. They resolve against `main`, so they update automatically as the deployed Storybook changes.

## Figma masters of note

Component-to-master mapping that's been pinned down:

| Component | Figma master |
|---|---|
| Button | `46:223361` |
| IconButton | `50:251635` |
| SegmentedButton | `50:244950` |
| Avatar | `66:280918` |
| StatusBadge | `Chip` master `53:259540` |
| Table | `Table / Cell` + `Table / Row` on `🗄️ Table (Fixed)` |
| Foundations grid | `🔧 Foundations (Fixed)` section `2830:2`, table `2830:6` |

`TextField` has no Figma master yet — code is ahead of Figma. A reverse-feed is pending.

## Drift to be aware of

These are intentional or known divergences between Figma and code; don't "fix" them as part of unrelated work:

- **Button `link` variant fill** — Figma `#3655f2`, code transparent. Code is right.
- **Button `neutral` hover** — Figma identical to enabled, code darkens one step. Code is right.
- **IconButton sizes** — Figma `24 / 36 px` with swapped Small/Medium labels; code `32 / 40 / 48` to align with Button scale. Code is right; Figma needs the reverse-feed.
- **Button states** — Figma is missing Focus + Loading states that exist in code.
- **TextField** — no Figma source at all.
