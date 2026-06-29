import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState, type CSSProperties } from "react";

/**
 * Phase B verification surface for the grid utility layer.
 *
 * Renders `.container`, `.row`, and `.col-span-*` from `src/styles/grid.css`
 * so the @media bumps at 768 / 1024 can be observed live. Use the Storybook
 * Viewport toolbar (Mobile 375 / Tablet 768 / Desktop 1024 / Wide 1440) to
 * cycle breakpoints — the readout at the top echoes the resolved tokens.
 */

const meta = {
  title: "Foundations / Grid",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

// ---------- Live readout of resolved grid tokens ----------

function useResolvedTokens(names: string[]): Record<string, string> {
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const read = () => {
      const cs = getComputedStyle(document.documentElement);
      const next: Record<string, string> = {};
      for (const n of names) next[n] = cs.getPropertyValue(n).trim();
      setValues(next);
    };
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return values;
}

function ResolvedReadout() {
  const tokens = useResolvedTokens([
    "--grid-cols",
    "--grid-gap",
    "--grid-margin",
    "--grid-container-max",
  ]);

  const wrap: CSSProperties = {
    display: "flex",
    gap: 24,
    padding: "12px 16px",
    background: "var(--color-secondary-neutral-50)",
    borderBottom: "1px solid var(--color-secondary-neutral-200)",
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: 12,
    color: "var(--color-text-default)",
    flexWrap: "wrap",
  };
  const item: CSSProperties = { display: "flex", gap: 8, alignItems: "baseline" };
  const key: CSSProperties = {
    color: "var(--color-text-muted, #636772)",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  };
  const value: CSSProperties = {
    fontWeight: 600,
    color: "var(--color-primary-orange-500)",
  };

  return (
    <div style={wrap}>
      {Object.entries(tokens).map(([k, v]) => (
        <div key={k} style={item}>
          <span style={key}>{k.replace("--grid-", "")}</span>
          <span style={value}>{v || "—"}</span>
        </div>
      ))}
      <div style={{ ...item, marginLeft: "auto" }}>
        <span style={key}>viewport</span>
        <span style={value}>
          {typeof window !== "undefined" ? `${window.innerWidth}px` : "—"}
        </span>
      </div>
    </div>
  );
}

// ---------- Demo blocks ----------

function Block({ label, tone = "primary" }: { label: string; tone?: "primary" | "neutral" }) {
  const bg =
    tone === "primary"
      ? "var(--color-primary-orange-100)"
      : "var(--color-secondary-neutral-100)";
  const fg =
    tone === "primary"
      ? "var(--color-primary-orange-700)"
      : "var(--color-text-default)";
  const border =
    tone === "primary"
      ? "1px solid var(--color-primary-orange-300)"
      : "1px solid var(--color-secondary-neutral-200)";
  return (
    <div
      style={{
        background: bg,
        color: fg,
        border,
        borderRadius: 6,
        padding: "16px 12px",
        textAlign: "center",
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: 13,
        fontWeight: 600,
      }}
    >
      {label}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        margin: "32px 0 12px",
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: 0.4,
        textTransform: "uppercase",
        color: "var(--color-text-muted, #636772)",
      }}
    >
      {children}
    </h3>
  );
}

// ---------- Stories ----------

/**
 * Twelve full-width tracks. On mobile the grid resolves to 4 columns, so
 * each `.col-span-1` covers 1/4 — you'll see only 4 blocks per row instead
 * of 12. At ≥ 768 px the same markup reflows to 8 cols, and at ≥ 1024 px
 * to a full 12.
 */
export const TwelveTracks: Story = {
  render: () => (
    <>
      <ResolvedReadout />
      <div className="container" style={{ paddingBlock: 24 }}>
        <SectionLabel>.col-span-1 × 12</SectionLabel>
        <div className="row">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="col-span-1">
              <Block label={`${i + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </>
  ),
};

/**
 * A two-column layout that demonstrates the breakpoint-prefixed helpers:
 * stacked full-width on mobile, side-by-side on desktop.
 *
 * Mobile (cols=4):   each child = col-span-full         → stacked
 * Tablet (cols=8):   each child = md:col-span-4         → 50/50
 * Desktop (cols=12): main = lg:col-span-8, side = lg:col-span-4 → 2/3 + 1/3
 */
export const ResponsiveTwoColumn: Story = {
  render: () => (
    <>
      <ResolvedReadout />
      <div className="container" style={{ paddingBlock: 24 }}>
        <SectionLabel>
          Stack on mobile → 50/50 on tablet → 2/3 + 1/3 on desktop
        </SectionLabel>
        <div className="row">
          <div className="col-span-full md:col-span-4 lg:col-span-8">
            <Block label="Main · col-span-full · md:4 · lg:8" />
          </div>
          <div className="col-span-full md:col-span-4 lg:col-span-4">
            <Block label="Side · col-span-full · md:4 · lg:4" tone="neutral" />
          </div>
        </div>
      </div>
    </>
  ),
};

/**
 * A dashboard-style 4-card row that wraps on smaller viewports.
 *
 * Mobile  → 2 cards per row (each spans 2/4)
 * Tablet  → 4 cards per row (each spans 2/8)
 * Desktop → 4 cards per row (each spans 3/12)
 */
export const DashboardCards: Story = {
  render: () => (
    <>
      <ResolvedReadout />
      <div className="container" style={{ paddingBlock: 24 }}>
        <SectionLabel>4 KPI cards · responsive</SectionLabel>
        <div className="row">
          {["Active deals", "MRR", "Pipeline", "Tasks"].map((l) => (
            <div
              key={l}
              className="col-span-2 md:col-span-2 lg:col-span-3"
            >
              <Block label={l} />
            </div>
          ))}
        </div>
      </div>
    </>
  ),
};

/**
 * Confirms the visibility helpers fire on the right side of each
 * breakpoint boundary.
 */
export const VisibilityHelpers: Story = {
  render: () => (
    <>
      <ResolvedReadout />
      <div className="container" style={{ paddingBlock: 24 }}>
        <SectionLabel>Visibility helpers</SectionLabel>
        <div className="row">
          <div className="col-span-full">
            <div className="show-on-mobile">
              <Block label="show-on-mobile · visible < 768" />
            </div>
            <div className="hide-on-mobile">
              <Block label="hide-on-mobile · visible ≥ 768" tone="neutral" />
            </div>
          </div>
          <div className="col-span-full">
            <div className="hide-on-desktop">
              <Block label="hide-on-desktop · visible < 1024" />
            </div>
          </div>
        </div>
      </div>
    </>
  ),
};
