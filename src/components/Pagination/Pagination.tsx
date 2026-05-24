import { forwardRef } from "react";
import type { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { Button } from "../Button/Button";
import styles from "./Pagination.module.css";

/* Pagination
 *
 * Two co-located components mirroring the Figma masters on the
 * 🔢 Pagination (Fixed) area of file DmL4gv3m10KzL2Y6yLMDJ5:
 *
 *   - PageNumber   → Figma `Page Number` set 2734:2591
 *                    States: Default | Hover | Selected
 *   - Pagination   → Figma `Pagination` set 53:261252
 *                    Prev + numbered pages (max 5 visible) + Next.
 *                    Truncation: sliding window around current, always
 *                    show first and last; ellipses are clickable and
 *                    jump 5 pages in their direction.
 *
 * Selection state is consumer-owned: pass `currentPage` + `onPageChange`.
 * Prev disabled at page 1; Next disabled at the last page (per spec).
 */

const cx = (...c: Array<string | false | undefined>) => c.filter(Boolean).join(" ");

/* ---------- PageNumber ---------- */

export interface PageNumberProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "aria-label"> {
  /** The 1-based page number to render. */
  page: number;
  /**
   * Whether this number represents the currently active page. Toggles
   * the Selected visual state and writes `aria-current="page"`.
   */
  selected?: boolean;
  /**
   * Fired when the user activates the number. The page value is passed
   * back; consumers update their own pagination state.
   */
  onClick?: (page: number) => void;
  /**
   * Override the default a11y label. Defaults to `"Go to page N"`, or
   * `"Page N, current page"` when selected.
   */
  "aria-label"?: string;
}

export const PageNumber = forwardRef<HTMLButtonElement, PageNumberProps>(
  function PageNumber(props, ref) {
    const {
      page,
      selected,
      onClick,
      className,
      disabled,
      "aria-label": ariaLabel,
      ...rest
    } = props;
    const label =
      ariaLabel ?? (selected ? `Page ${page}, current page` : `Go to page ${page}`);
    return (
      <button
        {...rest}
        ref={ref}
        type="button"
        disabled={disabled}
        onClick={() => onClick?.(page)}
        aria-current={selected ? "page" : undefined}
        aria-label={label}
        className={cx(
          styles.pageNumber,
          selected && styles.pageNumber_selected,
          className,
        )}
      >
        {page}
      </button>
    );
  },
);

/* ---------- Pagination ---------- */

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  /** Total number of pages. Must be ≥ 1. */
  totalPages: number;
  /** Currently active page (1-based). Clamped to [1, totalPages]. */
  currentPage: number;
  /**
   * Called when the user picks a different page — via a PageNumber, an
   * ellipsis jump, or Prev/Next. The new page value is always 1-based and
   * already clamped.
   */
  onPageChange: (page: number) => void;
  /**
   * Label for the Previous button. Default `"Prev"` (matches Figma).
   */
  prevLabel?: string;
  /**
   * Label for the Next button. Default `"Next"`.
   */
  nextLabel?: string;
  /**
   * Accessible label for the nav landmark. Default `"Pagination"`.
   */
  "aria-label"?: string;
}

type Item =
  | { kind: "page"; page: number }
  | { kind: "ellipsis"; jumpTo: number };

/**
 * Build the page item list given total + current.
 *
 * Rules (sliding window + always show first/last):
 * - If totalPages ≤ 7 → render every page; no ellipses.
 * - If currentPage ≤ 4 → `1 2 3 4 5 … last`
 * - If currentPage ≥ totalPages − 3 → `1 … (last-4) (last-3) (last-2) (last-1) last`
 * - Otherwise → `1 … (current-1) current (current+1) … last`
 *
 * Ellipsis jump targets: the elided range is collapsed onto a single
 * button that jumps the user 5 pages in that direction (per chosen UX).
 */
const buildItems = (totalPages: number, currentPage: number): Item[] => {
  if (totalPages <= 7) {
    const items: Item[] = [];
    for (let p = 1; p <= totalPages; p++) items.push({ kind: "page", page: p });
    return items;
  }

  const last = totalPages;
  const items: Item[] = [];

  if (currentPage <= 4) {
    for (let p = 1; p <= 5; p++) items.push({ kind: "page", page: p });
    items.push({ kind: "ellipsis", jumpTo: Math.min(last, currentPage + 5) });
    items.push({ kind: "page", page: last });
    return items;
  }

  if (currentPage >= last - 3) {
    items.push({ kind: "page", page: 1 });
    items.push({ kind: "ellipsis", jumpTo: Math.max(1, currentPage - 5) });
    for (let p = last - 4; p <= last; p++) items.push({ kind: "page", page: p });
    return items;
  }

  items.push({ kind: "page", page: 1 });
  items.push({ kind: "ellipsis", jumpTo: Math.max(1, currentPage - 5) });
  for (let p = currentPage - 1; p <= currentPage + 1; p++)
    items.push({ kind: "page", page: p });
  items.push({ kind: "ellipsis", jumpTo: Math.min(last, currentPage + 5) });
  items.push({ kind: "page", page: last });
  return items;
};

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  function Pagination(props, ref) {
    const {
      totalPages,
      currentPage,
      onPageChange,
      prevLabel = "Prev",
      nextLabel = "Next",
      "aria-label": ariaLabel = "Pagination",
      className,
      ...rest
    } = props;

    const safeTotal = Math.max(1, totalPages);
    const safeCurrent = clamp(currentPage, 1, safeTotal);

    const items = buildItems(safeTotal, safeCurrent);
    const prevDisabled = safeCurrent <= 1;
    const nextDisabled = safeCurrent >= safeTotal;

    const goTo = (p: number) => onPageChange(clamp(p, 1, safeTotal));

    return (
      <nav
        {...rest}
        ref={ref}
        aria-label={ariaLabel}
        className={cx(styles.pagination, className)}
      >
        <Button
          variant="tertiary"
          size="medium"
          onClick={() => goTo(safeCurrent - 1)}
          disabled={prevDisabled}
        >
          {prevLabel}
        </Button>

        <ul className={styles.pages}>
          {items.map((item, i) => {
            if (item.kind === "page") {
              return (
                <li key={`p-${item.page}`} className={styles.pagesItem}>
                  <PageNumber
                    page={item.page}
                    selected={item.page === safeCurrent}
                    onClick={goTo}
                  />
                </li>
              );
            }
            return (
              <li key={`e-${i}`} className={styles.pagesItem}>
                <button
                  type="button"
                  onClick={() => goTo(item.jumpTo)}
                  className={styles.ellipsis}
                  aria-label={
                    item.jumpTo < safeCurrent
                      ? `Jump back to page ${item.jumpTo}`
                      : `Jump forward to page ${item.jumpTo}`
                  }
                >
                  …
                </button>
              </li>
            );
          })}
        </ul>

        <Button
          variant="tertiary"
          size="medium"
          onClick={() => goTo(safeCurrent + 1)}
          disabled={nextDisabled}
        >
          {nextLabel}
        </Button>
      </nav>
    );
  },
);
