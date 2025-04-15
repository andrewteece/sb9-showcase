import type { Meta, StoryObj } from "@storybook/react";
import { withRouter } from "storybook-addon-remix-react-router";

import { Component } from "./index";
import { cartPageLoader } from "./loader";
import { HttpResponse } from "msw";
import { getCartHandler } from "@/lib/handlers/getCartHandler";
import { CartFixture } from "@/lib/fixtures/CartFixture";
import { getProductHandler } from "@/lib/handlers/getProductHandler";
import { getClearCartHandler } from "@/lib/handlers/getClearCartHandler";

const CART_ID = 1;
const PRODUCT_ID_1 = 2;
const PRODUCT_ID_2 = 3;

const meta = {
  title: "pages/Cart",
  component: Component,
  parameters: {
    layout: "centered",
    reactRouter: {
      routePath: "/cart/:cartId",
      routeParams: { cartId: CART_ID },
      loader: cartPageLoader,
    },
  },
  decorators: [withRouter],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        getCartHandler(() => {
          return HttpResponse.json(
            CartFixture.createPermutation({
              id: CART_ID,
              products: [
                { productId: PRODUCT_ID_1 },
                { productId: PRODUCT_ID_2 },
              ],
            })
          );
        }),
        getProductHandler(),
        getClearCartHandler(),
      ],
    },
  },
};
