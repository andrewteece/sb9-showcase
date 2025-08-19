// .storybook/preview.tsx
import { ChakraProvider } from "@chakra-ui/react";
import type { Preview } from "@storybook/react-vite";
import { http, HttpResponse } from "msw";
import { initialize, mswLoader } from "msw-storybook-addon";

import { theme } from "@/lib/theme/theme";
import { getUserHandler } from "@/test-lib/handlers/getUserHandler";
import { withAuth } from "@/test-lib/storybook/withAuth";
import { withI18Next } from "@/test-lib/storybook/withI18Next";
import { withReactQuery } from "@/test-lib/storybook/withReactQuery";

// ✅ Derive the correct base path ("/" locally, "/storybook" on Vercel)
const base =
  typeof window !== "undefined"
    ? window.location.pathname.split("/iframe.html")[0] || "/"
    : "/";

const baseNoSlash = base.endsWith("/") ? base.slice(0, -1) : base;

// ✅ Initialize MSW with the correct URL + scope
initialize({
  onUnhandledRequest: (req, print) => {
    if (req.url.includes("api")) print.warning();
  },
  serviceWorker: {
    url: `${baseNoSlash}/mockServiceWorker.js`, // e.g. /storybook/mockServiceWorker.js
    options: { scope: `${base}/` }, // e.g. /storybook/
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
      handlers: [
        getUserHandler(),

        // 🔎 TEST HANDLER — remove after verifying in prod
        http.get("/api/ping", () => {
          return HttpResponse.json({ ok: true, source: "msw" });
        }),
      ],
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
