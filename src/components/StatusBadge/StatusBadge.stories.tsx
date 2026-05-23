import type { Meta, StoryObj } from "@storybook/react";
import { StatusBadge } from "./StatusBadge";

const meta: Meta<typeof StatusBadge> = {
  title: "Components/StatusBadge",
  component: StatusBadge,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Pill-shaped status indicator used in the Playground table to communicate Published / Scheduled / Draft states. Mirrors the Chip / Small / Info variant from Figma node `53:259540`.",
      },
    },
  },
  args: {
    status: "published",
    showIcon: true,
  },
  argTypes: {
    status: {
      control: "select",
      options: ["published", "scheduled", "draft"],
    },
    showIcon: { control: "boolean" },
    children: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof StatusBadge>;

export const Published: Story = {
  args: { status: "published" },
};

export const Scheduled: Story = {
  args: { status: "scheduled" },
};

export const Draft: Story = {
  args: { status: "draft" },
};

export const NoIcon: Story = {
  args: { status: "published", showIcon: false },
};

export const CustomLabel: Story = {
  args: { status: "scheduled", children: "Queued" },
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <StatusBadge status="published" />
      <StatusBadge status="scheduled" />
      <StatusBadge status="draft" />
    </div>
  ),
};
