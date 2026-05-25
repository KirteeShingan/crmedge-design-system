import type { Meta, StoryObj } from "@storybook/react-vite";
import { SideNav } from "./SideNav";
import type { SideNavItem } from "./SideNav";

const HomeIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M3.5 8.5l6.5-5 6.5 5V16a1 1 0 01-1 1h-3v-5h-5v5h-3a1 1 0 01-1-1V8.5z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);
const FolderIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M3 6a1 1 0 011-1h3l2 2h7a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V6z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);
const MediaIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect
      x="3"
      y="4"
      width="14"
      height="12"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="8" cy="9" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M3 14l4-3 5 4 3-2 2 1.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);
const PluginIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M10 3v4M6 7h8v3a4 4 0 11-8 0V7z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);
const GearIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M10 2v2M10 16v2M2 10h2M16 10h2M4.5 4.5l1.5 1.5M14 14l1.5 1.5M4.5 15.5L6 14M14 6l1.5-1.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const items: SideNavItem[] = [
  { id: "home", label: "Home", icon: <HomeIcon /> },
  {
    id: "projects",
    label: "Projects",
    icon: <FolderIcon />,
    subItems: [
      { id: "p1", label: "Project 1" },
      { id: "p2", label: "Project 2" },
      { id: "p3", label: "Project 3" },
    ],
  },
  {
    id: "media",
    label: "Media",
    icon: <MediaIcon />,
    subItems: [{ id: "m1", label: "Library" }],
  },
  { id: "plugins", label: "Plugins", icon: <PluginIcon /> },
  {
    id: "settings",
    label: "Settings",
    icon: <GearIcon />,
    subItems: [{ id: "s1", label: "Account" }],
  },
];

const meta: Meta<typeof SideNav> = {
  title: "Components/SideNav",
  component: SideNav,
  parameters: { layout: "fullscreen" },
  args: { items, selectedId: "projects" },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", height: "100vh" }}>{Story()}</div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof SideNav>;

export const Expanded: Story = { args: { defaultExpanded: true } };
export const Collapsed: Story = { args: { defaultExpanded: false } };
export const SubItemSelected: Story = {
  args: { defaultExpanded: true, selectedId: "p2" },
};
