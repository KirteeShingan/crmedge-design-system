import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { TooltipTrigger } from "./TooltipTrigger";
import type { TooltipPlacement } from "./Tooltip";
import { Button } from "../Button";

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
      options: [
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "left",
        "left-start",
        "left-end",
        "right",
        "right-start",
        "right-end",
        "none",
      ],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

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

const PLAIN_PLACEMENTS: TooltipPlacement[] = [
  "top-start",
  "top",
  "top-end",
  "left-start",
  "none",
  "right-start",
  "left",
  "none",
  "right",
  "left-end",
  "none",
  "right-end",
  "bottom-start",
  "bottom",
  "bottom-end",
];

export const PlainMatrix: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div
      style={{
        padding: 64,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 48,
        background: "var(--color-background-light-grey)",
        minHeight: "100vh",
      }}
    >
      {PLAIN_PLACEMENTS.map((p, idx) => (
        <div
          key={`${p}-${idx}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 100,
          }}
        >
          {p === "none" ? null : (
            <Tooltip variant="plain" placement={p} body="Tooltip body" />
          )}
        </div>
      ))}
    </div>
  ),
};

const RICH_PLACEMENTS: TooltipPlacement[] = [
  "top-start",
  "top",
  "top-end",
  "left-start",
  "none",
  "right-start",
  "left",
  "none",
  "right",
  "left-end",
  "none",
  "right-end",
  "bottom-start",
  "bottom",
  "bottom-end",
];

export const RichMatrix: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div
      style={{
        padding: 64,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 64,
        background: "var(--color-background-light-grey)",
        minHeight: "100vh",
      }}
    >
      {RICH_PLACEMENTS.map((p, idx) => (
        <div
          key={`${p}-${idx}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 200,
          }}
        >
          {p === "none" ? null : (
            <Tooltip
              variant="rich"
              placement={p}
              heading="Tooltip Heading"
              body="Tooltip body"
              primaryAction={{ label: "Try it Out" }}
              secondaryAction={{ label: "Maybe Later" }}
            />
          )}
        </div>
      ))}
    </div>
  ),
};

export const FigmaMatrix: Story = {
  parameters: { layout: "fullscreen" },
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
            rowGap: 64,
            columnGap: 40,
            justifyContent: "start",
          }}
        >
          {(
            [
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
            ] as TooltipPlacement[]
          ).map((p) => (
            <div
              key={p}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 180,
              }}
            >
              <Tooltip
                variant="rich"
                placement={p}
                heading="Tooltip Heading"
                body="Tooltip body"
                primaryAction={{ label: "Try it Out" }}
                secondaryAction={{ label: "Maybe Later" }}
              />
            </div>
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
            gridTemplateColumns: "repeat(3, 160px)",
            rowGap: 48,
            columnGap: 40,
            justifyContent: "start",
          }}
        >
          {(
            [
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
            ] as TooltipPlacement[]
          ).map((p) => (
            <div
              key={p}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 72,
              }}
            >
              <Tooltip variant="plain" placement={p} body="Tooltip body" />
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
};

export const InteractiveTrigger: Story = {
  parameters: { layout: "centered" },
  render: () => (
    <div style={{ display: "flex", gap: 64, padding: 80 }}>
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

export const ControlledRichTrigger: Story = {
  parameters: { layout: "centered" },
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ padding: 80 }}>
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
