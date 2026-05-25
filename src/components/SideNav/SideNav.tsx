import { forwardRef, useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { TooltipTrigger } from "../Tooltip";
import styles from "./SideNav.module.css";

export interface SideNavSubItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface SideNavItem {
  id: string;
  label: string;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
  subItems?: SideNavSubItem[];
}

export interface SideNavProps
  extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
  items: SideNavItem[];
  selectedId?: string;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  ariaLabel?: string;
}

const cx = (...classes: Array<string | false | undefined>): string =>
  classes.filter(Boolean).join(" ");

const Chevron = () => (
  <svg
    className={styles.chevron}
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M7.5 5l5 5-5 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const findParentOfSub = (
  items: SideNavItem[],
  subId: string | undefined,
): string | null => {
  if (!subId) return null;
  for (const item of items) {
    if (item.subItems?.some((s) => s.id === subId)) return item.id;
  }
  return null;
};

export const SideNav = forwardRef<HTMLElement, SideNavProps>(function SideNav(
  {
    items,
    selectedId,
    defaultExpanded = true,
    expanded: expandedProp,
    onExpandedChange,
    ariaLabel = "Primary",
    className,
    ...rest
  },
  ref,
) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const expanded = expandedProp ?? internalExpanded;

  const [openIds, setOpenIds] = useState<Set<string>>(() => {
    const parent = findParentOfSub(items, selectedId);
    return new Set(parent ? [parent] : []);
  });

  const setExpanded = (next: boolean) => {
    if (expandedProp === undefined) setInternalExpanded(next);
    onExpandedChange?.(next);
  };

  const toggleOpen = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleItemClick = (item: SideNavItem) => {
    const hasSubs = !!item.subItems?.length;
    if (hasSubs) {
      if (!expanded) {
        setExpanded(true);
        setOpenIds((prev) => new Set(prev).add(item.id));
      } else {
        toggleOpen(item.id);
      }
    }
    item.onClick?.();
  };

  return (
    <nav
      ref={ref}
      aria-label={ariaLabel}
      data-expanded={expanded || undefined}
      className={cx(
        styles.root,
        expanded ? styles.expanded : styles.collapsed,
        className,
      )}
      {...rest}
    >
      <ul className={styles.list}>
        {items.map((item) => {
          const isSelected = selectedId === item.id;
          const hasSubs = !!item.subItems?.length;
          const isOpen = openIds.has(item.id);

          const button = (
            <button
              type="button"
              className={cx(
                styles.item,
                isSelected && styles.itemSelected,
              )}
              aria-current={isSelected ? "page" : undefined}
              aria-expanded={hasSubs ? isOpen : undefined}
              onClick={() => handleItemClick(item)}
            >
              <span className={styles.itemIcon} aria-hidden="true">
                {item.icon}
              </span>
              {expanded && (
                <>
                  <span className={styles.itemLabel}>{item.label}</span>
                  {hasSubs && (
                    <span
                      className={cx(
                        styles.chevronWrap,
                        isOpen && styles.chevronOpen,
                      )}
                      aria-hidden="true"
                    >
                      <Chevron />
                    </span>
                  )}
                </>
              )}
            </button>
          );

          return (
            <li key={item.id} className={styles.itemRow}>
              {expanded ? (
                button
              ) : (
                <TooltipTrigger
                  body={item.label}
                  placement="right"
                  trigger="hover"
                >
                  {button}
                </TooltipTrigger>
              )}

              {expanded && hasSubs && isOpen && (
                <ul className={styles.subList}>
                  {item.subItems!.map((sub) => {
                    const subSelected = selectedId === sub.id;
                    return (
                      <li key={sub.id} className={styles.itemRow}>
                        <button
                          type="button"
                          className={cx(
                            styles.subItem,
                            subSelected && styles.subItemSelected,
                          )}
                          aria-current={subSelected ? "page" : undefined}
                          onClick={() => sub.onClick?.()}
                        >
                          {sub.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
});
