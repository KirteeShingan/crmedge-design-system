import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: { layout: "padded" },
  args: { size: "md" },
  argTypes: {
    size: { control: "select", options: ["sm", "md"] },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    label: { control: "text" },
    helper: { control: "text" },
    error: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: { label: "Accept terms" },
};

export const Checked: Story = {
  args: { label: "Accept terms", defaultChecked: true },
};

export const Indeterminate: Story = {
  args: { label: "Select all", indeterminate: true },
};

export const WithHelper: Story = {
  args: {
    label: "Subscribe to newsletter",
    helper: "Get weekly updates straight to your inbox.",
  },
};

export const WithError: Story = {
  args: {
    label: "Accept terms",
    error: "You must accept the terms to continue.",
    required: true,
  },
};

export const Disabled: Story = {
  args: { label: "Disabled option", disabled: true },
};

export const NoLabel: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Box-only usage for table cells or compact UIs. The component still renders an accessible hidden input.",
      },
    },
  },
};

export const AllStatesMedium: Story = {
  args: { size: "md" },
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={{ padding: 32, display: "grid", gap: 24 }}>
      <Section title="States">
        <Checkbox label="Off" size="md" />
        <Checkbox label="On" size="md" defaultChecked />
        <Checkbox label="Indeterminate" size="md" indeterminate />
      </Section>
      <Section title="Disabled">
        <Checkbox label="Off" size="md" disabled />
        <Checkbox label="On" size="md" disabled defaultChecked />
        <Checkbox label="Indeterminate" size="md" disabled indeterminate />
      </Section>
      <Section title="Error">
        <Checkbox label="Off" size="md" error="Required field" />
        <Checkbox label="On" size="md" defaultChecked error="Invalid choice" />
        <Checkbox label="Indeterminate" size="md" indeterminate error="Mixed state" />
      </Section>
      <Section title="With helper text">
        <Checkbox
          label="Marketing emails"
          size="md"
          helper="Tips, product updates, and the occasional announcement."
        />
      </Section>
    </div>
  ),
};

export const AllStatesSmall: Story = {
  args: { size: "sm" },
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={{ padding: 32, display: "grid", gap: 24 }}>
      <Section title="States">
        <Checkbox label="Off" size="sm" />
        <Checkbox label="On" size="sm" defaultChecked />
        <Checkbox label="Indeterminate" size="sm" indeterminate />
      </Section>
      <Section title="Disabled">
        <Checkbox label="Off" size="sm" disabled />
        <Checkbox label="On" size="sm" disabled defaultChecked />
        <Checkbox label="Indeterminate" size="sm" disabled indeterminate />
      </Section>
      <Section title="Error">
        <Checkbox label="Off" size="sm" error="Required field" />
        <Checkbox label="On" size="sm" defaultChecked error="Invalid choice" />
        <Checkbox label="Indeterminate" size="sm" indeterminate error="Mixed state" />
      </Section>
      <Section title="With helper text">
        <Checkbox
          label="Marketing emails"
          size="sm"
          helper="Tips, product updates, and the occasional announcement."
        />
      </Section>
    </div>
  ),
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4
        style={{
          margin: "0 0 12px",
          fontSize: 12,
          textTransform: "uppercase",
          letterSpacing: 0.5,
          color: "var(--color-text-secondary)",
        }}
      >
        {title}
      </h4>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        {children}
      </div>
    </div>
  );
}

export const SelectAll: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Tri-state parent: the 'Select all' checkbox derives its state from its children — checked when all are checked, indeterminate when some are checked, unchecked otherwise. Clicking it toggles all children together.",
      },
    },
  },
  render: () => {
    const [items, setItems] = useState([
      { id: 1, label: "Send weekly digest", checked: true },
      { id: 2, label: "Send product updates", checked: false },
      { id: 3, label: "Send security alerts", checked: false },
    ]);

    const checkedCount = items.filter((i) => i.checked).length;
    const allChecked = checkedCount === items.length;
    const someChecked = checkedCount > 0 && !allChecked;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          maxWidth: 360,
        }}
      >
        <Checkbox
          label="Select all"
          checked={allChecked}
          indeterminate={someChecked}
          onChange={(e) => {
            const next = e.target.checked;
            setItems(items.map((i) => ({ ...i, checked: next })));
          }}
        />
        <div
          style={{
            marginLeft: 32,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {items.map((item) => (
            <Checkbox
              key={item.id}
              label={item.label}
              checked={item.checked}
              onChange={(e) =>
                setItems(
                  items.map((i) =>
                    i.id === item.id ? { ...i, checked: e.target.checked } : i,
                  ),
                )
              }
            />
          ))}
        </div>
      </div>
    );
  },
};
