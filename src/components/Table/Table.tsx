import { forwardRef } from "react";
import type {
  ColHTMLAttributes,
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";
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

export interface TableHeaderCellProps
  extends Omit<ThHTMLAttributes<HTMLTableCellElement>, "align"> {
  /**
   * Horizontal alignment. Defaults to `start`. `numeric` is sugar for
   * `end` with `font-variant-numeric: tabular-nums`. (Shadows the
   * deprecated HTML `align` attribute.)
   */
  align?: TableCellAlign;
}

export const TableHeaderCell = forwardRef<
  HTMLTableCellElement,
  TableHeaderCellProps
>(function TableHeaderCell(props, ref) {
  const { align = "start", className, children, scope, ...rest } = props;
  return (
    <th
      {...rest}
      ref={ref}
      scope={scope ?? "col"}
      className={cx(styles.headerCell, styles[`align_${align}`], className)}
    >
      {children}
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
