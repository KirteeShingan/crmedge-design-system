import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button/Button";
import { IconButton } from "../IconButton/IconButton";
import { StatusBadge } from "../StatusBadge/StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableCol,
  TableColGroup,
  TableContainer,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "./Table";

/* ---------- demo icons (mirrors StatusBadge stories) ---------- */
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

const MoreIcon = () => (
  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
    <circle cx="12" cy="5" r="1.5" fill="currentColor" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <circle cx="12" cy="19" r="1.5" fill="currentColor" />
  </svg>
);

/* ---------- status badge mapping (Playground convention) ---------- */
type PlaygroundStatus = "Published" | "Scheduled" | "Draft";

const STATUS_BADGE: Record<
  PlaygroundStatus,
  { color: "green" | "yellow" | "blue"; icon: JSX.Element }
> = {
  Published: { color: "green", icon: <CheckIcon /> },
  Scheduled: { color: "yellow", icon: <ClockIcon /> },
  Draft: { color: "blue", icon: <EditIcon /> },
};

/* ---------- meta ---------- */
const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Compound primitives for tabular data. Mirrors the Figma `Table / Cell` (Type variants Text · Badge · Date · Buttons), `Table / HeaderCell`, and `Table / Row` (Type × State) components on page `🗄️ Table (Fixed)`. Cells take arbitrary children; the `type` prop is a semantic intent signal, not a content restriction.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Table>;

/* ---------- 01 — Default ---------- */
/**
 * Minimal example: 1 header + 3 body rows × 4 columns, all default cell type.
 */
