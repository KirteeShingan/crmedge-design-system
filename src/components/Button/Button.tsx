import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

export type ButtonVariant = "filled" | "outlined" | "text";
export type ButtonTone = "primary" | "secondary";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
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

const spinnerSizeFor: Record<ButtonSize, number> = {
  sm: 14,
  md: 16,
  lg: 18,
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const {
      variant = "filled",
      tone = "primary",
      size = "md",
      loading = false,
      disabled = false,
      iconLeft,
      iconRight,
      type = "button",
      className,
      children,
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
          iconLeft && (
            <span className={styles.icon} aria-hidden="true">
              {iconLeft}
            </span>
          )
        )}
        {children !== undefined && (
          <span className={styles.label}>{children}</span>
        )}
        {!loading && iconRight && (
          <span className={styles.icon} aria-hidden="true">
            {iconRight}
          </span>
        )}
      </button>
    );
  },
);
