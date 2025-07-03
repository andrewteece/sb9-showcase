import type { AddonOptionsVite } from "@storybook/addon-coverage";
import type { StorybookConfig } from "@storybook/react-vite";
// import * as tsconfigPaths from "vite-tsconfig-paths";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-a11y",
    "storybook-addon-remix-react-router",
    {
      name: "@storybook/addon-coverage",
      options: {
        istanbul: {
          include: ["src/**/*.tsx"],
          exclude: ["src/**/*.ts"],
        },
      } satisfies AddonOptionsVite,
    },
    "@storybook/addon-docs",
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  // async viteFinal(config) {
  //   const { mergeConfig } = await import("vite");

  //   return mergeConfig(config, {
  //     plugins: [...(config.plugins ?? []), tsconfigPaths.default()],
  //   });
  // },

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};

export default config;
