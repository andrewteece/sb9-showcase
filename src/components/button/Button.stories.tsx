import type { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent, within, expect } from "@storybook/test";

import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: { label: "Save", variant: "primary" },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "ghost"] },
  },
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = {
  args: { variant: "secondary", label: "Cancel" },
};
export const Ghost: Story = { args: { variant: "ghost", label: "Learn more" } };
export const Disabled: Story = { args: { disabled: true } };

export const Clicks: Story = {
  args: { label: "Click me" },
  tags: ["tests"],
  async play({ canvasElement }) {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole("button", { name: /click me/i }));
    await expect(c.getByRole("button", { name: /click me/i })).toBeEnabled();
  },
};
