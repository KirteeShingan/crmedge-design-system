# CRMEdge Design Rules

The invariants. Depth lives in [`.claude/skills/crmedge-ds/`](.claude/skills/crmedge-ds/SKILL.md) — load that skill for anything beyond this list.

## Hard rules

1. **No hardcoded design values.** Every color, spacing, radius, font comes from a CSS variable in [`src/styles/tokens.css`](src/styles/tokens.css). If the right variable doesn't exist, add it in Figma first (file key `DmL4gv3m10KzL2Y6yLMDJ5`), re-export to `tokens/figma-export.json`, run `npm run tokens:build`.
2. **One component per directory** under `src/components/<Name>/` with the four-file layout: `<Name>.tsx`, `<Name>.module.css`, `<Name>.stories.tsx`, `index.ts`. Sub-components ship from the same folder (e.g. `SegmentedButton` inside `Button/`).
3. **CSS Modules use snake_case** modifier classes read as `styles[\`<dim>_${value}\`]` — e.g. `styles[\`variant_${variant}\`]`. Vite preserves snake_case; don't flip `localsConvention`.
4. **TypeScript is strict.** `strict`, `noUncheckedIndexedAccess`, `noImplicitOverride`, `noFallthroughCasesInSwitch`. Satisfy them; don't relax them.
5. **Every public export goes through [`src/index.ts`](src/index.ts)** — component, sub-component, prop types, and enum types.
6. **Every component gets a Storybook story** under title `Components/<Name>` (or `Components/<Parent>/<Child>`). Include a `Playground` plus per-dimension stories.
7. **`aria-label` is required** on icon-only controls — as a required prop at the type level, not just documented.
8. **The `cx(...)` helper is duplicated per component** — intentional, don't refactor into a shared util without a separate PR.

## Token sync is manual

Figma → `tokens/figma-export.json` → `npm run tokens:build` → commit both JSON and generated `tokens.css` in the **same commit**. There is no CI rebuild step; stale `tokens.css` will not be caught.

## Maintenance contract

A PR that changes any convention above, adds/removes a component, changes a token namespace, or changes the grid must update the matching file under [`.claude/skills/crmedge-ds/`](.claude/skills/crmedge-ds/) **in the same PR**. Reviewers reject violations.
