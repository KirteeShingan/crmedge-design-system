import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Tooltip.module.css";

export type TooltipVariant = "rich" | "plain";

export type TooltipPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end"
  | "none";

export interface TooltipAction {
  label: string;
  onClick?: () => void;
}

export interface TooltipProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: TooltipVariant;
  placement?: TooltipPlacement;
  body: ReactNode;
  heading?: string;
  primaryAction?: TooltipAction;
  secondaryAction?: TooltipAction;
  showClose?: boolean;
  onClose?: () => void;
  closeAriaLabel?: string;
}

const cx = (...classes: Array<string | false | undefined>): string =>
  classes.filter(Boolean).join(" ");

const CloseIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M4 4l8 8M12 4l-8 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const placementClass = (placement: TooltipPlacement): string => {
  if (placement === "none") return "";
  return `placement_${placement.replace("-", "_")}`;
};

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
  props,
  ref,
) {
  const {
    variant = "plain",
    placement = "top",
    body,
    heading,
    primaryAction,
    secondaryAction,
    showClose = true,
    onClose,
    closeAriaLabel = "Close tooltip",
    className,
    role = "tooltip",
    ...rest
  } = props;

  const isRich = variant === "rich";
  const showArrow = placement !== "none";
  const placementKey = placementClass(placement);

  return (
    <div
      ref={ref}
      role={role}
      className={cx(
        styles.root,
        placementKey && styles[placementKey],
        className,
      )}
      {...rest}
    >
      {showArrow && (
        <span
          className={cx(
            styles.arrow,
            isRich ? styles.arrowRich : styles.arrowPlain,
          )}
          aria-hidden="true"
        />
      )}

      {isRich ? (
        <div className={cx(styles.body, styles.rich)}>
          <div className={styles.textBlock}>
            {heading && <p className={styles.heading}>{heading}</p>}
            <p className={styles.bodyTextRich}>{body}</p>
            {(primaryAction || secondaryAction) && (
              <div className={styles.actions}>
                {primaryAction && (
                  <button
                    type="button"
                    className={cx(styles.actionButton, styles.actionPrimary)}
                    onClick={primaryAction.onClick}
                  >
                    {primaryAction.label}
                  </button>
                )}
                {secondaryAction && (
                  <button
                    type="button"
                    className={styles.actionButton}
                    onClick={secondaryAction.onClick}
                  >
                    {secondaryAction.label}
                  </button>
                )}
              </div>
            )}
          </div>
          {showClose && (
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label={closeAriaLabel}
            >
              <CloseIcon />
            </button>
          )}
        </div>
      ) : (
        <div className={cx(styles.body, styles.plain)}>
          <p className={styles.plainText}>{body}</p>
          {showClose && (
            <button
              type="button"
              className={styles.closeButtonPlain}
              onClick={onClose}
              aria-label={closeAriaLabel}
            >
              <CloseIcon size={12} />
            </button>
          )}
        </div>
      )}
    </div>
  );
});
