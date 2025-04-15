import type { Meta, StoryObj } from "@storybook/react";
import { withRouter } from "storybook-addon-remix-react-router";

import { Component } from "./index";
import { productsPageLoader } from "./loader";
import { HttpResponse } from "msw";
import { getProductsHandler } from "@/lib/handlers/getProductsHandler";
import { getAddToCartHandler } from "@/lib/handlers/getAddToCartHandler";

const meta = {
  title: "pages/Products",
  component: Component,
  parameters: {
    layout: "centered",
    reactRouter: {
      loader: productsPageLoader,
    },
  },
  decorators: [withRouter],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [getProductsHandler(), getAddToCartHandler()],
    },
  },
};

export const WithoutProducts: Story = {
  parameters: {
    msw: {
      handlers: [getProductsHandler(() => HttpResponse.json([]))],
    },
  },
};
