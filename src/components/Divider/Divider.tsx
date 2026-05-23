import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import styles from "./Divider.module.css";

export type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Layout direction. `horizontal` (default) → 1px-tall line that grows
   * to fill width. `vertical` → 1px-wide line that grows to fill height
   * (the parent must provide a height).
   */
  orientation?: DividerOrientation;
  /**
   * Visual weight. `subtle` (default) maps to `--color-border-default`
   * (#dbdcdf, matches Figma's table divider). `strong` uses
   * `--color-border-strong` for emphasis-heavy contexts.
   */
  variant?: "subtle" | "strong";
}

const cx = (...classes: Array<string | false | undefined>): string =>
  classes.filter(Boolean).join(" ");

export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  props,
  ref,
) {
  const {
    orientation = "horizontal",
    variant = "subtle",
    className,
    role,
    "aria-orientation": ariaOrientation,
    ...rest
  } = props;

  return (
    <div
      {...rest}
      ref={ref}
      role={role ?? "separator"}
      aria-orientation={ariaOrientation ?? orientation}
      className={cx(
        styles.root,
        styles[`orientation_${orientation}`],
        styles[`variant_${variant}`],
        className,
      )}
    />
  );
});
