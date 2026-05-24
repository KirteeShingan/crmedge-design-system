import { forwardRef } from "react";
import type {
  ColHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";
import { Checkbox } from "../Checkbox/Checkbox";
import styles from "./Table.module.css";

/* Compound primitives for tabular data.
 *
 * - `TableContainer`   → <div>       scroll context + optional maxHeight/maxWidth
 * - `Table`            → <table>     density + stickyHeader live here
 * - `TableColGroup`    → <colgroup>
 * - `TableCol`         → <col>       width prop (number or string)
 * - `TableHead`        → <thead>
 * - `TableBody`        → <tbody>
 * - `TableRow`         → <tr>        (header? selected? disabled?)
 * - `TableHeaderCell`  → <th scope="col">
 * - `TableCell`        → <td>        (type, align)
 *
 * Selection and sort state are owned by the consumer. The DS only renders
 * the visual states (`selected`, `disabled`) and exposes alignment +
 * content-type styling. Cells accept arbitrary `children`; the `type` prop
 * is a semantic intent signal, not a content restriction.
 *
 * Mirrors Figma `Table / Cell` (Type variants Text | Badge | Date | Buttons),
 * `Table / HeaderCell`, and `Table / Row` (Type × State) on the
 * 🗄️ Table (Fixed) page of file DmL4gv3m10KzL2Y6yLMDJ5.
 */

export type TableCellType = "text" | "badge" | "date" | "buttons";
export type TableCellAlign = "start" | "center" | "end" | "numeric";
export type TableDensity = "sm" | "md" | "lg";

const cx = (...classes: Array<string | false | undefined>): string =>
  classes.filter(Boolean).join(" ");

const toCssLength = (v: number | string | undefined): string | undefined => {
  if (v === undefined) return undefined;
  return typeof v === "number" ? `${v}px` : v;
};

/* ---------- TableContainer ---------- */

export interface TableContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * When set, the container clamps to this height and scrolls vertically
   * within. Required if you want a meaningful `stickyHeader` on the
   * nested `<Table>` — sticky needs a scrolling ancestor.
   */
  maxHeight?: number | string;
  /**
   * When set, the container clamps to this width and scrolls horizontally
   * within. Useful when the table's columns exceed the container width.
   */
  maxWidth?: number | string;
  /**
   * Convenience: also apply the sticky-header rule from this container
   * (in addition to Table's own `stickyHeader` prop). Useful when the
   * Table doesn't own the prop but the container should still pin headers.
   */
  stickyHeader?: boolean;
}

export const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(
  function TableContainer(props, ref) {
    const {
      maxHeight,
      maxWidth,
      stickyHeader,
      className,
      style,
      children,
      ...rest
    } = props;

    const mergedStyle = {
      ...(maxHeight !== undefined ? { maxHeight: toCssLength(maxHeight) } : {}),
      ...(maxWidth !== undefined ? { maxWidth: toCssLength(maxWidth) } : {}),
      ...style,
    };

    return (
      <div
        {...rest}
        ref={ref}
        style={mergedStyle}
        className={cx(
          styles.container,
          maxHeight !== undefined && styles.container_scrollY,
          maxWidth !== undefined && styles.container_scrollX,
          stickyHeader && styles.container_stickyHeader,
          className,
        )}
      >
        {children}
      </div>
    );
  },
);

/* ---------- Table ---------- */

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  /**
   * Row density. Drives cell + header-cell paddings via CSS custom
   * properties on the Table root. `buttons` cells stay 2px tighter than
   * regular cells at every density. Default `md`.
   */
  density?: TableDensity;
  /**
   * Pin descendant `<th>` elements to the top of their scrolling ancestor
   * via `position: sticky`. Pair with `<TableContainer maxHeight>` for an
   * in-container scroll, or use standalone for viewport-pinned headers.
   */
  stickyHeader?: boolean;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  props,
  ref,
) {
  const {
    density = "md",
    stickyHeader,
    className,
    children,
    ...rest
  } = props;
  return (
    <table
      {...rest}
      ref={ref}
      className={cx(
        styles.table,
        styles[`density_${density}`],
        stickyHeader && styles.table_stickyHeader,
        className,
      )}
    >
      {children}
    </table>
  );
});

/* ---------- TableColGroup ---------- */

export type TableColGroupProps = HTMLAttributes<HTMLTableColElement>;

export const TableColGroup = forwardRef<
  HTMLTableColElement,
  TableColGroupProps
