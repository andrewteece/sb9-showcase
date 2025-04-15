import { ChakraProvider, theme } from "@chakra-ui/react";
import { initialize, mswLoader } from "msw-storybook-addon";
import { createElement } from "react";

import { getUserHandler } from "@/lib/handlers/getUserHandler";
import { withAuth } from "@/lib/storybook/withAuth";
import { withReactQuery } from "@/lib/storybook/withReactQuery";

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  a11y: { disable: true },
};

initialize(
  {
    onUnhandledRequest: (req, print) => {
      if (!req.url.includes("api")) {
        return;
      }

      print.warning();
    },
  },
  [getUserHandler()]
);

export const decorators = [
  // eslint-disable-next-line react/no-children-prop, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
  (story: any) => createElement(ChakraProvider, { children: story(), theme }),
  withReactQuery,
  withAuth,
];

export const loaders = [mswLoader];
