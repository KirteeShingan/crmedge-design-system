import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Search } from "./Search";

const meta: Meta<typeof Search> = {
  title: "Components/Search",
  component: Search,
  parameters: { layout: "padded" },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md"] },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    size: "md",
    disabled: false,
    fullWidth: false,
    placeholder: "Search",
  },
};

export default meta;
type Story = StoryObj<typeof Search>;

export const Playground: Story = {
  render: (args) => <Search {...args} />,
};

export const Empty: Story = {
  render: (args) => <Search {...args} />,
};

export const Filled: Story = {
  render: (args) => <Search {...args} defaultValue="Search" />,
};

export const Disabled: Story = {
  render: (args) => <Search {...args} disabled />,
};

export const SmallSize: Story = {
  name: "Size — Small",
  render: (args) => <Search {...args} size="sm" />,
};

export const FullWidth: Story = {
  render: (args) => (
    <div style={{ width: 480 }}>
      <Search {...args} fullWidth />
    </div>
  ),
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Search
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClear={() => setValue("")}
        />
        <div style={{ font: "12px/1.4 monospace", color: "#636467" }}>
          value: {JSON.stringify(value)}
        </div>
      </div>
    );
  },
};

export const AllStates: Story = {
  parameters: { layout: "centered" },
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "16px 24px",
        alignItems: "center",
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: 12,
        color: "#636467",
      }}
    >
      <div style={{ gridColumn: "1 / -1", fontWeight: 600, marginTop: 8 }}>
        Medium
      </div>
      <div>Empty</div>
      <Search size="md" />
      <div>Filled</div>
      <Search size="md" defaultValue="Search" />
      <div>Active (focus me)</div>
      <Search size="md" defaultValue="Search" autoFocus />
      <div>Disabled</div>
      <Search size="md" disabled />

      <div style={{ gridColumn: "1 / -1", fontWeight: 600, marginTop: 16 }}>
        Small
      </div>
      <div>Empty</div>
      <Search size="sm" />
      <div>Filled</div>
      <Search size="sm" defaultValue="Search" />
      <div>Active (focus me)</div>
      <Search size="sm" defaultValue="Search" />
      <div>Disabled</div>
      <Search size="sm" disabled />
    </div>
  ),
};
