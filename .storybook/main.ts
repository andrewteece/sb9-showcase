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

  // 👇 Explicitly mount /public at Storybook’s root
  staticDirs: [{ from: "../public", to: "/" }],

  viteFinal(viteConfig) {
    return {
      ...viteConfig,
      plugins: [...(viteConfig.plugins ?? []), tsconfigPaths()],
    };
  },
  typescript: { reactDocgen: "react-docgen-typescript" },

  build: {
    test: { disabledAddons: ["@storybook/addon-docs"] },
  },
};

export default config;