>(function TableColGroup(props, ref) {
  const { className, children, ...rest } = props;
  return (
    <colgroup {...rest} ref={ref} className={className}>
      {children}
    </colgroup>
  );
});

/* ---------- TableCol ---------- */

export interface TableColProps
  extends Omit<ColHTMLAttributes<HTMLTableColElement>, "width"> {
  /**
   * Column width. Accepts a number (treated as px) or any CSS length
   * string (`"20%"`, `"12rem"`, `"max-content"`). Applied via inline
   * style so it works regardless of the table's `table-layout` mode.
   */
  width?: number | string;
}

export const TableCol = forwardRef<HTMLTableColElement, TableColProps>(
  function TableCol(props, ref) {
    const { width, style, ...rest } = props;
    const mergedStyle = {
      ...(width !== undefined ? { width: toCssLength(width) } : {}),
      ...style,
    };
    return <col {...rest} ref={ref} style={mergedStyle} />;
  },
);

/* ---------- TableHead ---------- */

export type TableHeadProps = HTMLAttributes<HTMLTableSectionElement>;

export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  function TableHead(props, ref) {
    const { className, children, ...rest } = props;
    return (
      <thead {...rest} ref={ref} className={cx(styles.head, className)}>
        {children}
      </thead>
    );
  },
);

/* ---------- TableBody ---------- */

export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>;

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  function TableBody(props, ref) {
    const { className, children, ...rest } = props;
    return (
      <tbody {...rest} ref={ref} className={cx(styles.body, className)}>
        {children}
      </tbody>
    );
  },
);

/* ---------- TableRow ---------- */

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /**
   * Mark this row as the table's header row. Default false. Header rows
   * skip the body hover affordance and use header styling instead. Use
   * inside `<TableHead>`.
   */
  header?: boolean;
  /**
   * Row selected state. Drives a brand-tinted background and writes
   * `aria-selected="true"`. Selection logic is consumer-owned.
   */
  selected?: boolean;
  /**
   * Row disabled state. Reduces opacity and disables hover + pointer
   * events. Writes `aria-disabled="true"`.
   */
  disabled?: boolean;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  function TableRow(props, ref) {
    const {
      header,
      selected,
      disabled,
      className,
      children,
      ...rest
    } = props;
    return (
      <tr
        {...rest}
        ref={ref}
        aria-selected={selected ? true : undefined}
        aria-disabled={disabled ? true : undefined}
        className={cx(
          header ? styles.headRow : styles.row,
          !header && selected && styles.row_selected,
          !header && disabled && styles.row_disabled,
          className,
        )}
      >
        {children}
      </tr>
    );
  },
);

/* ---------- TableHeaderCell ---------- */

export type TableSortDirection = "none" | "ascending" | "descending";

export interface TableHeaderCellProps
  extends Omit<ThHTMLAttributes<HTMLTableCellElement>, "align" | "onClick"> {
  /**
   * Horizontal alignment. Defaults to `start`. `numeric` is sugar for
   * `end` with `font-variant-numeric: tabular-nums`. (Shadows the
   * deprecated HTML `align` attribute.)
   */
  align?: TableCellAlign;
  /**
   * Whether this column supports sorting. When true, the cell wraps its
   * children in a `<button>` and renders a sort-direction indicator.
   * Mirrors the Figma `Sort` axis on `Table / HeaderCell` (component set
   * `2720:136`).
   */
  sortable?: boolean;
  /**
   * Current sort state of this column. Drives the indicator icon and the
   * `aria-sort` attribute on the `<th>`. Ignored when `sortable` is false.
   * Defaults to `"none"`.
   */
  sortDirection?: TableSortDirection;
  /**
   * Click handler fired when the user activates the sort button (click,
   * Enter, or Space). Consumers cycle through `none → asc → desc → none`
   * (or whatever progression suits their data) and pass back a new
   * `sortDirection` on the next render.
   */
  onSort?: () => void;
}

const SortIndicatorIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M 8 2 L 12 7 L 4 7 Z M 4 9 L 12 9 L 8 14 Z" />
  </svg>
);

const SortAscendingIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M 8 4 L 13 12 L 3 12 Z" />
  </svg>
);

const SortDescendingIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M 3 4 L 13 4 L 8 12 Z" />
  </svg>
);

export const TableHeaderCell = forwardRef<
  HTMLTableCellElement,
  TableHeaderCellProps
