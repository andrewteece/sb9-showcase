// .storybook/main.ts
import type { StorybookConfig } from "@storybook/react-vite";
import type { Plugin, PluginOption } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

/** Type guard: does a value look like a Vite Plugin (has a string "name")? */
function hasPluginName(value: unknown): value is Pick<Plugin, "name"> {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in (value as Record<string, unknown>) &&
    typeof (value as { name?: unknown }).name === "string"
  );
}

/** Recursively remove plugins whose names match the predicate. Leaves Promises and non-plugin options untouched. */
function filterPluginOptions(
  options: PluginOption[],
  keep: (name: string) => boolean
): PluginOption[] {
  const out: PluginOption[] = [];
  for (const opt of options) {
    // Keep promises as-is; Storybook/Vite will resolve them later.
    if (opt instanceof Promise) {
      out.push(opt);
      continue;
    }
    if (Array.isArray(opt)) {
      out.push(filterPluginOptions(opt, keep));
      continue;
    }
    if (hasPluginName(opt)) {
      if (keep(opt.name)) out.push(opt);
      continue;
    }
    // False/null/undefined or other shapes: pass through unchanged
    out.push(opt);
  }
  return out;
}

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

  // Serve /public at the root of the Storybook build output
  staticDirs: [{ from: "../public", to: "/" }],

  viteFinal(viteConfig) {
    const isProd = process.env.NODE_ENV === "production";
    const existing = viteConfig.plugins ?? [];

    // Remove any plugin that injects a "mocker" entry at the origin root
    // (prevents /vite-inject-mocker-entry.js 404s when Storybook lives under /storybook)
    const withoutMocker = filterPluginOptions(
      existing,
      (name) => !name.toLowerCase().includes("mocker")
    );

    return {
      ...viteConfig,
      // Ensure built assets resolve under /storybook in production only (local dev remains '/')
      ...(isProd ? { base: "/storybook/" } : {}),
      plugins: [...withoutMocker, tsconfigPaths()],
    };
  },

  typescript: { reactDocgen: "react-docgen-typescript" },

  build: {
    test: { disabledAddons: ["@storybook/addon-docs"] },
  },
};

export default config;
