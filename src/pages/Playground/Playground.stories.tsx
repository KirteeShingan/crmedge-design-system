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
          "POC reference page — hand-rolled 1:1 replica of Figma frame 2654:2557 on page '🎮 Playground (Fixed)' in file DmL4gv3m10KzL2Y6yLMDJ5. No reusable components — placeholder for the real Checkbox, Badge, Table, Pagination, Avatar Group, Side NavBar, Global Header, Filter Dropdown, Search Field, Tooltip, and Footer components which are not yet built.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Playground>;

export const Default: Story = {};
