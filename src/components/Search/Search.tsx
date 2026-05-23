import { forwardRef, useCallback, useRef, useState } from "react";
import type { InputHTMLAttributes } from "react";
import styles from "./Search.module.css";

export type SearchSize = "sm" | "md";

export interface SearchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  size?: SearchSize;
  fullWidth?: boolean;
  onClear?: () => void;
  clearAriaLabel?: string;
}

const cx = (...classes: Array<string | false | undefined>): string =>
  classes.filter(Boolean).join(" ");

const SearchIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle
      cx="9"
      cy="9"
      r="6.5"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="m14 14 4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M5 5l10 10M15 5L5 15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const Search = forwardRef<HTMLInputElement, SearchProps>(function Search(
  props,
  ref,
) {
  const {
    size = "md",
    fullWidth = false,
    onClear,
    clearAriaLabel = "Clear search",
    placeholder = "Search",
    disabled = false,
    value,
    defaultValue,
    onChange,
    className,
    ...rest
  } = props;

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string>(
    typeof defaultValue === "string" ? defaultValue : "",
  );
  const currentValue = isControlled ? String(value ?? "") : internalValue;
  const hasValue = currentValue.length > 0;

  const innerRef = useRef<HTMLInputElement>(null);
  const setRefs = useCallback(
    (node: HTMLInputElement | null) => {
      (innerRef as { current: HTMLInputElement | null }).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as { current: HTMLInputElement | null }).current = node;
    },
    [ref],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue("");
    if (innerRef.current) {
      const nativeSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value",
      )?.set;
      nativeSetter?.call(innerRef.current, "");
      innerRef.current.dispatchEvent(new Event("input", { bubbles: true }));
      innerRef.current.focus();
    }
    onClear?.();
  };

  const showClear = hasValue && !disabled;

  return (
    <div
      className={cx(
        styles.root,
        styles[`size_${size}`],
        fullWidth && styles.fullWidth,
        hasValue && styles.filled,
        showClear && styles.hasClear,
        disabled && styles.disabled,
        className,
      )}
    >
      <span className={styles.leadingIcon} aria-hidden="true">
        <SearchIcon />
      </span>
      <input
        {...rest}
        ref={setRefs}
        type="search"
        className={styles.input}
        placeholder={placeholder}
        disabled={disabled}
        value={isControlled ? currentValue : undefined}
        defaultValue={isControlled ? undefined : defaultValue}
        onChange={handleChange}
      />
      {showClear && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClear}
          aria-label={clearAriaLabel}
          tabIndex={-1}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
});