>(function TableHeaderCell(props, ref) {
  const {
    align = "start",
    sortable,
    sortDirection = "none",
    onSort,
    className,
    children,
    scope,
    ...rest
  } = props;

  const ariaSort = sortable ? sortDirection : undefined;

  return (
    <th
      {...rest}
      ref={ref}
      scope={scope ?? "col"}
      aria-sort={ariaSort}
      className={cx(
        styles.headerCell,
        styles[`align_${align}`],
        sortable && styles.headerCell_sortable,
        className,
      )}
    >
      {sortable ? (
        <button
          type="button"
          onClick={onSort}
          className={styles.sortButton}
        >
          <span className={styles.sortLabel}>{children}</span>
          <span
            className={cx(
              styles.sortIcon,
              sortDirection === "none" && styles.sortIcon_inactive,
            )}
          >
            {sortDirection === "ascending" ? (
              <SortAscendingIcon />
            ) : sortDirection === "descending" ? (
              <SortDescendingIcon />
            ) : (
              <SortIndicatorIcon />
            )}
          </span>
        </button>
      ) : (
        children
      )}
    </th>
  );
});

/* ---------- TableCell ---------- */

export interface TableCellProps
  extends Omit<TdHTMLAttributes<HTMLTableCellElement>, "align"> {
  /**
   * Content-type variant. Mirrors the Figma `Type` prop on `Table / Cell`.
   * Drives default styling (vertical padding) and serves as a semantic
   * intent signal. Does NOT restrict children — consumers compose
   * whatever they want inside.
   *
   * - `text`    — plain string or two-line title (default)
   * - `badge`   — wraps a `<StatusBadge>`
   * - `date`    — formatted date string
   * - `buttons` — `<Button>` / `<IconButton>` cluster (paddingY tighter
   *               than other types at every density)
   */
  type?: TableCellType;
  /**
   * Horizontal alignment. Defaults to `start` for ALL types. `numeric`
   * is sugar for `end` with `font-variant-numeric: tabular-nums`.
   */
  align?: TableCellAlign;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  function TableCell(props, ref) {
    const { type = "text", align = "start", className, children, ...rest } =
      props;
    return (
      <td
        {...rest}
        ref={ref}
        className={cx(
          styles.cell,
          styles[`cell_${type}`],
          styles[`align_${align}`],
          className,
        )}
      >
        {children}
      </td>
    );
  },
);

/* ---------- TableSelectionCell ----------
 * Mirrors the Figma `Table / SelectionCell` set 2728:142 (State variants
 * Unchecked | Checked | Indeterminate). Renders a centered Checkbox.
 * `header` toggles between <th scope="col"> (select-all) and <td>
 * (per-row). Selection state is consumer-owned. */

export interface TableSelectionCellProps {
  /**
   * Render as a `<th scope="col">` instead of `<td>`. Use inside
   * `<TableHead>` for the select-all column.
   */
  header?: boolean;
  /**
   * Whether the checkbox is checked. Ignored when `indeterminate` is true.
   */
  checked?: boolean;
  /**
   * Indeterminate (mixed) state — typically used on the header cell when
   * some-but-not-all body rows are selected.
   */
  indeterminate?: boolean;
  /**
   * Disabled state on the checkbox.
   */
  disabled?: boolean;
  /**
   * Fired when the user toggles the checkbox. The new checked value is
   * passed; consumers update their own selection model.
   */
  onChange?: (checked: boolean) => void;
  /**
   * Accessible label for the checkbox. Defaults to "Select all" for header
   * cells and "Select row" otherwise. Pass a row-identifying label when
   * possible (e.g. "Select John Doe").
   */
  "aria-label"?: string;
  className?: string;
}

export const TableSelectionCell = forwardRef<
  HTMLTableCellElement,
  TableSelectionCellProps
>(function TableSelectionCell(props, ref) {
  const {
    header,
    checked,
    indeterminate,
    disabled,
    onChange,
    "aria-label": ariaLabel,
    className,
  } = props;

  const label = ariaLabel ?? (header ? "Select all" : "Select row");

  const checkbox = (
    <span className={styles.selectionCellInner}>
      <Checkbox
        checked={checked}
        indeterminate={indeterminate}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        aria-label={label}
      />
    </span>
  );

  const cellClassName = cx(
    styles.selectionCell,
    header && styles.selectionCell_header,
    className,
  );

  if (header) {
    return (
      <th
        ref={ref}
        scope="col"
        className={cellClassName}
      >
        {checkbox}
      </th>
    );
  }
  return (
    <td ref={ref} className={cellClassName}>
      {checkbox}
    </td>
  );
});

