import { Children, cloneElement, forwardRef, isValidElement } from "react";
import type { HTMLAttributes, ReactElement, ReactNode } from "react";
import { Avatar } from "../Avatar";
import type { AvatarProps, AvatarSize } from "../Avatar";
import styles from "./AvatarGroup.module.css";

export type AvatarGroupSpacing = "tight" | "default" | "loose";

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Visible Avatar children. Anything beyond `max` is collapsed into a
   * trailing `+N` indicator.
   */
  children: ReactNode;
  /**
   * Maximum number of avatars to render. Remaining items show as a
   * neutral `+N` chip with the same size as siblings. Use `Infinity`
   * (or omit and pass small children counts) to disable collapsing.
   * Defaults to `4`.
   */
  max?: number;
  /**
   * Size applied to all avatars in the group (overrides each child's own
   * `size` prop so the group renders uniformly). Defaults to `sm` to
   * match the Figma Avatar master.
   */
  size?: AvatarSize;
  /**
   * How tightly avatars overlap.
   *   - `tight`   — strong overlap (≈45% of avatar)
   *   - `default` — moderate overlap (≈30% of avatar)
   *   - `loose`   — light overlap (≈15% of avatar)
   * Defaults to `default`.
   */
  spacing?: AvatarGroupSpacing;
  /**
   * Total count to use for the `+N` indicator when it exceeds the number
   * of children passed in (e.g. paginated lists where you only render
   * the first few). When omitted, the overflow is derived from
   * `Children.count(children) - max`.
   */
  total?: number;
  /**
   * Custom accessible label for the group. Defaults to a count summary.
   */
  "aria-label"?: string;
}

const OVERLAP_BY_SIZE: Record<AvatarSize, Record<AvatarGroupSpacing, number>> = {
  sm: { tight: -11, default: -7, loose: -3 },
  md: { tight: -14, default: -9, loose: -4 },
  lg: { tight: -18, default: -12, loose: -5 },
};

const isAvatarElement = (
  node: ReactNode,
): node is ReactElement<AvatarProps> =>
  isValidElement(node) && node.type === Avatar;

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  function AvatarGroup(props, ref) {
    const {
      children,
      max = 4,
      size = "sm",
      spacing = "default",
      total,
      className,
      style,
      "aria-label": ariaLabel,
      ...rest
    } = props;

    const allChildren = Children.toArray(children).filter(isValidElement);
    const visible = allChildren.slice(0, max);
    const hiddenCount =
      typeof total === "number"
        ? Math.max(0, total - visible.length)
        : Math.max(0, allChildren.length - visible.length);

    const marginLeft = OVERLAP_BY_SIZE[size][spacing];
    const groupVars = {
      ["--avatar-group-overlap" as string]: `${marginLeft}px`,
    } as React.CSSProperties;

    return (
      <div
        {...rest}
        ref={ref}
        role="group"
        aria-label={
          ariaLabel ??
          `Group of ${visible.length + hiddenCount} avatars`
        }
        className={[styles.root, className].filter(Boolean).join(" ")}
        style={{ ...groupVars, ...style }}
      >
        {visible.map((child, index) => {
          if (!isAvatarElement(child)) return child;
          return cloneElement(child, {
            key: child.key ?? index,
            size,
            className: [styles.item, child.props.className]
              .filter(Boolean)
              .join(" "),
          });
        })}
        {hiddenCount > 0 && (
          <span
            className={[
              styles.item,
              styles.overflow,
              styles[`size_${size}`],
            ].join(" ")}
            role="img"
            aria-label={`${hiddenCount} more`}
          >
            +{hiddenCount}
          </span>
        )}
      </div>
    );
  },
);

/**
 * Re-export the Avatar so consumers can write `<AvatarGroup><Avatar … />`
 * without a second import line if they prefer.
 */
export { Avatar } from "../Avatar";
