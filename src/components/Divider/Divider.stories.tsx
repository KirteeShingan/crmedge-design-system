import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "1px separator line. Used between rows in the Playground table and anywhere else two content blocks need a soft visual break. Mirrors the divider in Figma's Playground frame (instance `68:289229`, master `68:283361`).",
      },
    },
  },
  args: {
    orientation: "horizontal",
    variant: "subtle",
  },
  argTypes: {
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
    variant: { control: "radio", options: ["subtle", "strong"] },
  },
};
export default meta;

type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  args: { orientation: "horizontal", variant: "subtle" },
  render: (args) => (
    <div style={{ width: 480 }}>
      <Divider {...args} />
    </div>
  ),
};

export const Vertical: Story = {
  args: { orientation: "vertical", variant: "subtle" },
  render: (args) => (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        height: 48,
        gap: 16,
        color: "var(--color-text-secondary)",
      }}
    >
      <span>Left</span>
      <Divider {...args} />
      <span>Right</span>
    </div>
  ),
};

export const StrongVariant: Story = {
  args: { orientation: "horizontal", variant: "strong" },
  render: (args) => (
    <div style={{ width: 480 }}>
      <Divider {...args} />
    </div>
  ),
};

export const BetweenContent: Story = {
  render: () => (
    <div style={{ width: 480, fontFamily: "var(--font-family-base)" }}>
      <p style={{ margin: "0 0 12px" }}>First section of content.</p>
      <Divider />
      <p style={{ margin: "12px 0" }}>Second section, separated by a divider.</p>
      <Divider />
      <p style={{ margin: "12px 0 0" }}>Third section.</p>
    </div>
  ),
};
