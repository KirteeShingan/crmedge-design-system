# Components

15 components shipped from `src/components/`. Each lives in its own directory with the standard four-file layout (see `conventions.md`). Two directories ship a sub-component from the same path: `Button/` exports `SegmentedButton`, `Tooltip/` exports `TooltipTrigger`.

Every component is exported from `src/index.ts` along with its prop and enum types.

## Index

| Component | Sub-components | Storybook title |
|---|---|---|
| Avatar | — | `Components/Avatar` |
| AvatarGroup | — | `Components/AvatarGroup` |
| Button | SegmentedButton | `Components/Button`, `Components/Button/SegmentedButton` |
| Checkbox | — | `Components/Checkbox` |
| Divider | — | `Components/Divider` |
| GlobalHeader | — | `Components/GlobalHeader` |
| IconButton | — | `Components/IconButton` |
| Pagination | PageNumber | `Components/Pagination` |
| Search | — | `Components/Search` |
| SideNav | — | `Components/SideNav` |
| StatusBadge | — | `Components/StatusBadge` |
| Table | TableContainer, TableColGroup, TableCol, TableHead, TableBody, TableRow, TableHeaderCell, TableCell, TableSelectionCell, TwoLineCell, TableEmpty, TableSkeleton | `Components/Table` |
| TextField | — | `Components/TextField` |
| Tooltip | TooltipTrigger | `Components/Tooltip` |

---

## Avatar

**Props:** `size: "sm" | "md" | "lg"`, `src?: string`, `name?: string`, `loggedIn?: boolean` (default `true`), `selected?: boolean`, `alt?: string`.

**Stories:** Playground · AllStates · Sizes · Initials · Photo · LoggedOut · Selected · FallbackOnBrokenImage.

**Notes:** Falls back to initials when `src` is missing or breaks. Inline `PersonIcon` SVG component for the logged-out state. Mirrors Figma master node `66:280918`.

## AvatarGroup

Compound wrapper around multiple `Avatar` instances. See the stories file for the demonstrated composition.

## Button

**Props:** `variant: "primary" | "secondary" | "tertiary" | "link" | "neutral"`, `size: "small" | "medium"`, `iconLeft?: ReactNode`, `iconRight?: ReactNode`, `disabled?: boolean`, `type?: "button" | "submit" | "reset"`, extends `ButtonHTMLAttributes`.

**Stories:** Playground · Types · Sizes · States · WithIcons · Disabled.

**Notes:** Variant + size are className-driven via `styles[\`variant_${variant}\`]` and `styles[\`size_${size}\`]`. Icon slots are flex children. The `link` variant uses transparent fill in code, even though Figma displays `#3655f2` for it — intentional divergence documented inline in `Button.module.css`. The `neutral` variant darkens by one ramp step on hover; Figma shows hover identical to enabled — also documented inline.

## SegmentedButton (in `Button/`)

**Props:** `segments: SegmentedButtonSegment[]`, `value?: string`, `defaultValue?: string`, `onChange?: (value: string) => void`, `variant: "secondary" | "neutral"`, `size: "small" | "medium"`, `disabled?: boolean`, `ariaLabel?: string`, `className?: string`.

**Stories:** Playground · Variants · Sizes · Disabled.

**Notes:** Standalone prop-driven component (does **not** extend `HTMLAttributes`). Segments define keyboard navigation + selection. Small size uses 4px corner radius. Future work: icon-only variant (deferred until icon library is ready).

## Checkbox

**Props:** `label?: ReactNode`, `helper?: ReactNode`, `error?: ReactNode`, `size: "sm" | "md"`, `indeterminate?: boolean`, `disabled?: boolean`, `required?: boolean`, extends `InputHTMLAttributes` (minus `size`).

**Stories:** AllStatesMedium · AllStatesSmall · Sizes · Disabled · Helper · Error · IndeterminateState.

**Notes:** Uses `useId()` for label association. AllStates is split per-size for Chromatic snapshot clarity. Indeterminate state is controlled imperatively (sets `inputRef.current.indeterminate`).

## Divider

Minimal component, extends `HTMLAttributes<HTMLHRElement>`. Used as a visual separator; orientation handled via CSS class.

## GlobalHeader

**Props:** `tabLabel?`, `productName?`, `logoHref?`, `onLogoClick?`, `onTrackpadClick?`, `onNotificationsClick?`, `onSettingsClick?`, `onAvatarClick?`, `notificationDot?: boolean`, `currentUser?: AvatarProps`, `leftActions?: ReactNode`, `rightActions?: ReactNode`, `trackpadLabel?`, `notificationsLabel?`, `settingsLabel?`, `avatarLabel?`.

**Stories:** Playground · WithNotifications · WithLeftRightActions · Minimal.

**Notes:** Composes `Avatar` as a child. Inline `GridIcon` SVG. Event-driven — each interactive slot is a callback prop.

## IconButton

**Props:** `icon: ReactNode`, `aria-label: string` (**required**), `variant: "filled" | "outlined" | "text"`, `tone: "primary" | "secondary"`, `size: "sm" | "md" | "lg"`, `loading?: boolean`, `disabled?: boolean`, extends `ButtonHTMLAttributes`.

**Stories:** Playground · Variants · Sizes · States · Loading · Tones.

