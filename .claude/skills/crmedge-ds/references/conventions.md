# Conventions

The rules collaborators (human or AI) must follow when writing or modifying code in this repo. These are derived from the patterns the existing 15 components share — don't deviate without a separate PR that updates this file.

## Component file layout

Every component is a directory under `src/components/<Name>/`:

```
src/components/Button/
├── Button.tsx              # forwardRef, prop interface, JSDoc on non-obvious props
├── Button.module.css       # scoped styles, modifier classes use snake_case
├── Button.stories.tsx      # Storybook Meta + stories
├── index.ts                # re-exports the component + its types
├── SegmentedButton.tsx     # sub-components live in the same folder
├── SegmentedButton.module.css
└── SegmentedButton.stories.tsx
```

`index.ts` is the only file outside the component that other code imports from. Internal helpers (icons, sub-components not exported from the library) stay inside the folder.

## CSS Modules pattern

**Class naming uses snake_case keys** for prop-driven modifiers:

```css
/* Button.module.css */
.button { /* base */ }
.variant_primary { /* variant=primary */ }
.variant_secondary { /* variant=secondary */ }
.size_small { /* size=small */ }
.size_medium { /* size=medium */ }
.tone_primary { /* tone=primary */ }
.disabled { /* boolean state */ }
.loading { /* boolean state */ }
```

**Component reads the class via template-literal lookup:**

```tsx
import styles from "./Button.module.css";

className={cx(
  styles.button,
  styles[`variant_${variant}`],
  styles[`size_${size}`],
  disabled && styles.disabled,
)}
```

**`vite.config.ts` is configured to preserve snake_case** (`cssModules.localsConvention` is *not* `camelCaseOnly`) so `styles[\`variant_primary\`]` resolves. Don't flip that setting — every component would break.

Internal helper classes (`.icon`, `.label`, `.chevron`, `.spinner`) are component-private — never `:export`-ed and never read by other files.

## The `cx` helper

Every component declares its own `cx`:

```ts
const cx = (...classes: Array<string | false | undefined | null>) =>
  classes.filter(Boolean).join(" ");
```

This is duplicated on purpose. **Don't refactor it into a shared `src/utils/cx.ts`** without a separate PR — the duplication keeps each component zero-dependency at the leaves, which matters for tree-shaking when consumers cherry-pick imports.

## Library entry (`src/index.ts`)

Every public component, sub-component, and type is re-exported here. Pattern:

```ts
export { Button } from "./components/Button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./components/Button";

export { SegmentedButton } from "./components/Button";
export type { SegmentedButtonProps, SegmentedButtonVariant, SegmentedButtonSize, SegmentedButtonSegment } from "./components/Button";
```

If a new component or sub-component isn't in `index.ts`, it doesn't ship to consumers — and the corresponding entry in `references/components.md` must be added in the same PR.

## TypeScript strictness

`tsconfig.json` enables:

- `strict: true` (the umbrella flag — includes `strictNullChecks`, `noImplicitAny`, `strictFunctionTypes`, etc.)
- `noUncheckedIndexedAccess: true` — index access (`arr[0]`, `obj[key]`) returns `T | undefined`, force a check
- `noImplicitOverride: true` — class methods overriding a base must use `override`
- `noFallthroughCasesInSwitch: true` — every `case` needs a `break`/`return`/`throw`

Don't relax these. If you hit a `noUncheckedIndexedAccess` complaint, the fix is a guard or a non-null assertion at a verified boundary, not a flag flip.

## Stories conventions

Every component has a `<Name>.stories.tsx` file with:

- A `Meta` typed as `Meta<typeof <Component>>` with `title: "Components/<Name>"` (or `"Components/<Parent>/<Child>"` for sub-components).
- A `Playground` story with `args` so the Controls panel works.
- Per-dimension stories (Variants, Sizes, States, etc.) that render the full matrix for Chromatic snapshot coverage. Avoid stories that depend on user interaction for their snapshot — Chromatic captures the initial render.
- For components with many size or variant axes, prefer separate stories per axis (e.g. `AllStatesMedium` + `AllStatesSmall` for Checkbox) — keeps each Chromatic snapshot focused.

## Accessibility rules

- **Icon-only controls require `aria-label`** as a required prop (`IconButton`, `Search` clear button). Make it required at the prop type level, not just documented.
- **Form inputs use `useId()`** to auto-generate label / helper / error IDs. Wire `aria-describedby` to the helper/error nodes when present. Set `aria-invalid` + `role="alert"` on the error message.
- **Loading buttons** disable interaction and replace icon content with a spinner; preserve `aria-label` so screen readers still announce purpose.

## What never goes into a component

- **Hardcoded colors, px values, font families.** Always a CSS var.
- **Inline styles** for layout. Use the CSS Module. Inline styles are OK only for one-off positioning that depends on a runtime value (e.g. a CSS custom property dynamically set).
- **`@floating-ui/react`** anywhere except `Tooltip` (which already depends on it). Other components that need positioning should compose `TooltipTrigger` (or be revisited as a separate PR).
- **`any`.** Strict mode would block most uses; the rest belong in a code review.
