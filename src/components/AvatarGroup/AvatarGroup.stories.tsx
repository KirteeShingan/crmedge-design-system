import type { Meta, StoryObj } from "@storybook/react";
import type { CSSProperties } from "react";
import { Avatar } from "../Avatar";
import type { AvatarSize } from "../Avatar";
import { AvatarGroup } from "./AvatarGroup";
import type { AvatarGroupSpacing } from "./AvatarGroup";

const SIZES: AvatarSize[] = ["sm", "md", "lg"];
const SPACINGS: AvatarGroupSpacing[] = ["tight", "default", "loose"];

const PEOPLE = [
  { name: "Hannah Park", src: "https://i.pravatar.cc/96?img=1" },
  { name: "Mateo Alvarez", src: "https://i.pravatar.cc/96?img=12" },
  { name: "Priya Singh", src: undefined },
  { name: "Sam Lee", src: "https://i.pravatar.cc/96?img=33" },
  { name: "Olivia Chen", src: undefined },
  { name: "Yusuf Bello", src: "https://i.pravatar.cc/96?img=53" },
  { name: "Daniela Costa", src: "https://i.pravatar.cc/96?img=21" },
];

const meta: Meta<typeof AvatarGroup> = {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: { type: "inline-radio" }, options: SIZES },
    spacing: { control: { type: "inline-radio" }, options: SPACINGS },
    max: { control: { type: "number", min: 1, max: 10, step: 1 } },
  },
  args: {
    size: "sm",
    spacing: "default",
    max: 4,
  },
  render: (args) => (
    <AvatarGroup {...args}>
      {PEOPLE.map((p) => (
        <Avatar key={p.name} name={p.name} src={p.src} />
      ))}
    </AvatarGroup>
  ),
};

export default meta;

type Story = StoryObj<typeof AvatarGroup>;

/* ---------- Layout helpers ---------- */

const sectionStyle: CSSProperties = {
  fontFamily: "var(--font-family-base)",
  color: "var(--color-text-default)",
  padding: "32px",
  display: "flex",
  flexDirection: "column",
  gap: "32px",
};

const sectionTitleStyle: CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--color-text-tertiary)",
  marginBottom: "12px",
};

const rowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "32px",
  flexWrap: "wrap",
};

const cellLabel: CSSProperties = {
  fontSize: "11px",
  color: "var(--color-text-tertiary)",
};

const Cell = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
    <span style={cellLabel}>{label}</span>
    {children}
  </div>
);

/* ---------- Playground ---------- */

export const Playground: Story = {};

/* ---------- Sizes ---------- */

export const Sizes: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={sectionStyle}>
      {SIZES.map((size) => (
        <div key={size}>
          <div style={sectionTitleStyle}>size = {size}</div>
          <AvatarGroup size={size} max={4}>
            {PEOPLE.map((p) => (
              <Avatar key={p.name} name={p.name} src={p.src} />
            ))}
          </AvatarGroup>
        </div>
      ))}
    </div>
  ),
};

/* ---------- Spacing ---------- */

export const Spacing: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={sectionStyle}>
      {SPACINGS.map((spacing) => (
        <div key={spacing}>
          <div style={sectionTitleStyle}>spacing = {spacing}</div>
          <AvatarGroup spacing={spacing} size="md" max={5}>
            {PEOPLE.map((p) => (
              <Avatar key={p.name} name={p.name} src={p.src} />
            ))}
          </AvatarGroup>
        </div>
      ))}
    </div>
  ),
};

/* ---------- Overflow (+N) ---------- */

export const Overflow: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={sectionStyle}>
      <Cell label="7 children, max=4 → +3 indicator">
        <AvatarGroup size="md" max={4}>
          {PEOPLE.map((p) => (
            <Avatar key={p.name} name={p.name} src={p.src} />
          ))}
        </AvatarGroup>
      </Cell>
      <Cell label="3 children, max=4 → no indicator">
        <AvatarGroup size="md" max={4}>
          {PEOPLE.slice(0, 3).map((p) => (
            <Avatar key={p.name} name={p.name} src={p.src} />
          ))}
        </AvatarGroup>
      </Cell>
      <Cell label="3 children, max=4, total=24 → +21 indicator">
        <AvatarGroup size="md" max={4} total={24}>
          {PEOPLE.slice(0, 3).map((p) => (
            <Avatar key={p.name} name={p.name} src={p.src} />
          ))}
        </AvatarGroup>
      </Cell>
    </div>
  ),
};

/* ---------- Mixed photos + initials + logged out ---------- */

export const MixedSources: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={sectionStyle}>
      <div style={rowStyle}>
        <Cell label="All photos">
          <AvatarGroup size="md" max={5}>
            {PEOPLE.filter((p) => p.src).map((p) => (
              <Avatar key={p.name} name={p.name} src={p.src} />
            ))}
          </AvatarGroup>
        </Cell>
        <Cell label="All initials">
          <AvatarGroup size="md" max={5}>
            {PEOPLE.map((p) => (
              <Avatar key={p.name} name={p.name} />
            ))}
          </AvatarGroup>
        </Cell>
        <Cell label="Mixed (photo + initials + logged out)">
          <AvatarGroup size="md" max={5}>
            <Avatar src={PEOPLE[0]?.src} name={PEOPLE[0]?.name} />
            <Avatar name="Priya" />
            <Avatar loggedIn={false} />
            <Avatar src={PEOPLE[3]?.src} name={PEOPLE[3]?.name} />
            <Avatar name="Olivia" />
          </AvatarGroup>
        </Cell>
      </div>
    </div>
  ),
};
