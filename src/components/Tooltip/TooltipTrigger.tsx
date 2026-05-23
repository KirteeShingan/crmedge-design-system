import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import type { ReactElement, ReactNode } from "react";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  FloatingPortal,
} from "@floating-ui/react";
import type { Placement } from "@floating-ui/react";
import { Tooltip } from "./Tooltip";
import type { TooltipPlacement, TooltipProps } from "./Tooltip";

export type TooltipTriggerEvent = "hover" | "focus" | "click" | "manual";

export interface TooltipTriggerProps
  extends Omit<TooltipProps, "placement"> {
  children: ReactElement;
  placement?: Exclude<TooltipPlacement, "none">;
  trigger?: TooltipTriggerEvent | TooltipTriggerEvent[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  offsetPx?: number;
  disabled?: boolean;
}

const toFloatingPlacement = (p: Exclude<TooltipPlacement, "none">): Placement =>
  p as Placement;

export function TooltipTrigger(props: TooltipTriggerProps) {
  const {
    children,
    placement = "top",
    trigger = ["hover", "focus"],
    open: controlledOpen,
    onOpenChange,
    defaultOpen = false,
    offsetPx = 12,
    disabled = false,
    id: providedId,
    showClose,
    variant = "plain",
    ...tooltipProps
  } = props;

  const triggers = useMemo(
    () => (Array.isArray(trigger) ? trigger : [trigger]),
    [trigger],
  );

  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = (next: boolean) => {
    if (!isControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  const generatedId = useId();
  const tooltipId = providedId ?? `tooltip-${generatedId}`;

  const { refs, floatingStyles, context } = useFloating({
    placement: toFloatingPlacement(placement),
    open,
    onOpenChange: setOpen,
    middleware: [offset(offsetPx), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, {
    enabled: !disabled && triggers.includes("hover"),
    delay: { open: 200, close: 100 },
    move: false,
  });
  const focus = useFocus(context, {
    enabled: !disabled && triggers.includes("focus"),
  });
  const dismiss = useDismiss(context, {
    enabled: !disabled,
    referencePress: triggers.includes("click"),
  });
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  useEffect(() => {
    if (disabled && open) setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled]);

  if (!isValidElement(children)) {
    return children as ReactNode;
  }

  const childProps = (children as ReactElement<Record<string, unknown>>).props;
  const childRef = (children as ReactElement & { ref?: unknown }).ref as
    | React.Ref<unknown>
    | undefined;

  const triggerEl = cloneElement(
    children as ReactElement<Record<string, unknown>>,
    {
      ...getReferenceProps({
        ref: refs.setReference as unknown as React.Ref<unknown>,
        ...childProps,
        "aria-describedby": open ? tooltipId : childProps["aria-describedby"],
        onClick: (event: React.MouseEvent) => {
          if (triggers.includes("click") && !disabled) {
            setOpen(!open);
          }
          const childOnClick = childProps.onClick as
            | ((e: React.MouseEvent) => void)
            | undefined;
          childOnClick?.(event);
        },
      } as Record<string, unknown>),
      ref: composeRefs(childRef, refs.setReference),
    },
  );

  const handleClose = () => setOpen(false);

  return (
    <>
      {triggerEl}
      {open && !disabled && (
        <FloatingPortal>
          <Tooltip
            ref={refs.setFloating as React.Ref<HTMLDivElement>}
            id={tooltipId}
            style={floatingStyles}
            {...getFloatingProps()}
            {...tooltipProps}
            variant={variant}
            placement={placement}
            showClose={showClose ?? variant === "rich"}
            onClose={() => {
              tooltipProps.onClose?.();
              handleClose();
            }}
          />
        </FloatingPortal>
      )}
    </>
  );
}

function composeRefs<T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
  return (node: T | null) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") ref(node);
      else
        (ref as React.MutableRefObject<T | null>).current = node;
    }
  };
}
