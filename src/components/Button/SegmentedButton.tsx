import { forwardRef, useCallback, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import styles from "./SegmentedButton.module.css";

export type SegmentedButtonVariant = "secondary" | "neutral";
export type SegmentedButtonSize = "small" | "medium";

export interface SegmentedButtonSegment {
  value: string;
  label?: ReactNode;
  icon?: ReactNode;
  ariaLabel?: string;
  disabled?: boolean;
}

export interface SegmentedButtonProps {
  segments: SegmentedButtonSegment[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  variant?: SegmentedButtonVariant;
  size?: SegmentedButtonSize;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

const cx = (...c: Array<string | false | undefined>): string =>
  c.filter(Boolean).join(" ");

export const SegmentedButton = forwardRef<HTMLDivElement, SegmentedButtonProps>(
  function SegmentedButton(props, ref) {
    const {
      segments,
      value,
      defaultValue,
      onChange,
      variant = "secondary",
      size = "medium",
      disabled = false,
      ariaLabel,
      className,
    } = props;

    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState<string>(
      defaultValue ?? segments[0]?.value ?? "",
    );
    const selected = isControlled ? value : internalValue;

    const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);

    const select = useCallback(
      (next: string) => {
        if (!isControlled) setInternalValue(next);
        onChange?.(next);
      },
      [isControlled, onChange],
    );

    const focusAt = (index: number) => {
      const total = segments.length;
      let i = ((index % total) + total) % total;
      // Skip disabled segments
      for (let step = 0; step < total; step += 1) {
        const seg = segments[i];
        if (seg && !seg.disabled) {
          buttonsRef.current[i]?.focus();
          select(seg.value);
          return;
        }
        i = (i + 1) % total;
      }
    };

    const handleKeyDown = (
      e: KeyboardEvent<HTMLButtonElement>,
      index: number,
    ) => {
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          focusAt(index + 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          focusAt(index - 1);
          break;
        case "Home":
          e.preventDefault();
          focusAt(0);
          break;
        case "End":
          e.preventDefault();
          focusAt(segments.length - 1);
          break;
        default:
          break;
      }
    };

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-label={ariaLabel}
        className={cx(
          styles.group,
          styles[`variant_${variant}`],
          styles[`size_${size}`],
          disabled && styles.disabled,
          className,
        )}
      >
        {segments.map((seg, index) => {
          const isSelected = seg.value === selected;
          const isDisabled = disabled || seg.disabled;
          const hasLabel = seg.label !== undefined && seg.label !== null;
          const iconOnly = !hasLabel && seg.icon !== undefined;
          return (
            <button
              key={seg.value}
              ref={(el) => {
                buttonsRef.current[index] = el;
              }}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={seg.ariaLabel}
              disabled={isDisabled}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => select(seg.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cx(
                styles.segment,
                isSelected && styles.selected,
                iconOnly && styles.iconOnly,
              )}
            >
              {seg.icon && (
                <span className={styles.icon} aria-hidden="true">
                  {seg.icon}
                </span>
              )}
              {hasLabel && <span className={styles.label}>{seg.label}</span>}
            </button>
          );
        })}
      </div>
    );
  },
);