export const Default: Story = {
  render: () => (
    <Table>
      <TableHead>
        <TableRow header>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Role</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Joined</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Krisha M.</TableCell>
          <TableCell>Editor</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Oct 20, 2023</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>Author</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Oct 29, 2023</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jayesh R.</TableCell>
          <TableCell>Reviewer</TableCell>
          <TableCell>Invited</TableCell>
          <TableCell>Oct 20, 2023</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/* ---------- 02 — CellTypes ---------- */
/**
 * Showcases the 4 cell type variants side-by-side. Type drives intent +
 * default styling (paddingY=10 for Buttons). Alignment defaults to `start`
 * for all — override per-cell via the `align` prop.
 */
export const CellTypes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Type=Text · Type=Badge · Type=Date · Type=Buttons. All four default to align=start. Override at use-site (commonly `align='end'` for action columns).",
      },
    },
  },
  render: () => (
    <Table>
      <TableHead>
        <TableRow header>
          <TableHeaderCell>Type=Text</TableHeaderCell>
          <TableHeaderCell>Type=Badge</TableHeaderCell>
          <TableHeaderCell>Type=Date</TableHeaderCell>
          <TableHeaderCell>Type=Buttons</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell type="text">Cell content</TableCell>
          <TableCell type="badge">
            <StatusBadge color="green" icon={<CheckIcon />}>
              Published
            </StatusBadge>
          </TableCell>
          <TableCell type="date">Oct 23, 2023</TableCell>
          <TableCell type="buttons">
            <span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
              <Button variant="secondary" size="small">
                Secondary
              </Button>
              <Button variant="neutral" size="small">
                Neutral
              </Button>
              <IconButton
                icon={<MoreIcon />}
                aria-label="More"
                variant="text"
                size="sm"
              />
            </span>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/* ---------- 03 — RowStates ---------- */
/**
 * Default · Selected · Disabled body rows. Hover state is :hover only —
 * see the live story canvas. Header rows have their own chrome and skip
 * hover entirely.
 */
export const RowStates: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Row chrome states: Default · Selected (orange-50 tint) · Disabled (opacity 0.5, no pointer events). Hover applies on body rows only via :hover. Selected sets `aria-selected='true'`; Disabled sets `aria-disabled='true'`.",
      },
    },
  },
  render: () => (
    <Table>
      <TableHead>
        <TableRow header>
          <TableHeaderCell>State</TableHeaderCell>
          <TableHeaderCell>Title</TableHeaderCell>
          <TableHeaderCell>Type</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Default</TableCell>
          <TableCell>Hover me to see the hover affordance</TableCell>
          <TableCell>Blog</TableCell>
        </TableRow>
        <TableRow selected>
          <TableCell>Selected</TableCell>
          <TableCell>This row is selected (aria-selected=true)</TableCell>
          <TableCell>News</TableCell>
        </TableRow>
        <TableRow disabled>
          <TableCell>Disabled</TableCell>
          <TableCell>This row is disabled (aria-disabled=true)</TableCell>
          <TableCell>Web Experience</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/* ---------- 04 — Alignment ---------- */
export const Alignment: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Per-cell `align` override: start (default) · center · end · numeric. `numeric` is sugar for `end` with `font-variant-numeric: tabular-nums` so digits visually align in columns.",
      },
    },
  },
  render: () => (
    <Table>
      <TableHead>
        <TableRow header>
          <TableHeaderCell align="start">start</TableHeaderCell>
          <TableHeaderCell align="center">center</TableHeaderCell>
          <TableHeaderCell align="end">end</TableHeaderCell>
          <TableHeaderCell align="numeric">numeric</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell align="start">Left aligned</TableCell>
          <TableCell align="center">Centered</TableCell>
          <TableCell align="end">Right aligned</TableCell>
          <TableCell align="numeric">1,234,567</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="start">Another</TableCell>
          <TableCell align="center">Another</TableCell>
          <TableCell align="end">Another</TableCell>
          <TableCell align="numeric">42</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/* ---------- 05 — PlaygroundAssembly ---------- */
/**
 * Mirrors the Figma reference assembly on `🗄️ Table (Fixed)`. 5 columns,
 * 1 header + 4 body rows, alternating row states, mixed cell types
 * (Text · Badge · Text · Date · Text|Buttons).
 */
export const PlaygroundAssembly: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Mirror of the Figma reference assembly: 5 columns, mixed cell types, alternating row states.",
      },
    },
  },
  render: () => {
    const rows: Array<{
      title: string;
      status: PlaygroundStatus;
      type: string;
      date: string;
      by: string;
      state?: "selected" | "disabled";
      buttonsCol?: boolean;
    }> = [
      {
        title: "Tesla fine print says it may sue Cybertruck resellers...",
        status: "Published",
        type: "Blog",
        date: "Oct 20, 2023",
        by: "Krisha M.",
      },
      {
        title: "Forget The New MacBook Pro, Apple Has Something Better",
        status: "Published",
        type: "News",
        date: "Oct 29, 2023",
        by: "John Doe",
      },
      {
        title: "iPad mini 7 Experience",
        status: "Scheduled",
        type: "Web Experience",
        date: "Oct 20, 2023",
        by: "Jayesh Red",
        state: "selected",
        buttonsCol: true,
      },
      {
        title: "Honouring Those Who Served: Franchises that Support...",
        status: "Draft",
        type: "Blog",
        date: "Oct 20, 2023",
        by: "John Doe",
      },
    ];

    return (
      <Table>
        <TableHead>
          <TableRow header>
            <TableHeaderCell>Content title</TableHeaderCell>
            <TableHeaderCell>Content Status</TableHeaderCell>
            <TableHeaderCell>Content Type</TableHeaderCell>
            <TableHeaderCell>Updated Date</TableHeaderCell>
            <TableHeaderCell>Updated By</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r, i) => {
            const badge = STATUS_BADGE[r.status];
            return (
              <TableRow key={i} selected={r.state === "selected"}>
                <TableCell type="text">{r.title}</TableCell>
                <TableCell type="badge">
                  <StatusBadge color={badge.color} icon={badge.icon}>
                    {r.status}
                  </StatusBadge>
                </TableCell>
                <TableCell type="text">{r.type}</TableCell>
                <TableCell type="date">{r.date}</TableCell>
                {r.buttonsCol ? (
                  <TableCell type="buttons" align="end">
                    <span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                      <Button variant="secondary" size="small">
                        Edit
                      </Button>
                      <Button variant="neutral" size="small">
                        Duplicate
                      </Button>
                      <IconButton
                        icon={<MoreIcon />}
                        aria-label="More actions"
                        variant="text"
                        size="sm"
                      />
                    </span>
                  </TableCell>
                ) : (
                  <TableCell type="text">{r.by}</TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  },
};

/* ---------- 06 — Density ---------- */
/**
 * Three density levels side-by-side. Density is a Table prop and
 * cascades to cells/header cells via CSS custom properties.
 */
export const Density: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Density controls cell + header-cell paddings. `sm` (6/12 cell, 4/12 header), `md` default (12/16 cell, 8/16 header), `lg` (16/20 cell, 12/20 header). `buttons` cells stay 2px tighter at every density.",
      },
    },
  },
  render: () => {
    const sample = (
      <>
        <TableHead>
          <TableRow header>
            <TableHeaderCell>Title</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Tesla cybertruck resellers</TableCell>
            <TableCell type="badge">
              <StatusBadge color="green" icon={<CheckIcon />}>
                Published
              </StatusBadge>
            </TableCell>
            <TableCell type="date">Oct 20, 2023</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>iPad mini 7 experience</TableCell>
            <TableCell type="badge">
              <StatusBadge color="yellow" icon={<ClockIcon />}>
                Scheduled
              </StatusBadge>
            </TableCell>
            <TableCell type="date">Oct 23, 2023</TableCell>
          </TableRow>
        </TableBody>
      </>
    );
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <div>
          <p style={{ margin: "0 0 8px", fontFamily: "var(--font-family-base)", fontSize: 12, color: "var(--color-text-secondary)" }}>
            density=&quot;sm&quot;
          </p>
          <Table density="sm">{sample}</Table>
        </div>
        <div>
          <p style={{ margin: "0 0 8px", fontFamily: "var(--font-family-base)", fontSize: 12, color: "var(--color-text-secondary)" }}>
            density=&quot;md&quot; (default)
          </p>
          <Table density="md">{sample}</Table>
        </div>
        <div>
          <p style={{ margin: "0 0 8px", fontFamily: "var(--font-family-base)", fontSize: 12, color: "var(--color-text-secondary)" }}>
            density=&quot;lg&quot;
          </p>
          <Table density="lg">{sample}</Table>
        </div>
      </div>
    );
  },
};

