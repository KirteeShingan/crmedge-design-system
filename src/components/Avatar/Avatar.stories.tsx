import type { Meta, StoryObj } from "@storybook/react";
import type { CSSProperties } from "react";
import { Avatar } from "./Avatar";
import type { AvatarSize } from "./Avatar";

const SIZES: AvatarSize[] = ["sm", "md", "lg"];

/* Public, license-friendly portrait used across stories for the photo state. */
const SAMPLE_PHOTO =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2.4&w=128&h=128&q=80";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: { control: { type: "inline-radio" }, options: SIZES },
    loggedIn: { control: "boolean" },
    selected: { control: "boolean" },
    name: { control: "text" },
    src: { control: "text" },
  },
  args: {
    size: "sm",
    loggedIn: true,
    selected: false,
    name: "Hannah Park",
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

/* ---------- Playground ---------- */

export const Playground: Story = {};

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
  gap: "16px",
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
  <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
    <span style={cellLabel}>{label}</span>
    {children}
  </div>
);

/* ---------- All states: State × LoggedIn × Photo ----------
   Covers the 8 combinations of the Figma master at node 66:280918. */

export const AllStates: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={sectionStyle}>
      {(["Enabled", "Selected"] as const).map((state) => (
        <div key={state}>
          <div style={sectionTitleStyle}>State = {state}</div>
          <div style={rowStyle}>
            <Cell label="Logged in: No · Photo: No">
              <Avatar selected={state === "Selected"} loggedIn={false} />
            </Cell>
            <Cell label="Logged in: No · Photo: Yes">
              <Avatar
                selected={state === "Selected"}
                loggedIn={false}
                src={SAMPLE_PHOTO}
              />
            </Cell>
            <Cell label="Logged in: Yes · Photo: Yes">
              <Avatar
                selected={state === "Selected"}
                loggedIn
                src={SAMPLE_PHOTO}
                name="Hannah Park"
              />
            </Cell>
            <Cell label="Logged in: Yes · Photo: No">
              <Avatar selected={state === "Selected"} loggedIn name="Hannah" />
            </Cell>
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ---------- Sizes ---------- */

export const Sizes: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={sectionStyle}>
      <div>
        <div style={sectionTitleStyle}>Initials (logged in, no photo)</div>
        <div style={rowStyle}>
          {SIZES.map((size) => (
            <Cell key={size} label={size}>
              <Avatar size={size} name="Hannah" />
            </Cell>
          ))}
        </div>
      </div>
      <div>
        <div style={sectionTitleStyle}>Photo</div>
        <div style={rowStyle}>
          {SIZES.map((size) => (
            <Cell key={size} label={size}>
              <Avatar size={size} src={SAMPLE_PHOTO} name="Hannah Park" />
            </Cell>
          ))}
        </div>
      </div>
      <div>
        <div style={sectionTitleStyle}>Logged out</div>
        <div style={rowStyle}>
          {SIZES.map((size) => (
            <Cell key={size} label={size}>
              <Avatar size={size} loggedIn={false} />
            </Cell>
          ))}
        </div>
      </div>
      <div>
        <div style={sectionTitleStyle}>Selected (with ring)</div>
        <div style={rowStyle}>
          {SIZES.map((size) => (
            <Cell key={size} label={size}>
              <Avatar size={size} name="Hannah" selected />
            </Cell>
          ))}
        </div>
      </div>
    </div>
  ),
};

/* ---------- Individual stories ---------- */

export const Initials: Story = {
  args: { name: "Hannah Park" },
};

export const Photo: Story = {
  args: { src: SAMPLE_PHOTO, name: "Hannah Park" },
};

export const LoggedOut: Story = {
  args: { loggedIn: false, name: undefined },
};

export const Selected: Story = {
  args: { name: "Hannah", selected: true },
};

export const FallbackOnBrokenImage: Story = {
  args: {
    src: "https://example.com/this-image-does-not-exist.png",
    name: "Hannah",
  },
};
