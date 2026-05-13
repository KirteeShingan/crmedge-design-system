import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import styles from "./TextField.module.css";

export type TextFieldSize = "sm" | "md" | "lg";

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helper?: string;
  error?: string;
  size?: TextFieldSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
}

const cx = (...classes: Array<string | false | undefined>): string =>
  classes.filter(Boolean).join(" ");

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(props, ref) {
    const {
      label,
      helper,
      error,
      size = "md",
      iconLeft,
      iconRight,
      fullWidth = false,
      id,
      disabled = false,
      readOnly = false,
      required = false,
      className,
      ...rest
    } = props;

    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;
    const hasError = Boolean(error);
    const describedBy = hasError ? errorId : helper ? helperId : undefined;

    return (
      <div
        className={cx(
          styles.root,
          fullWidth && styles.fullWidth,
          className,
        )}
      >
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {required && (
              <span className={styles.requiredMark} aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <div
          className={cx(
            styles.field,
            styles[`size_${size}`],
            hasError && styles.field_error,
            disabled && styles.field_disabled,
            readOnly && styles.field_readonly,
          )}
        >
          {iconLeft && (
            <span className={styles.icon} aria-hidden="true">
              {iconLeft}
            </span>
          )}
          <input
            {...rest}
            ref={ref}
            id={inputId}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
            className={styles.input}
          />
          {iconRight && (
            <span className={styles.icon} aria-hidden="true">
              {iconRight}
            </span>
          )}
        </div>
        {hasError ? (
          <span id={errorId} className={styles.error} role="alert">
            {error}
          </span>
        ) : helper ? (
          <span id={helperId} className={styles.helper}>
            {helper}
          </span>
        ) : null}
      </div>
    );
  },
);
