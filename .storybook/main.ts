import type { StorybookConfig } from "@storybook/react-vite";
import tsconfigPaths from "vite-tsconfig-paths";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "storybook-addon-remix-react-router",
    "@storybook/addon-docs",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
  ],
  framework: { name: "@storybook/react-vite", options: {} },
  staticDirs: ["../public"],

  viteFinal(viteConfig) {
    return {
      ...viteConfig,
      plugins: [...(viteConfig.plugins ?? []), tsconfigPaths()],
    };
  },

  typescript: { reactDocgen: "react-docgen-typescript" },

  build: {
    test: {
      // fine to keep: speeds up test builds by skipping docs processing
      disabledAddons: ["@storybook/addon-docs"],
    },
  },
};

export default config;
