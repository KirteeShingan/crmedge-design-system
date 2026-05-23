import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import styles from "./StatusBadge.module.css";

export type StatusBadgeColor = "neutral" | "yellow" | "blue" | "green";

export interface StatusBadgeProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /**
   * Badge color. Drives bg (50 shade) + text/icon (900 shade) of the
   * corresponding ramp. Mirrors the `colour` axis of the Chip master at
   * Figma node `53:259540`.
   *   - neutral → secondary-neutral-50  / secondary-neutral-900
   *   - yellow  → accent-yellow-50      / accent-yellow-900
   *   - blue    → accent-blue-50        / accent-blue-900
   *   - green   → accent-green-50       / accent-green-900
   */
  color: StatusBadgeColor;
  /**
   * Badge label. Rendered in UPPERCASE via CSS.
   */
  children: ReactNode;
  /**
   * Optional leading icon. Pass any 16×16 ReactNode (typically an inline
   * SVG with `stroke="currentColor"` so it inherits the badge text color).
   */
  icon?: ReactNode;
}

const cx = (...classes: Array<string | false | undefined>): string =>
  classes.filter(Boolean).join(" ");

export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  function StatusBadge(props, ref) {
    const { color, children, icon, className, ...rest } = props;
    return (
      <span
        {...rest}
        ref={ref}
        className={cx(styles.root, styles[`color_${color}`], className)}
      >
        <span className={styles.label}>{children}</span>
        {icon && (
          <span className={styles.iconSlot} aria-hidden="true">
            {icon}
          </span>
        )}
      </span>
    );
  },
);
