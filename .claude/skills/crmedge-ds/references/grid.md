# Grid & Responsive Foundations

The grid contract lives in Figma (Foundations → Section / Breakpoints) and code (`src/styles/grid.css` + tokens). Both must agree. The spec table is the single source of truth — `tokens/figma-export.json` mirrors it, `tokens.css` exposes it as CSS variables, `grid.css` turns it into utility classes.

## Breakpoints

| Token | Min width | Columns | Gutter | Outer margin | Container max |
|---|---|---|---|---|---|
| `mobile` | ≥ 360 px | 4 | 16 px | 16 px | 100 % |
| `tablet` | ≥ 768 px | 8 | 16 px | 24 px | 100 % |
| `desktop` | ≥ 1024 px | 12 | 24 px | 32 px | 1280 px |
| `wide` | ≥ 1440 px | 12 | 24 px | auto | 1280 px |

Tablet currently shares mobile's grid in code (both 16 px gutter). Wide currently shares desktop's 12-column / 24 px grid; the difference is `auto` outer margin (centered with `--grid-container-max`).

## CSS variables

Primitives:

- `--breakpoint-mobile: 360px`, `--breakpoint-tablet: 768px`, `--breakpoint-desktop: 1024px`, `--breakpoint-wide: 1440px`
- `--grid-columns-mobile: 4`, `--grid-columns-tablet: 8`, `--grid-columns-desktop: 12`
- `--grid-gutter-mobile: var(--size-16)`, `--grid-gutter-tablet: var(--size-16)`, `--grid-gutter-desktop: var(--size-24)`
- `--grid-margin-mobile: var(--size-16)`, `--grid-margin-tablet: var(--size-24)`, `--grid-margin-desktop: var(--size-32)`
- `--grid-container-max: 1280px`

Runtime (resolved per `@media` block in `grid.css`):

- `--grid-cols` — active column count
- `--grid-gap` — active gutter
- `--grid-margin` — active outer margin

## Utility classes (`src/styles/grid.css`)

- `.container` — page wrapper. Centers, applies `--grid-margin` as left/right padding, caps at `--grid-container-max` from desktop up.
- `.row` — CSS Grid using `grid-template-columns: repeat(var(--grid-cols), minmax(0, 1fr))` and `gap: var(--grid-gap)`.
- `.col-span-1` … `.col-span-12` — span N columns of the active grid.
- `.md:col-span-N` — applies from `tablet` (≥ 768) up.
- `.lg:col-span-N` — applies from `desktop` (≥ 1024) up.

There is **no `.sm:` prefix** — mobile is the default, no opt-in needed.

Pattern:

```html
<div class="container">
  <div class="row">
    <div class="col-span-4 md:col-span-4 lg:col-span-3"> … </div>
    <div class="col-span-4 md:col-span-4 lg:col-span-9"> … </div>
  </div>
</div>
```

## Storybook viewport presets (`.storybook/preview.ts`)

Aligned to the breakpoint tokens:

| Preset | Width | Why |
|---|---|---|
| Mobile · 375 | 375 px | iPhone reference; sits in the mobile band (≥ 360, < 768) |
| Tablet · 768 | 768 px | Lower bound of the tablet band — easy to observe transitions |
| Desktop · 1024 | 1024 px | Lower bound of the desktop band |
| Wide · 1440 | 1440 px | Lower bound of the wide band |

Cycle viewports with the Storybook viewport toolbar. The `Foundations/Grid` story (`src/stories/Grid.stories.tsx`) renders a live readout of the resolved `--grid-cols` / `--grid-gap` / `--grid-margin` for each — use it as the smoke test when changing grid CSS.

## Rules

- **Don't hardcode breakpoint pixel values in component CSS.** Use `var(--breakpoint-tablet)` etc. in `@media` queries — or, better, structure layout so it doesn't need raw `@media`.
- **Don't define a new utility class outside `grid.css`.** If a component needs a grid behavior the utilities don't cover, that's a signal to extend `grid.css` (and update this file).
- **Components built before the grid existed are not auto-responsive.** Tooltip, SegmentedButton, GlobalHeader, SideNav, Table, the Playground page, etc. were designed against the 1440 Figma frame and use fixed widths or `height: 100%` hacks. A responsive refactor pass is a separate body of work — don't scope-creep it into an unrelated component change.

## Figma side

The Figma file has two reusable Layout Grid styles:

- `Grid / Mobile` — COLUMNS, STRETCH, 4 cols, 16 gutter, 16 offset
- `Grid / Desktop` — COLUMNS, CENTER, 12 cols, 84.667 section size, 24 gutter → centers a 1280 px container

Tablet does not have a dedicated layout style yet (uses mobile's grid). Wide uses the desktop style on a 1440-frame.

The Breakpoints spec table lives on `🔧 Foundations (Fixed)` (node `2830:6`, inside section `2830:2`). It is the canonical reference — when this skill and the table disagree, update the skill.
