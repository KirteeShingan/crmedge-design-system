import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { CSSProperties, ReactNode } from "react";
import { TextField } from "./TextField";
import type { TextFieldSize } from "./TextField";

const SIZES: TextFieldSize[] = ["sm", "md", "lg"];

const SearchIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle
      cx="7"
      cy="7"
      r="5"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="m11 11 3 3"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect
      x="2"
      y="3.5"
      width="12"
      height="9"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="m3 5 5 4 5-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M1.5 8s2.5-4.5 6.5-4.5S14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle
      cx="8"
      cy="8"
      r="2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: { type: "inline-radio" },
      options: SIZES,
    },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    required: { control: "boolean" },
    fullWidth: { control: "boolean" },
    label: { control: "text" },
    helper: { control: "text" },
    error: { control: "text" },
    placeholder: { control: "text" },
  },
  args: {
    size: "md",
    label: "Email address",
    placeholder: "name@company.com",
    helper: "We'll never share your email.",
    disabled: false,
    readOnly: false,
    required: false,
    fullWidth: false,
  },
};

export default meta;

type Story = StoryObj<typeof TextField>;

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
  maxWidth: "920px",
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
  alignItems: "flex-start",
  gap: "16px",
  flexWrap: "wrap",
};

const Cell = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
    <span style={{ fontSize: "11px", color: "var(--color-text-tertiary)" }}>
      {label}
    </span>
    {children}
  </div>
);

/* ---------- Sizes ---------- */

export const Sizes: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={sectionStyle}>
      <div>
        <div style={sectionTitleStyle}>sizes</div>
        <div style={rowStyle}>
          {SIZES.map((size) => (
            <Cell key={size} label={size}>
              <TextField
                size={size}
                label="Email"
                placeholder="name@company.com"
              />
            </Cell>
          ))}
        </div>
      </div>
    </div>
  ),
};

/* ---------- States ---------- */

export const States: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={sectionStyle}>
      <div>
        <div style={sectionTitleStyle}>states</div>
        <div style={rowStyle}>
          <Cell label="default">
            <TextField label="Email" placeholder="name@company.com" />
          </Cell>
          <Cell label="filled">
            <TextField
              label="Email"
              defaultValue="kirtee@crmedge.io"
            />
          </Cell>
          <Cell label="focus (tab into it)">
            <TextField label="Email" placeholder="name@company.com" />
          </Cell>
          <Cell label="disabled">
            <TextField
              label="Email"
              defaultValue="kirtee@crmedge.io"
              disabled
            />
          </Cell>
          <Cell label="readonly">
            <TextField
              label="Email"
              defaultValue="kirtee@crmedge.io"
              readOnly
            />
          </Cell>
          <Cell label="error">
            <TextField
              label="Email"
              defaultValue="not-an-email"
              error="Enter a valid email address."
            />
          </Cell>
        </div>
      </div>
    </div>
  ),
};

/* ---------- With icons ---------- */

export const WithIcons: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={sectionStyle}>
      <div>
        <div style={sectionTitleStyle}>icon left</div>
        <div style={rowStyle}>
          {SIZES.map((size) => (
            <Cell key={size} label={size}>
              <TextField
                size={size}
                placeholder="Search records..."
                iconLeft={<SearchIcon />}
              />
            </Cell>
          ))}
        </div>
      </div>
      <div>
        <div style={sectionTitleStyle}>icon right</div>
        <div style={rowStyle}>
          {SIZES.map((size) => (
            <Cell key={size} label={size}>
              <TextField
                size={size}
                type="password"
                placeholder="Password"
                iconRight={<EyeIcon />}
              />
            </Cell>
          ))}
        </div>
      </div>
      <div>
        <div style={sectionTitleStyle}>both</div>
        <div style={rowStyle}>
          <TextField
            label="Email"
            placeholder="name@company.com"
            iconLeft={<MailIcon />}
            iconRight={<SearchIcon />}
          />
        </div>
      </div>
    </div>
  ),
};

/* ---------- With label and helper ---------- */

export const WithLabelAndHelper: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={sectionStyle}>
      <div style={rowStyle}>
        <TextField
          label="Company name"
          helper="As it appears on invoices."
          placeholder="Acme Inc."
          required
        />
        <TextField
          label="Phone number"
          helper="Include country code."
          placeholder="+1 555 123 4567"
        />
        <TextField
          label="Read-only field"
          helper="This value cannot be edited."
          defaultValue="ACC-00214"
          readOnly
        />
      </div>
    </div>
  ),
};

/* ---------- Error state ---------- */

export const ErrorState: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={sectionStyle}>
      <div style={rowStyle}>
        <TextField
          label="Email"
          defaultValue="not-an-email"
          error="Enter a valid email address."
        />
        <TextField
          label="Phone number"
          defaultValue="abc"
          error="Phone number must contain digits only."
          iconLeft={<MailIcon />}
        />
        <TextField
          label="Required field"
          required
          error="This field is required."
        />
      </div>
    </div>
  ),
};

/* ---------- Controlled example ---------- */

const ControlledExample = () => {
  const [value, setValue] = useState("");
  const error =
    value.length > 0 && !value.includes("@")
      ? "Enter a valid email address."
      : undefined;
  return (
    <TextField
      label="Email"
      placeholder="name@company.com"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      error={error}
      helper={error ? undefined : "Live-validated while you type."}
      iconLeft={<MailIcon />}
    />
  );
};

export const Controlled: Story = {
  parameters: { layout: "centered" },
  render: () => <ControlledExample />,
};
