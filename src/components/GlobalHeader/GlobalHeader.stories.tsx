import type { Meta, StoryObj } from "@storybook/react";
import { GlobalHeader } from "./GlobalHeader";

const SAMPLE_PHOTO =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2.4&w=128&h=128&q=80";

const meta: Meta<typeof GlobalHeader> = {
  title: "Components/GlobalHeader",
  component: GlobalHeader,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    tabLabel: { control: "text" },
    notificationDot: { control: "boolean" },
    onTrackpadClick: { action: "trackpad" },
    onNotificationsClick: { action: "notifications" },
    onSettingsClick: { action: "settings" },
    onAvatarClick: { action: "avatar" },
  },
  args: {
    tabLabel: "Content",
    notificationDot: true,
    currentUser: {
      name: "Hannah Park",
      src: SAMPLE_PHOTO,
      loggedIn: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof GlobalHeader>;

export const Default: Story = {};

export const Clickable: Story = {
  args: {
    onTrackpadClick: () => console.log("trackpad clicked"),
    onNotificationsClick: () => console.log("notifications clicked"),
    onSettingsClick: () => console.log("settings clicked"),
    onAvatarClick: () => console.log("avatar clicked"),
  },
};

export const WithoutNotificationDot: Story = {
  args: { notificationDot: false },
};

export const LoggedOut: Story = {
  args: {
    currentUser: { loggedIn: false },
    onAvatarClick: () => console.log("avatar clicked"),
  },
};

export const NoTab: Story = {
  args: { tabLabel: null },
};
