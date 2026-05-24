import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PageNumber, Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Two co-located components: `PageNumber` (single page atom — Default / Hover / Selected) and `Pagination` (composition with Prev + numbered pages + Next). Truncation uses a sliding window around the current page with the first and last always visible; ellipses are clickable and jump 5 pages in their direction. Prev/Next use the existing `Button` `variant=\"tertiary\"`. Mirrors Figma `Page Number` 2734:2591 and `Pagination` 53:261252.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Pagination>;

/* ---------- 01 — PageNumberStates ---------- */
/**
 * The three PageNumber visual states side-by-side, matching the Figma
 * Page Number set (Default / Hover / Selected). The middle one is forced
 * into the :hover state via a wrapper class so it renders the hover
 * background without a real pointer.
 */
export const PageNumberStates: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Default · Hover · Selected. Hover background is `Interaction/Hover` (#eff0f3); Selected background is `Neutral/Light` (#f7f8fc). Both match the Figma master.",
      },
    },
  },
  render: () => (
    <div style={{ display: "inline-flex", gap: 16, alignItems: "center" }}>
      <PageNumber page={1} />
      <PageNumber page={1} className="storybook-force-hover" />
      <PageNumber page={1} selected />
      <style>{`
        .storybook-force-hover { background-color: var(--color-interaction-hover); }
      `}</style>
    </div>
  ),
};

/* ---------- 02 — Variants ---------- */
/**
 * The six Figma Pagination variants — 1 to 1, 1 to 2, …, 1 to 5, and
 * 1 to … (truncated, total = 12). Always rendered with page 1 selected
 * to match the Figma masters exactly.
 */
export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "All six variants from the Figma Pagination set, page 1 selected. Note that the truncated variant shows `1 2 3 4 5 … 12` because current=1 falls in the start window; when current advances past page 4, the sliding window shifts (see the Interactive story below).",
      },
    },
  },
  render: () => {
    const totals = [12, 5, 4, 3, 2, 1];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {totals.map((t) => (
          <Pagination
            key={t}
            totalPages={t}
            currentPage={1}
            onPageChange={() => {}}
          />
        ))}
      </div>
    );
  },
};

/* ---------- 03 — Interactive ---------- */
/**
 * Live demo — click any page, ellipsis, Prev or Next to walk through a
 * 12-page set. Disabled rules: Prev disabled on page 1; Next disabled
 * on the last page.
 */
export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "12 total pages. Try clicking through to see the truncation shift: at pages 1–4 you'll see `1 2 3 4 5 … 12`; in the middle you'll see `1 … prev current next … 12`; near the end you'll see `1 … 8 9 10 11 12`. Ellipses jump 5 pages.",
      },
    },
  },
  render: () => {
    const [current, setCurrent] = useState(1);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Pagination
          totalPages={12}
          currentPage={current}
          onPageChange={setCurrent}
        />
        <p style={{ margin: 0, fontFamily: "var(--font-family-base)", color: "var(--color-text-secondary)", fontSize: 14 }}>
          Currently on page {current} of 12
        </p>
      </div>
    );
  },
};

/* ---------- 04 — TruncationStates ---------- */
/**
 * Snapshots of the truncation algorithm at the three positions that
 * change shape: near start, middle, near end. Useful for visual
 * regression — these never change with a fixed total/current pair.
 */
export const TruncationStates: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Three fixed positions on a 12-page set: page 2 (start window), page 6 (middle), and page 11 (end window). Demonstrates how the rendered item list reshapes around `currentPage`.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <p style={{ margin: "0 0 4px", fontFamily: "var(--font-family-base)", fontSize: 12, color: "var(--color-text-secondary)" }}>
          Start window — current = 2
        </p>
        <Pagination totalPages={12} currentPage={2} onPageChange={() => {}} />
      </div>
      <div>
        <p style={{ margin: "0 0 4px", fontFamily: "var(--font-family-base)", fontSize: 12, color: "var(--color-text-secondary)" }}>
          Middle window — current = 6
        </p>
        <Pagination totalPages={12} currentPage={6} onPageChange={() => {}} />
      </div>
      <div>
        <p style={{ margin: "0 0 4px", fontFamily: "var(--font-family-base)", fontSize: 12, color: "var(--color-text-secondary)" }}>
          End window — current = 11
        </p>
        <Pagination totalPages={12} currentPage={11} onPageChange={() => {}} />
      </div>
    </div>
  ),
};
