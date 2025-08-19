// .storybook/preview.tsx
import { ChakraProvider } from "@chakra-ui/react";
import type { Preview } from "@storybook/react-vite";
import { initialize, mswLoader } from "msw-storybook-addon";

import { theme } from "@/lib/theme/theme";
import { getUserHandler } from "@/test-lib/handlers/getUserHandler";
import { withAuth } from "@/test-lib/storybook/withAuth";
import { withI18Next } from "@/test-lib/storybook/withI18Next";
import { withReactQuery } from "@/test-lib/storybook/withReactQuery";

// Compute the base path Storybook is running under ("/" locally, "/storybook" on Vercel).
const path = typeof window !== "undefined" ? window.location.pathname : "/";
const base = path.includes("/iframe.html")
  ? path.split("/iframe.html")[0] || "/"
  : "/";
const baseNoSlash = base.endsWith("/") ? base.slice(0, -1) : base;

// Build an absolute URL and set an explicit scope (survives hard reloads).
const swUrl =
  typeof window !== "undefined"
    ? new URL(`${baseNoSlash}/mockServiceWorker.js`, window.location.origin)
        .href
    : "/mockServiceWorker.js";
const swScope = `${base}/`;

// Initialize MSW for Storybook
initialize({
  onUnhandledRequest: (req, print) => {
    if (req.url.includes("api")) print.warning();
  },
  serviceWorker: {
    url: swUrl,
    options: { scope: swScope },
  },
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
    msw: {
      handlers: [getUserHandler()],
    },
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
