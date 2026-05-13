import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./IconButton.module.css";

export type IconButtonVariant = "filled" | "outlined" | "text";
export type IconButtonTone = "primary" | "secondary";
export type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  "aria-label": string;
  variant?: IconButtonVariant;
  tone?: IconButtonTone;
  size?: IconButtonSize;
  loading?: boolean;
}

const cx = (...classes: Array<string | false | undefined>): string =>
  classes.filter(Boolean).join(" ");

const Spinner = ({ size }: { size: number }) => (
  <svg
    className={styles.spinner}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeOpacity="0.25"
    />
    <path
      d="M21 12a9 9 0 0 0-9-9"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

const spinnerSizeFor: Record<IconButtonSize, number> = {
  sm: 14,
  md: 18,
  lg: 22,
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(props, ref) {
    const {
      icon,
      variant = "filled",
      tone = "primary",
      size = "md",
      loading = false,
      disabled = false,
      type = "button",
      className,
      ...rest
    } = props;

    const isInert = disabled || loading;

    return (
      <button
        {...rest}
        ref={ref}
        type={type}
        disabled={isInert}
        aria-busy={loading || undefined}
        data-loading={loading || undefined}
        className={cx(
          styles.button,
          styles[`variant_${variant}`],
          styles[`tone_${tone}`],
          styles[`size_${size}`],
          loading && styles.loading,
          className,
        )}
      >
        {loading ? (
          <Spinner size={spinnerSizeFor[size]} />
        ) : (
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        )}
      </button>
    );
  },
);
