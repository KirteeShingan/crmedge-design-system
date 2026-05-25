import type { Meta, StoryObj } from "@storybook/react";
import { Playground } from "./Playground";

const meta: Meta<typeof Playground> = {
  title: "Pages/Playground",
  component: Playground,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Page-level composition mirroring Figma frame `2754:3249` on the 🎮 Playground page of file `DmL4gv3m10KzL2Y6yLMDJ5`. Assembled almost entirely from the design-system components in `src/components/`. The remaining gaps — filter dropdown chips, row Edit/Duplicate link buttons, and the page footer — are not yet design-system components and live inline in this page.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Playground>;

export const Default: Story = {};
