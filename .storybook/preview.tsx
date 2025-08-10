import { ChakraProvider, theme } from "@chakra-ui/react";
import type { Preview } from "@storybook/react-vite";
import { initialize, mswLoader } from "msw-storybook-addon";

import { getUserHandler } from "@/test-lib/handlers/getUserHandler";
import { withAuth } from "@/test-lib/storybook/withAuth";
import { withI18Next } from "@/test-lib/storybook/withI18Next";
import { withReactQuery } from "@/test-lib/storybook/withReactQuery";

// Start MSW with a custom onUnhandledRequest filter
initialize(
  {
    onUnhandledRequest: (req, print) => {
      // Only warn on unhandled requests to your API domain/prefix
      if (req.url.includes("api")) print.warning();
    },
  },
  [getUserHandler()]
);

const preview: Preview = {
  // Global docs via tags (you can still override per-story)
  tags: ["autodocs"],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      expanded: true,
    },

    // Keep a11y ON in Storybook; set test mode to "todo" so CI doesn't fail yet
    // When you're ready, switch test: 'error' to fail CI on violations.
    a11y: {
      disable: false,
      test: import.meta.env.STORYBOOK_A11Y_MODE === "error" ? "error" : "todo",
    },

    layout: "centered",
  },

  // msw-storybook-addon loader ensures handlers apply before stories render
  loaders: [mswLoader],

  decorators: [
    (Story) => (
      <ChakraProvider theme={theme}>
        <Story />
      </ChakraProvider>
    ),
    withI18Next,
    withReactQuery,
    withAuth,
  ],
};

export default preview;
