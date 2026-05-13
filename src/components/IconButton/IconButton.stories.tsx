import type { Meta, StoryObj } from "@storybook/react";
import type { CSSProperties, ReactNode } from "react";
import { IconButton } from "./IconButton";
import type {
  IconButtonSize,
  IconButtonTone,
  IconButtonVariant,
} from "./IconButton";

const VARIANTS: IconButtonVariant[] = ["filled", "outlined", "text"];
const TONES: IconButtonTone[] = ["primary", "secondary"];
const SIZES: IconButtonSize[] = ["sm", "md", "lg"];

const PlusIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M8 3v10M3 8h10"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3 4h10M6 4V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1m-5 0v9a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="m11 11 3 3"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="m4 4 8 8M12 4l-8 8"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
  </svg>
);

const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
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
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    "aria-label": { control: "text" },
  },
  args: {
    variant: "filled",
    tone: "primary",
    size: "md",
    loading: false,
    disabled: false,
    "aria-label": "Add item",
    icon: <PlusIcon />,
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

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

/* ---------- Variants × Tones ---------- */

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
                <IconButton
                  variant={variant}
                  tone={tone}
                  icon={<PlusIcon />}
                  aria-label="Add item"
                />
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
                <IconButton
                  key={size}
                  variant={variant}
                  tone={tone}
                  size={size}
                  icon={<SearchIcon />}
                  aria-label={`Search (${size})`}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

/* ---------- States ---------- */

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
              <Cell label="default">
                <IconButton
                  variant={variant}
                  tone={tone}
                  icon={<PlusIcon />}
                  aria-label="Add"
                />
              </Cell>
              <Cell label="hover (force via devtools)">
                <IconButton
                  variant={variant}
                  tone={tone}
                  icon={<PlusIcon />}
                  aria-label="Add"
                />
              </Cell>
              <Cell label="focus (tab to it)">
                <IconButton
                  variant={variant}
                  tone={tone}
                  icon={<PlusIcon />}
                  aria-label="Add"
                />
              </Cell>
              <Cell label="disabled">
                <IconButton
                  variant={variant}
                  tone={tone}
                  icon={<PlusIcon />}
                  aria-label="Add"
                  disabled
                />
              </Cell>
              <Cell label="loading">
                <IconButton
                  variant={variant}
                  tone={tone}
                  icon={<PlusIcon />}
                  aria-label="Add"
                  loading
                />
              </Cell>
            </div>
          </div>
        )),
      )}
    </div>
  ),
};

/* ---------- Common icons ---------- */

export const CommonIcons: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={sectionStyle}>
      <div>
        <div style={sectionTitleStyle}>common CRM actions</div>
        <div style={rowStyle}>
          <Cell label="add">
            <IconButton icon={<PlusIcon />} aria-label="Add record" />
          </Cell>
          <Cell label="search">
            <IconButton
              variant="outlined"
              icon={<SearchIcon />}
              aria-label="Search"
            />
          </Cell>
          <Cell label="close">
            <IconButton
              variant="text"
              tone="secondary"
              icon={<CloseIcon />}
              aria-label="Close"
            />
          </Cell>
          <Cell label="delete">
            <IconButton
              variant="text"
              tone="secondary"
              icon={<TrashIcon />}
              aria-label="Delete record"
            />
          </Cell>
        </div>
      </div>
    </div>
  ),
};

/* ---------- Loading ---------- */

export const Loading: Story = {
  args: { loading: true, "aria-label": "Saving" },
};

/* ---------- Disabled ---------- */

export const Disabled: Story = {
  args: { disabled: true, "aria-label": "Add (disabled)" },
};
