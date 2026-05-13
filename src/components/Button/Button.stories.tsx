import type { Meta, StoryObj } from "@storybook/react";
import type { CSSProperties, ReactNode } from "react";
import { Button } from "./Button";
import type { ButtonSize, ButtonTone, ButtonVariant } from "./Button";

const VARIANTS: ButtonVariant[] = ["filled", "outlined", "text"];
const TONES: ButtonTone[] = ["primary", "secondary"];
const SIZES: ButtonSize[] = ["small", "medium"];

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

const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M4 10h12m0 0-5-5m5 5-5 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: { type: "inline-radio" },
      options: VARIANTS,
    },
    tone: {
      control: { type: "inline-radio" },
      options: TONES,
    },
    size: {
      control: { type: "inline-radio" },
      options: SIZES,
    },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    variant: "filled",
    tone: "primary",
    size: "medium",
    disabled: false,
    children: "Button",
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

/* ---------- Playground ---------- */

export const Playground: Story = {};

/* ---------- Shared styles ---------- */

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
  gap: "12px",
  flexWrap: "wrap",
};

const columnLabelStyle: CSSProperties = {
  fontSize: "12px",
  color: "var(--color-text-secondary)",
  minWidth: "120px",
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

/* ---------- Variant × Tone matrix ---------- */

export const VariantsAndTones: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={sectionStyle}>
      {TONES.map((tone) => (
        <div key={tone}>
          <div style={sectionTitleStyle}>{tone}</div>
          <div style={rowStyle}>
            {VARIANTS.map((variant) => (
              <Cell key={variant} label={variant}>
                <Button variant={variant} tone={tone}>
                  Button
                </Button>
              </Cell>
            ))}
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
      {TONES.map((tone) => (
        <div key={tone}>
          <div style={sectionTitleStyle}>{tone}</div>
          {VARIANTS.map((variant) => (
            <div
              key={variant}
              style={{ ...rowStyle, marginBottom: "16px" }}
            >
              <span style={columnLabelStyle}>{variant}</span>
              {SIZES.map((size) => (
                <Button
                  key={size}
                  variant={variant}
                  tone={tone}
                  size={size}
                >
                  Button
                </Button>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

/* ---------- States (Enabled / Hover-Pressed / Disabled) ---------- */

export const States: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={sectionStyle}>
      {VARIANTS.map((variant) =>
        TONES.map((tone) => (
          <div key={`${variant}-${tone}`}>
            <div style={sectionTitleStyle}>
              {variant} · {tone}
            </div>
            <div style={rowStyle}>
              <Cell label="enabled">
                <Button variant={variant} tone={tone}>
                  Button
                </Button>
              </Cell>
              <Cell label="hover / pressed (force in devtools)">
                <Button variant={variant} tone={tone}>
                  Button
                </Button>
              </Cell>
              <Cell label="disabled">
                <Button variant={variant} tone={tone} disabled>
                  Button
                </Button>
              </Cell>
            </div>
          </div>
        )),
      )}
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
          {VARIANTS.map((variant) => (
            <Button key={variant} variant={variant} iconLeft={<PlusIcon />}>
              Add item
            </Button>
          ))}
        </div>
      </div>
      <div>
        <div style={sectionTitleStyle}>icon right</div>
        <div style={rowStyle}>
          {VARIANTS.map((variant) => (
            <Button
              key={variant}
              variant={variant}
              iconRight={<ArrowIcon />}
            >
              Continue
            </Button>
          ))}
        </div>
      </div>
      <div>
        <div style={sectionTitleStyle}>both</div>
        <div style={rowStyle}>
          {SIZES.map((size) => (
            <Button
              key={size}
              size={size}
              iconLeft={<PlusIcon />}
              iconRight={<ArrowIcon />}
            >
              Button
            </Button>
          ))}
        </div>
      </div>
    </div>
  ),
};

/* ---------- Disabled ---------- */

export const Disabled: Story = {
  args: { disabled: true },
};
