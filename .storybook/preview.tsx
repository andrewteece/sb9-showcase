// .storybook/preview.tsx
import { ChakraProvider } from "@chakra-ui/react";
import type { Preview } from "@storybook/react-vite";
import { initialize, mswLoader } from "msw-storybook-addon";

import { theme } from "@/lib/theme/theme";
import { getUserHandler } from "@/test-lib/handlers/getUserHandler";
import { withAuth } from "@/test-lib/storybook/withAuth";
import { withI18Next } from "@/test-lib/storybook/withI18Next";
import { withReactQuery } from "@/test-lib/storybook/withReactQuery";

// Detect if Storybook is hosted under /storybook (your Vercel route)
const isHostedUnderSubdir =
  typeof window !== "undefined" &&
  window.location.pathname.startsWith("/storybook");

const swUrl = isHostedUnderSubdir
  ? "/storybook/mockServiceWorker.js" // Vercel under /storybook
  : "/mockServiceWorker.js"; // Local (http://localhost:6006), Vercel at root, Chromatic

// Initialize MSW (options only; handlers go in parameters.msw.handlers)
initialize({
  onUnhandledRequest: (req, print) => {
    // Warn only for calls hitting "api"
    if (req.url.includes("api")) print.warning();
  },
  serviceWorker: { url: swUrl },
});

const preview: Preview = {
  tags: ["autodocs"],

  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/ },
      expanded: true,
    },
    a11y: {
      disable: false,
      test: import.meta.env.STORYBOOK_A11Y_MODE === "error" ? "error" : "todo",
    },
    layout: "centered",

    // Global MSW handlers (add more as needed)
    msw: {
      handlers: [getUserHandler()],
    },
  },

  // Wire MSW into each story
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
