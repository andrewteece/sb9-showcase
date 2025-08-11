import { EmailIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { PageHeader } from "./PageHeader";

const meta = {
  component: PageHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Software Frontend Developer",
    description: "Specialization: JavaScript, TypeScript, React, Nextjs",
    children: (
      <>
        <Button
          variant="outline"
          colorScheme="blue"
          leftIcon={<ExternalLinkIcon />}
        >
          {"See profile"}
        </Button>

        {/* AA contrast: white on blue.700 */}
        <Button
          leftIcon={<EmailIcon />}
          color="white"
          bg="blue.700"
          _hover={{ bg: "blue.800" }}
          _active={{ bg: "blue.900" }}
        >
          {"Contact"}
        </Button>
      </>
    ),
  },
};

export const SmSize: Story = { args: { ...Default.args, size: "sm" } };
export const MdSize: Story = { args: { ...Default.args, size: "md" } };
export const LgSize: Story = { args: { ...Default.args, size: "lg" } };
export const XlSize: Story = { args: { ...Default.args, size: "xl" } };
