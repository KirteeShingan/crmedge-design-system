import type { Meta, StoryObj } from "@storybook/react";
import { StatusBadge } from "./StatusBadge";

/* ---------- demo icons ----------
 * Lightweight inline-SVG helpers used in these stories to demonstrate
 * the icon slot. Callers can pass any 16×16 ReactNode; using
 * `stroke="currentColor"` means the icon inherits the badge text color.
 */
const CheckIcon = () => (
  <svg viewBox="0 0 16 16" focusable="false" aria-hidden="true">
    <path
      d="M3.5 8.5L6.5 11.5L12.5 5.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 16 16" focusable="false" aria-hidden="true">
    <circle
      cx="8"
      cy="8"
      r="5.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M8 5V8L10 9.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EditIcon = () => (
  <svg viewBox="0 0 16 16" focusable="false" aria-hidden="true">
    <path
      d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TagIcon = () => (
  <svg viewBox="0 0 16 16" focusable="false" aria-hidden="true">
    <path
      d="M2.5 8.5L7.5 13.5L13.5 7.5V2.5H8.5L2.5 8.5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="10.5" cy="5.5" r="0.75" fill="currentColor" />
  </svg>
);

const meta: Meta<typeof StatusBadge> = {
  title: "Components/StatusBadge",
  component: StatusBadge,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Pill-shaped indicator with 4 color variants (Neutral / Yellow / Blue / Green). Each color uses its ramp's 50 shade for bg and 900 shade for text + icon. Mirrors the Chip / Small / Info variant from Figma node `53:259540`.",
      },
    },
  },
  args: {
    color: "green",
    children: "Published",
  },
  argTypes: {
    color: {
      control: "select",
      options: ["neutral", "yellow", "blue", "green"],
    },
    children: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof StatusBadge>;

export const Green: Story = {
  args: { color: "green", children: "Published", icon: <CheckIcon /> },
};

export const Yellow: Story = {
  args: { color: "yellow", children: "Scheduled", icon: <ClockIcon /> },
};

export const Blue: Story = {
  args: { color: "blue", children: "Draft", icon: <EditIcon /> },
};

export const Neutral: Story = {
  args: { color: "neutral", children: "Archived", icon: <TagIcon /> },
};

export const NoIcon: Story = {
  args: { color: "green", children: "Published" },
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <StatusBadge color="neutral" icon={<TagIcon />}>
        Archived
      </StatusBadge>
      <StatusBadge color="yellow" icon={<ClockIcon />}>
        Scheduled
      </StatusBadge>
      <StatusBadge color="blue" icon={<EditIcon />}>
        Draft
      </StatusBadge>
      <StatusBadge color="green" icon={<CheckIcon />}>
        Published
      </StatusBadge>
    </div>
  ),
};

export const PlaygroundTableStatuses: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The 3 statuses used in the Playground table: Published (green + check), Scheduled (yellow + clock), Draft (blue + pencil).",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <StatusBadge color="green" icon={<CheckIcon />}>
        Published
      </StatusBadge>
      <StatusBadge color="yellow" icon={<ClockIcon />}>
        Scheduled
      </StatusBadge>
      <StatusBadge color="blue" icon={<EditIcon />}>
        Draft
      </StatusBadge>
    </div>
  ),
};
