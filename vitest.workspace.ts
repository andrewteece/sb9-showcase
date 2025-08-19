// vitest.workspace.ts
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

const storybookProject = {
  // Vite plugins for this Vitest project
  plugins: [
    storybookTest({
      configDir: path.join(dirname, ".storybook"),
    }),
  ],

  // Vitest config for the Storybook project
  test: {
    name: "storybook",
    include: ["src/**/*.stories.@(ts|tsx)"],
    browser: {
      enabled: true,
      provider: "playwright",
      headless: true,
      instances: [{ browser: "chromium" }],
    },
    setupFiles: ["./.storybook/vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      reportsDirectory: "./coverage/storybook",
    },
  },
};

// Off by default; enable with: ENABLE_STORYBOOK_TESTS=1 pnpm test:storybook:ci
const enableSB = /^(1|true|yes)$/i.test(
  String(process.env.ENABLE_STORYBOOK_TESTS ?? "")
);

// Export workspace array (no deprecated defineWorkspace, no types needed)
export default enableSB
  ? ["./vitest.config.ts", storybookProject]
  : ["./vitest.config.ts"];
