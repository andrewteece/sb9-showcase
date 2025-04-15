import type { AddonOptionsVite } from "@storybook/addon-coverage";
import type { StorybookConfig } from "@storybook/react-vite";
import * as tsconfigPaths from "vite-tsconfig-paths";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "storybook-addon-remix-react-router",
    "storybook-dark-mode",
    "@chromatic-com/storybook",
    {
      name: "@storybook/addon-coverage",
      options: {
        istanbul: {
          include: ["src/**/*.tsx"],
          exclude: ["src/**/*.ts"],
        },
      } satisfies AddonOptionsVite,
    },
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal(config) {
    return {
      ...config,
      plugins: [...(config.plugins ?? []), tsconfigPaths.default()],
    };
  },
  docs: {
    autodocs: "tag",
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  build: {
    test: {
      disabledAddons: [
        "@storybook/addon-essentials/docs",
        "storybook-dark-mode",
      ],
    },
  },
};

export default config;
