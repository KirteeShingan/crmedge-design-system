import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SegmentedButton } from "./SegmentedButton";
import type {
  SegmentedButtonSize,
  SegmentedButtonVariant,
} from "./SegmentedButton";

const VARIANTS: SegmentedButtonVariant[] = ["secondary", "neutral"];
const SIZES: SegmentedButtonSize[] = ["small", "medium"];

const PlusIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M10 4v12M4 10h12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const ListIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M4 6h12M4 10h12M4 14h12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const GridIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M4 4h5v5H4zM11 4h5v5h-5zM4 11h5v5H4zM11 11h5v5h-5z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const TWO_SEG = [
  { value: "list", label: "List" },
  { value: "grid", label: "Grid" },
];

const THREE_SEG = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

const meta: Meta<typeof SegmentedButton> = {
  title: "Components/Button/SegmentedButton",
  component: SegmentedButton,
  parameters: { layout: "padded" },
  args: {
    variant: "secondary",
    size: "medium",
    segments: THREE_SEG,
    defaultValue: "week",
    ariaLabel: "View",
  },
  argTypes: {
    variant: { control: "inline-radio", options: VARIANTS },
    size: { control: "inline-radio", options: SIZES },
    disabled: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof SegmentedButton>;

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 24 }}>
      {VARIANTS.map((variant) => (
        <section key={variant} style={{ display: "grid", gap: 12 }}>
          <h3
            style={{
              margin: 0,
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              color: "var(--color-text-secondary)",
            }}
          >
            {variant}
          </h3>
          {SIZES.map((size) => (
            <div
              key={size}
              style={{ display: "flex", gap: 16, alignItems: "center" }}
            >
              <SegmentedButton
                variant={variant}
                size={size}
                segments={TWO_SEG}
                defaultValue="list"
                ariaLabel={`${variant} ${size} 2-segment`}
              />
              <SegmentedButton
                variant={variant}
                size={size}
                segments={THREE_SEG}
                defaultValue="week"
                ariaLabel={`${variant} ${size} 3-segment`}
              />
            </div>
          ))}
        </section>
      ))}
    </div>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <SegmentedButton
        variant="secondary"
        segments={[
          { value: "list", icon: <ListIcon />, ariaLabel: "List view" },
          { value: "grid", icon: <GridIcon />, ariaLabel: "Grid view" },
        ]}
        defaultValue="list"
        ariaLabel="View mode"
      />
      <SegmentedButton
        variant="neutral"
        segments={[
          { value: "list", icon: <ListIcon />, ariaLabel: "List view" },
          { value: "grid", icon: <GridIcon />, ariaLabel: "Grid view" },
          { value: "add", icon: <PlusIcon />, ariaLabel: "Add" },
        ]}
        defaultValue="grid"
        ariaLabel="View mode"
      />
    </div>
  ),
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [value, setValue] = useState("week");
    return (
      <div style={{ display: "grid", gap: 12 }}>
        <SegmentedButton
          variant="secondary"
          segments={THREE_SEG}
          value={value}
          onChange={setValue}
          ariaLabel="Date range"
        />
        <p style={{ margin: 0, color: "var(--color-text-secondary)" }}>
          Selected: <strong>{value}</strong>
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};
