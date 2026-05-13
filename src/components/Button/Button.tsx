import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

export type ButtonVariant = "filled" | "outlined" | "text";
export type ButtonTone = "primary" | "secondary";
export type ButtonSize = "small" | "medium";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

const cx = (...classes: Array<string | false | undefined>): string =>
  classes.filter(Boolean).join(" ");

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const {
      variant = "filled",
      tone = "primary",
      size = "medium",
      disabled = false,
      iconLeft,
      iconRight,
      type = "button",
      className,
      children,
      ...rest
    } = props;

    return (
      <button
        {...rest}
        ref={ref}
        type={type}
        disabled={disabled}
        className={cx(
          styles.button,
          styles[`variant_${variant}`],
          styles[`tone_${tone}`],
          styles[`size_${size}`],
          className,
        )}
      >
        {iconLeft && (
          <span className={styles.icon} aria-hidden="true">
            {iconLeft}
          </span>
        )}
        {children !== undefined && (
          <span className={styles.label}>{children}</span>
        )}
        {iconRight && (
          <span className={styles.icon} aria-hidden="true">
            {iconRight}
          </span>
        )}
      </button>
    );
  },
);
