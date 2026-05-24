import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { TooltipTrigger } from "./TooltipTrigger";
import type { TooltipPlacement } from "./Tooltip";
import { Button } from "../Button";

const ALL_PLACEMENTS: TooltipPlacement[] = [
  "top-start",
  "top",
  "top-end",
  "left-start",
  "left",
  "right-start",
  "left-end",
  "right",
  "right-end",
  "bottom-start",
  "bottom",
  "bottom-end",
];

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
  args: {
    body: "Tooltip body",
    variant: "plain",
    placement: "top",
    showClose: true,
  },
  argTypes: {
    variant: { control: "radio", options: ["plain", "rich"] },
    placement: {
      control: "select",
      options: [...ALL_PLACEMENTS, "none"],
    },
    heading: { control: "text" },
    showClose: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

/**
 * Args-driven playground. Change `placement` in the Controls panel — the arrow
 * flips to point back at the conceptual trigger.
 *
 * Placement convention follows floating-ui: `placement="top"` means the tooltip
 * sits ABOVE its trigger, so the arrow renders on the BOTTOM edge of the card
 * pointing DOWN. (This is the inverse of Figma's "Point Direction" naming.)
 */
export const Playground: Story = {
  args: {
    body: "Tooltip body",
  },
};

export const PlainTooltip: Story = {
  args: { variant: "plain", body: "Tooltip body", placement: "top" },
};

export const RichTooltip: Story = {
  args: {
    variant: "rich",
    heading: "Tooltip Heading",
    body: "Tooltip body",
    placement: "top",
    primaryAction: { label: "Try it Out" },
    secondaryAction: { label: "Maybe Later" },
  },
};

/**
 * All 12 directional placements at once. Each cell shows the placement value
 * and the tooltip — the arrow points DOWN/UP/LEFT/RIGHT toward where the
 * conceptual trigger would sit.
 *
 * Controls panel is disabled — this is a fixed showcase, not args-driven.
 */
export const AllStates: Story = {
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        padding: 48,
        background: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: 64,
      }}
    >
      <section>
        <h2
          style={{
            font: "600 18px/24px Inter, sans-serif",
            margin: "0 0 32px",
          }}
        >
          Rich tooltip
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 350px)",
            rowGap: 80,
            columnGap: 40,
            justifyContent: "start",
          }}
        >
          {ALL_PLACEMENTS.map((p) => (
            <PlacementCell key={p} placement={p}>
              <Tooltip
                variant="rich"
                placement={p}
                heading="Tooltip Heading"
                body="Tooltip body"
                primaryAction={{ label: "Try it Out" }}
                secondaryAction={{ label: "Maybe Later" }}
              />
            </PlacementCell>
          ))}
        </div>
      </section>

      <section>
        <h2
          style={{
            font: "600 18px/24px Inter, sans-serif",
            margin: "0 0 32px",
          }}
        >
          Plain tooltip
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 200px)",
            rowGap: 56,
            columnGap: 40,
            justifyContent: "start",
          }}
        >
          {ALL_PLACEMENTS.map((p) => (
            <PlacementCell key={p} placement={p}>
              <Tooltip variant="plain" placement={p} body="Tooltip body" />
            </PlacementCell>
          ))}
        </div>
      </section>
    </div>
  ),
};

function PlacementCell({
  placement,
  children,
}: {
  placement: TooltipPlacement;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 8,
      }}
    >
      <code
        style={{
          font: "500 12px/16px ui-monospace, SFMono-Regular, monospace",
          color: "var(--color-text-tertiary)",
        }}
      >
        {placement}
      </code>
      {children}
    </div>
  );
}

/**
 * Interactive triggers using TooltipTrigger + floating-ui.
 *
 * Controls panel is disabled — this story renders fixed examples that don't
 * thread Storybook args through. Use the `Playground` story to experiment
 * with props via controls.
 */
export const InteractiveTrigger: Story = {
  parameters: {
    layout: "centered",
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 80,
        padding: 120,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <TooltipTrigger
        variant="plain"
        placement="top"
        body="Saves your draft"
        showClose={false}
      >
        <Button>Hover or focus me</Button>
      </TooltipTrigger>

      <TooltipTrigger
        variant="rich"
        placement="bottom"
        trigger="click"
        heading="Tooltip Heading"
        body="Tooltip body"
        primaryAction={{ label: "Try it Out" }}
        secondaryAction={{ label: "Maybe Later" }}
      >
        <Button variant="secondary">Click me</Button>
      </TooltipTrigger>
    </div>
  ),
};

/**
 * Controlled trigger — `open` is driven by parent state. Controls panel
 * disabled (story uses fixed render).
 */
export const ControlledRichTrigger: Story = {
  parameters: {
    layout: "centered",
    controls: { disable: true },
  },
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ padding: 120 }}>
        <TooltipTrigger
          variant="rich"
          placement="right"
          trigger="manual"
          open={open}
          onOpenChange={setOpen}
          heading="Welcome aboard"
          body="This rich tooltip is controlled — close it via the X."
          primaryAction={{ label: "Try it Out", onClick: () => setOpen(false) }}
          secondaryAction={{
            label: "Maybe Later",
            onClick: () => setOpen(false),
          }}
        >
          <Button>Anchor</Button>
        </TooltipTrigger>
      </div>
    );
  },
};
