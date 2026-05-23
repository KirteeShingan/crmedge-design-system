import { forwardRef, useEffect, useId, useRef } from "react";
import type { InputHTMLAttributes } from "react";
import styles from "./Checkbox.module.css";

export type CheckboxSize = "sm" | "md";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: string;
  helper?: string;
  error?: string;
  size?: CheckboxSize;
  indeterminate?: boolean;
}

const cx = (...classes: Array<string | false | undefined>): string =>
  classes.filter(Boolean).join(" ");

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(props, ref) {
    const {
      label,
      helper,
      error,
      size = "md",
      indeterminate = false,
      id,
      disabled = false,
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
    const hasText = Boolean(label || helper || error);

    const localRef = useRef<HTMLInputElement | null>(null);

    const setRefs = (node: HTMLInputElement | null) => {
      localRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref)
        (ref as { current: HTMLInputElement | null }).current = node;
    };

    useEffect(() => {
      if (localRef.current) {
        localRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <div
        className={cx(
          styles.root,
          hasError && styles.root_error,
          disabled && styles.root_disabled,
          className,
        )}
      >
        <label htmlFor={inputId} className={styles.row}>
          <input
            {...rest}
            ref={setRefs}
            id={inputId}
            type="checkbox"
            disabled={disabled}
            required={required}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
            className={styles.nativeInput}
          />
          <span
            className={cx(styles.box, styles[`size_${size}`])}
            aria-hidden="true"
          >
            <svg
              className={styles.checkmark}
              viewBox="0 0 24 24"
              focusable="false"
            >
              <path
                d="M5 12L10 17L19 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={styles.dash} />
          </span>
          {hasText && (
            <span className={styles.text}>
              {label && (
                <span className={styles.label}>
                  {label}
                  {required && (
                    <span className={styles.requiredMark} aria-hidden="true">
                      *
                    </span>
                  )}
                </span>
              )}
              {hasError ? (
                <span id={errorId} className={styles.error} role="alert">
                  {error}
                </span>
              ) : helper ? (
                <span id={helperId} className={styles.helper}>
                  {helper}
                </span>
              ) : null}
            </span>
          )}
        </label>
      </div>
    );
  },
);