/* ---------- 07 — StickyHeader ---------- */
/**
 * Long table wrapped in a TableContainer with maxHeight. Header pins to
 * the top of the container while body rows scroll underneath. Try it.
 */
export const StickyHeader: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`<TableContainer maxHeight={320}><Table stickyHeader>` — header pins inside the container's scroll context. Without a maxHeight on the container (or another scrolling ancestor), the header pins to the viewport instead.",
      },
    },
  },
  render: () => {
    const titles = [
      "Tesla cybertruck resellers",
      "Apple MacBook Pro M4",
      "iPad mini 7 Experience",
      "Honouring Those Who Served",
      "Architects woods + dangaran",
      "Product of the Week: Modern Geometric Rug",
      "Forbes covers AI startup acquisitions",
      "Self-hosted Hubspot alternatives",
      "Q3 retrospective notes",
      "Press release: spring lineup",
      "Editorial review backlog",
      "Inbound traffic analysis week 42",
    ];
    return (
      <TableContainer maxHeight={320}>
        <Table stickyHeader>
          <TableHead>
            <TableRow header>
              <TableHeaderCell>Content title</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Type</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {titles.map((t, i) => (
              <TableRow key={i}>
                <TableCell type="text">{t}</TableCell>
                <TableCell type="badge">
                  <StatusBadge
                    color={i % 3 === 0 ? "green" : i % 3 === 1 ? "yellow" : "blue"}
                    icon={i % 3 === 0 ? <CheckIcon /> : i % 3 === 1 ? <ClockIcon /> : <EditIcon />}
                  >
                    {i % 3 === 0 ? "Published" : i % 3 === 1 ? "Scheduled" : "Draft"}
                  </StatusBadge>
                </TableCell>
                <TableCell type="text">Blog</TableCell>
                <TableCell type="date">Oct {(i % 28) + 1}, 2023</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  },
};

/* ---------- 08 — ColumnSizing ---------- */
/**
 * Explicit column widths via TableColGroup / TableCol. First column
 * takes remaining space; the others are fixed.
 */
export const ColumnSizing: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use `<TableColGroup>` + `<TableCol width>` for predictable column widths. Width accepts a number (treated as px) or any CSS length string (`'20%'`, `'12rem'`). Cols without an explicit width split the remaining space.",
      },
    },
  },
  render: () => (
    <Table>
      <TableColGroup>
        <TableCol />
        <TableCol width={140} />
        <TableCol width={140} />
        <TableCol width={120} />
        <TableCol width={120} />
      </TableColGroup>
      <TableHead>
        <TableRow header>
          <TableHeaderCell>Content title</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Type</TableHeaderCell>
          <TableHeaderCell>Date</TableHeaderCell>
          <TableHeaderCell>By</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell type="text">
            A long title that demonstrates how the title column absorbs
            remaining space while the others stay fixed.
          </TableCell>
          <TableCell type="badge">
            <StatusBadge color="green" icon={<CheckIcon />}>
              Published
            </StatusBadge>
          </TableCell>
          <TableCell type="text">Blog</TableCell>
          <TableCell type="date">Oct 20, 2023</TableCell>
          <TableCell type="text">Krisha M.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell type="text">iPad mini 7 Experience</TableCell>
          <TableCell type="badge">
            <StatusBadge color="yellow" icon={<ClockIcon />}>
              Scheduled
            </StatusBadge>
          </TableCell>
          <TableCell type="text">Web Experience</TableCell>
          <TableCell type="date">Oct 23, 2023</TableCell>
          <TableCell type="text">Jayesh Red</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
