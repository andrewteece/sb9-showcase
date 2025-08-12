import { ChakraProvider } from "@chakra-ui/react";
import type { Preview } from "@storybook/react-vite";
import { initialize, mswLoader } from "msw-storybook-addon";

import { theme } from "@/lib/theme/theme";
import { getUserHandler } from "@/test-lib/handlers/getUserHandler";
import { withAuth } from "@/test-lib/storybook/withAuth";
import { withI18Next } from "@/test-lib/storybook/withI18Next";
import { withReactQuery } from "@/test-lib/storybook/withReactQuery";

// Decide the correct worker URL based on where Storybook is hosted
const isHostedUnderSubdir =
  typeof window !== "undefined" &&
  window.location.pathname.startsWith("/storybook");

const swUrl = isHostedUnderSubdir
  ? "/storybook/mockServiceWorker.js" // Storybook served at /storybook/ (Vercel)
  : "/mockServiceWorker.js"; // Storybook root (localhost:6006, Chromatic)

// Start MSW with a custom onUnhandledRequest filter
initialize(
  {
    onUnhandledRequest: (req, print) => {
      if (req.url.includes("api")) print.warning();
    },
    serviceWorker: { url: swUrl },
  },
  [getUserHandler()]
);

const preview: Preview = {
  tags: ["autodocs"],

  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/ },
      expanded: true,
    },
    // Keep a11y ON in Storybook; CI mode toggled via env
    a11y: {
      disable: false,
      test: import.meta.env.STORYBOOK_A11Y_MODE === "error" ? "error" : "todo",
    },
    layout: "centered",
  },

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
