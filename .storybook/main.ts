import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  docs: {
    autodocs: "tag",
  },
  // CI sets STORYBOOK_BASE_PATH=/crmedge-design-system/ for GitHub Pages.
  // Local dev leaves it unset so assets serve from `/`.
  viteFinal: async (vite) => {
    if (process.env.STORYBOOK_BASE_PATH) {
      vite.base = process.env.STORYBOOK_BASE_PATH;
    }
    return vite;
  },
};

export default config;
