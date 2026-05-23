import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import styles from "./StatusBadge.module.css";

export type StatusBadgeStatus = "published" | "scheduled" | "draft";

export interface StatusBadgeProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /**
   * Status type. Determines colors, default label, and default icon.
   * Mirrors the Chip / Small / Info variant from Figma node `53:259540`:
   *   - published → green (success)
   *   - scheduled → yellow (warning)
   *   - draft     → orange (brand)
   */
  status: StatusBadgeStatus;
  /**
   * Override the default label text. The component renders all labels in
   * UPPERCASE via CSS, so casing of the input is preserved-as-typed only
   * if you turn that off via `className`.
   */
  children?: ReactNode;
  /**
   * Show the trailing status icon. Defaults to true.
   */
  showIcon?: boolean;
}

const DEFAULT_LABEL: Record<StatusBadgeStatus, string> = {
  published: "Published",
  scheduled: "Scheduled",
  draft: "Draft",
};

const cx = (...classes: Array<string | false | undefined>): string =>
  classes.filter(Boolean).join(" ");

function StatusIcon({ status }: { status: StatusBadgeStatus }) {
  if (status === "published") {
    return (
      <svg
        className={styles.icon}
        viewBox="0 0 16 16"
        focusable="false"
        aria-hidden="true"
      >
        <path
          d="M3.5 8.5L6.5 11.5L12.5 5.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (status === "scheduled") {
    return (
      <svg
        className={styles.icon}
        viewBox="0 0 16 16"
        focusable="false"
        aria-hidden="true"
      >
        <circle
          cx="8"
          cy="8"
          r="5.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M8 5V8L10 9.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  // draft → pencil/edit icon
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 16 16"
      focusable="false"
      aria-hidden="true"
    >
      <path
        d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  function StatusBadge(props, ref) {
    const { status, children, showIcon = true, className, ...rest } = props;
    const label = children ?? DEFAULT_LABEL[status];
    return (
      <span
        {...rest}
        ref={ref}
        className={cx(styles.root, styles[`status_${status}`], className)}
      >
        <span className={styles.label}>{label}</span>
        {showIcon && <StatusIcon status={status} />}
      </span>
    );
  },
);