**Notes:** `aria-label` is a required prop — TS will block construction without it. Loading state hides the icon and renders an internal `Spinner` SVG. Sizes are 32 / 40 / 48 px (intentional divergence from Figma's 24 / 36 to unify with Button scale).

## Pagination + PageNumber

**Pagination props:** `currentPage: number`, `totalPages: number`, `onPageChange: (page: number) => void`, `variant?`, `size?`.

**PageNumber props:** `page: number`, `selected?: boolean`, `onClick?: (page: number) => void`, `aria-label?: string`.

**Stories:** Playground · AllPages · WithTruncation · PrevNextDisabled.

**Notes:** Compound API — `Pagination` orchestrates, `PageNumber` is the leaf. Truncation renders clickable ellipsis buttons (jump 5 pages). Selection state is consumer-owned.

## Search

**Props:** `size: "sm" | "md"`, `fullWidth?: boolean`, `onClear?: () => void`, `clearAriaLabel?: string`, extends `InputHTMLAttributes` (minus `size`, `type`).

**Stories:** Playground · Sizes · FullWidth · Placeholder · ClearButton.

**Notes:** Inline `SearchIcon` and `ClearIcon` SVGs. `onClear` shows a dedicated clear button — when omitted, native browser clear is used.

## SideNav

**Props:** `items: SideNavItem[]`, `selectedId?: string`, `defaultExpanded?: boolean`, `expanded?: boolean`, `onExpandedChange?: (expanded: boolean) => void`, `ariaLabel?: string`, extends `HTMLAttributes` (minus `onChange`).

**Sub-types:**
- `SideNavItem`: `{ id, label, icon, href?, onClick?, subItems? }`
- `SideNavSubItem`: `{ id, label, href?, onClick? }`

**Stories:** Playground · Expanded · Collapsed · WithSubItems · ActiveItem.

**Notes:** Composes `TooltipTrigger` when collapsed (shows item label as tooltip). Inline `Chevron` SVG. Expansion is controllable or self-managed via `defaultExpanded`.

## StatusBadge

**Props:** `color: "neutral" | "yellow" | "blue" | "green"` (required), `children: ReactNode` (required), `icon?: ReactNode`, extends `HTMLAttributes<HTMLSpanElement>` (minus `children`).

**Stories:** Playground · AllColors · WithIcon · Sizes.

**Notes:** Color maps to background (50 shade) + text (900 shade) from the same color ramp. Children render uppercase via CSS `text-transform`. Mirrors Figma `Chip` master at node `53:259540`.

## Table (compound)

13 exported components form the Table API:

| Component | Purpose |
|---|---|
| `TableContainer` | Outer scroll/overflow wrapper. Props: `maxHeight?`, `maxWidth?`, `stickyHeader?`. |
| `Table` | `<table>` element wrapper. Props: `density: "sm" | "md" | "lg"`, `stickyHeader?`. |
| `TableColGroup`, `TableCol` | `<colgroup>` / `<col>` for column widths. |
| `TableHead`, `TableBody` | Section wrappers. |
| `TableRow` | Row. Props: `selected?`, `disabled?`. |
| `TableHeaderCell` | `<th>`. |
| `TableCell` | `<td>`. Props: `type: "text" | "badge" | "date" | "buttons"`, `align: "start" | "center" | "end" | "numeric"`, `selected?`, `disabled?`. |
| `TableSelectionCell` | Wraps a Checkbox for row selection. |
| `TwoLineCell` | Helper that renders title + subtitle inside a cell. Props: `title`, `subtitle`, `subtitleVariant?`. |
| `TableEmpty` | Empty-state slot. |
| `TableSkeleton` | Loading-state slot. |

**Stories:** Playground · AllDensities · AllCellTypes · StickyHeader · Selection · Pagination · Empty · Skeleton.

**Notes:** Consumer owns selection + sort state. Mirrors Figma `Table / Cell` + `Table / Row` masters on the 🗄️ Table (Fixed) page (node `53:259540`).

## TextField

**Props:** `label?`, `helper?`, `error?`, `size: "sm" | "md" | "lg"`, `iconLeft?`, `iconRight?`, `fullWidth?`, `disabled?`, `readOnly?`, `required?`, extends `InputHTMLAttributes` (minus `size`).

**Stories:** Playground · Sizes · States · WithHelpers · WithErrors · WithIcons · FullWidth · Placeholder.

**Notes:** Uses `useId()` to generate IDs for label / helper / error with `-helper` and `-error` suffixes wired via `aria-describedby`. Error state sets `aria-invalid` and renders the error message with `role="alert"`. No Figma source yet — code is ahead of Figma here (reverse-feed pending).

## Tooltip + TooltipTrigger

**Tooltip props:** `variant: "rich" | "plain"`, `placement: "top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "right" | "right-start" | "right-end" | "none"`, `body: ReactNode` (required), `heading?`, `primaryAction?: TooltipAction`, `secondaryAction?: TooltipAction`, `showClose?: boolean`, `onClose?: () => void`, `closeAriaLabel?: string`.

**TooltipTrigger props:** `trigger: ReactNode`, `tooltip: TooltipProps`, `event: "hover" | "click" | "focus"`, `disabled?: boolean`.

**Stories:** Playground · AllPlacements · AllVariants · WithActions · WithClose · RichVariant · PlainVariant.

**Notes:** Positioning uses `@floating-ui/react`. Two-component pattern: `Tooltip` is the content, `TooltipTrigger` is the wrapper that owns event handling. `TooltipAction` interface is exported for action button shapes.

---

## Conventions all components follow

- The `cx(...args)` helper is reproduced inline in each component for conditional classname concatenation. Don't refactor it into a shared util without a separate PR — the duplication is intentional (zero-dependency leaves).
- Forward refs where the underlying element accepts one.
- All Storybook titles match the pattern in the index table above.
- Every component is re-exported from `src/index.ts` along with its prop types and any string-literal union types.