/* ---------- TwoLineCell ----------
 * Mirrors the Figma `Table / TwoLineCell` set 2728:143 (Subtitle axis
 * Default | Link). Inner-content helper — render inside a regular
 * `<TableCell>`. Title is bold + text-default; subtitle defaults to a
 * smaller text-secondary line. `subtitleVariant="link"` paints the
 * subtitle with --color-text-link for URL-style content (consumers wrap
 * in `<a>` if they want it clickable). */

export type TwoLineSubtitleVariant = "default" | "link";

export interface TwoLineCellProps {
  /** Primary line — bold, text-default. */
  title: ReactNode;
  /** Optional secondary line below the title. */
  subtitle?: ReactNode;
  /**
   * Styling for the subtitle. `default` = small text-secondary;
   * `link` = small text-link (typically used for URLs).
   */
  subtitleVariant?: TwoLineSubtitleVariant;
  className?: string;
}

export const TwoLineCell = forwardRef<HTMLDivElement, TwoLineCellProps>(
  function TwoLineCell(props, ref) {
    const { title, subtitle, subtitleVariant = "default", className } = props;
    return (
      <div ref={ref} className={cx(styles.twoLine, className)}>
        <span className={styles.twoLine_title}>{title}</span>
        {subtitle !== undefined && subtitle !== null && subtitle !== "" ? (
          <span
            className={cx(
              styles.twoLine_subtitle,
              subtitleVariant === "link" && styles.twoLine_subtitleLink,
            )}
          >
            {subtitle}
          </span>
        ) : null}
      </div>
    );
  },
);

/* ---------- TableEmpty ----------
 * Empty-state row spanning all columns. Mirrors Figma `Table / Empty`
 * (`2730:142`): illustration + title + description + optional action(s).
 * Render inside `<TableBody>` when there are no data rows. */

export interface TableEmptyProps {
  /**
   * Illustration / icon shown above the text. Accepts arbitrary
   * ReactNode — typically an inline SVG (sized ~80–120px) or `<img>`.
   */
  illustration?: ReactNode;
  /** Primary heading, e.g. "No content yet". */
  title: string;
  /** Optional supporting copy below the title. */
  description?: ReactNode;
  /**
   * Optional action slot — typically one or more `<Button>`s. Pass a
   * fragment for multiple actions (the Figma master uses Neutral primary
   * + Tertiary secondary).
   */
  action?: ReactNode;
  /**
   * Column-span for the inner `<td>`. Defaults to a large number that
   * absorbs every column. Set explicitly if your table has a known column
   * count and you want strict spanning behaviour.
   */
  colSpan?: number;
  className?: string;
}

export const TableEmpty = forwardRef<HTMLTableRowElement, TableEmptyProps>(
  function TableEmpty(props, ref) {
    const {
      illustration,
      title,
      description,
      action,
      colSpan = 100,
      className,
    } = props;
    return (
      <tr ref={ref} className={cx(styles.emptyRow, className)}>
        <td colSpan={colSpan} className={styles.emptyCell}>
          <div className={styles.empty}>
            {illustration ? (
              <div className={styles.empty_illustration}>{illustration}</div>
            ) : null}
            <h3 className={styles.empty_title}>{title}</h3>
            {description !== undefined && description !== null && description !== "" ? (
              <p className={styles.empty_description}>{description}</p>
            ) : null}
            {action ? (
              <div className={styles.empty_action}>{action}</div>
            ) : null}
          </div>
        </td>
      </tr>
    );
  },
);

/* ---------- TableSkeleton ----------
 * Loading placeholder rows. Mirrors Figma `Table / Skeleton` (`2733:148`).
 * Renders `rows` × `columns` of pulsing bars inside `<tr>`/`<td>` so it
 * slots cleanly inside `<TableBody>` while data loads. */

export interface TableSkeletonProps {
  /** How many rows of placeholders to render. Default 5. */
  rows?: number;
  /** How many cells per row. Default 4. */
  columns?: number;
  className?: string;
}

export const TableSkeleton = ({
  rows = 5,
  columns = 4,
  className,
}: TableSkeletonProps) => (
  <>
    {Array.from({ length: rows }, (_, r) => (
      <tr
        key={r}
        aria-busy="true"
        className={cx(styles.row, styles.skeletonRow, className)}
      >
        {Array.from({ length: columns }, (_, c) => (
          <td key={c} className={cx(styles.cell, styles.skeletonCell)}>
            <span className={styles.skeletonBar} />
          </td>
        ))}
      </tr>
    ))}
  </>
);
