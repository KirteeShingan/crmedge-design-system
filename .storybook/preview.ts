import type { Preview } from "@storybook/react";

import "../src/styles/reset.css";
import "../src/styles/fonts.css";
import "../src/styles/tokens.css";
import "../src/styles/grid.css";

/**
 * Viewport presets aligned with the CRMEdge breakpoint tokens
 * (see Foundations → Section / Breakpoints in Figma, and
 * `--breakpoint-*` in src/styles/tokens.css).
 *
 * Mobile uses 375px (iPhone reference width) which sits in the
 * `mobile` band (>= 360, < 768). Desktop and Wide match the lower
 * bound of each band exactly so the @media transitions are easy to
 * observe.
 */
const crmedgeViewports = {
  mobile: {
    name: "Mobile · 375",
    styles: { width: "375px", height: "812px" },
    type: "mobile" as const,
  },
  tablet: {
    name: "Tablet · 768",
    styles: { width: "768px", height: "1024px" },
    type: "tablet" as const,
  },
  desktop: {
    name: "Desktop · 1024",
    styles: { width: "1024px", height: "768px" },
    type: "desktop" as const,
  },
  wide: {
    name: "Wide · 1440",
    styles: { width: "1440px", height: "900px" },
    type: "desktop" as const,
  },
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    viewport: {
      viewports: crmedgeViewports,
    },
  },
};

export default preview;
