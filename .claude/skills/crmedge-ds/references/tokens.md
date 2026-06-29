# Tokens

Tokens originate in Figma, are exported as DTCG JSON into `tokens/figma-export.json`, and are transformed by Style Dictionary into `src/styles/tokens.css` — a single `:root` block of CSS custom properties. Components reference the CSS variables; they never use the JSON directly and never hardcode hex values.

## Pipeline

```
Figma variables (file DmL4gv3m10KzL2Y6yLMDJ5)
        │  manual export — `npm run tokens:pull` is blocked (no Variables REST API on plan)
        ▼
tokens/figma-export.json   (DTCG: { "$value": ..., "$type": ... })
        │  `npm run tokens:build`
        ▼
src/styles/tokens.css      (single :root { --… } block, semantic aliases preserved as var() references)
        │  imported by .storybook/preview.ts and consumers
        ▼
component styles via var(--token-name)
```

`tokens/style-dictionary.config.ts` is the build config. `scripts/build-tokens.ts` reads the JSON, strips the `$meta` provenance object, and feeds Style Dictionary with `outputReferences: true` so semantic tokens emit `var(--primitive)` rather than resolved values.

## Top-level namespaces in `figma-export.json`

| Namespace | Shape | Purpose |
|---|---|---|
| `color.primary.orange` | `{50..900}` | Brand primary ramp (10 steps). `500` is the brand fill. |
| `color.primary.charcoal` | scalar | Standalone primitive, sibling of `orange`. Not part of any ramp. |
| `color.secondary.neutral` | `{50..900}` | Grey ramp (10 steps). |
| `color.accent.{green, yellow, red, blue}` | `{50..900}` each | Status / accent ramps (10 steps each). |
| `color.background` | `{white, light-grey, black, navy-blue}` | Background primitives. |
| `color.brand` | `{primary, navy}` | Semantic → alias to primary ramp / charcoal. |
| `color.text` | `{default, secondary, tertiary, disabled, inverse, link, link-hover}` | Semantic text colors. |
| `color.status` | `{success, warning, error}.{default, subtle, text}` | Semantic status colors. |
| `color.interaction` | `{hover}` | Interaction overlays. |
| `color.neutral` | `{default, hover, active, light, subtle, disabled}` | Neutral semantics (borders, dividers). |
| `size` | `{2, 4, 6, 8, 10, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56}` | Px primitives. |
| `spacing` | `{xxs, xs, s, m, l, xl, xxl, xxxl}` | Aliased to `size.*`. |
| `radius` | `{xxs, xs, s, m, l, xl, xxl, xxxl}` | Aliased to `size.*`. |
| `grid.modal.width` | `658px` | Legacy width token, preserved. |
| `grid.tooltip.width` | `352px` | Legacy width token, preserved. |
| `grid.columns` | `{mobile, tablet, desktop}` (numbers) | Column counts per breakpoint. |
| `grid.gutter` | `{mobile, tablet, desktop}` | Gutter sizes, aliased to `size.*`. |
| `grid.margin` | `{mobile, tablet, desktop}` | Outer margin, aliased to `size.*`. |
| `grid.container.max` | `1280px` | Container max-width for desktop / wide. |
| `breakpoint` | `{mobile, tablet, desktop, wide}` | `360 / 768 / 1024 / 1440 px`. |

## CSS variable prefixes (`tokens.css`)

| Prefix | Example | Source |
|---|---|---|
| `--color-primary-*` | `--color-primary-orange-500: #f05424` | primitive |
| `--color-secondary-*` | `--color-secondary-neutral-200` | primitive |
| `--color-accent-*` | `--color-accent-blue-500` | primitive |
| `--color-background-*` | `--color-background-white` | primitive |
| `--color-brand-*` | `--color-brand-primary: var(--color-primary-orange-500)` | semantic alias |
| `--color-text-*` | `--color-text-default` | semantic alias |
| `--color-status-*` | `--color-status-success-default` | semantic alias |
| `--color-interaction-*` | `--color-interaction-hover` | semantic alias |
| `--color-neutral-*` | `--color-neutral-default` | semantic alias |
| `--size-*` | `--size-16: 16px` | primitive |
| `--spacing-*` | `--spacing-m: var(--size-16)` | alias |
| `--radius-*` | `--radius-m: var(--size-16)` | alias |
| `--width-*` | (none — see "Renames in progress") | — |
| `--grid-*` | `--grid-modal-width`, `--grid-tooltip-width`, `--grid-columns-desktop`, `--grid-container-max`, `--grid-gutter-*`, `--grid-margin-*` | mixed |
| `--breakpoint-*` | `--breakpoint-tablet: 768px` | primitive |
| `--font-family-*` | `--font-family-base`, `--font-family-display`, `--font-family-mono` | primitive (font stack) |

## Rules for adding a token

1. **Define in Figma first.** If a token isn't in Figma, it isn't real. Add the variable to the relevant collection in file `DmL4gv3m10KzL2Y6yLMDJ5`.
2. **Re-export to `figma-export.json`.** Currently manual (`tokens:pull` is plan-blocked) — copy the new variable's DTCG entry into the JSON under the right namespace.
3. **Choose primitive vs semantic.** Raw values (hexes, px) are primitives. Anything that means *something* (`text-default`, `brand-primary`, `spacing-m`) is semantic and must alias a primitive via `{namespace.path}` reference syntax.
4. **Rebuild:** `npm run tokens:build`. Commit both `figma-export.json` and the regenerated `tokens.css` in the same commit — they must stay in sync.
5. **Reference by `var(--token-name)` only.** Never write the underlying hex/px in a component CSS Module.

## Aliasing convention

Style Dictionary is configured with `outputReferences: true`, so a token defined as:

```json
"brand": {
  "primary": { "$value": "{color.primary.orange.500}", "$type": "color" }
}
```

emits:

```css
--color-brand-primary: var(--color-primary-orange-500);
```

This preserves the alias at render time — changing the primitive value cascades through every semantic that points at it. Don't fight this; it's how theming will eventually work.

## Renames in progress

The `--grid-modal-width` / `--grid-tooltip-width` tokens are slated to be renamed to `--width-modal` / `--width-tooltip` (move out of the `grid.*` namespace into a top-level `width.*`). The rename was prepared but held back from the grid-foundations PR; it'll ship in its own PR so the diff is reviewable in isolation.

## Hard rules

- **Never hardcode a color, spacing, or radius in a component.** Use the variable.
- **Never break the alias chain.** A semantic that points at a primitive must keep its `{ref}` form in the JSON — Style Dictionary's `outputReferences` depends on it.
- **Commit `tokens.css` with `figma-export.json`.** No "I'll regenerate it in another PR" — there is no CI rebuild step.
