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
    "@storybook/addon-vitest", // <- Vitest-based Storybook Test
    "@storybook/addon-a11y",
  ],
  framework: { name: "@storybook/react-vite", options: {} },

  // Serve /public at the root of the Storybook build output
  staticDirs: [{ from: "../public", to: "/" }],

  viteFinal(viteConfig) {
    const existing = viteConfig.plugins ?? [];

    // Remove any plugin that injects a "mocker" entry at the origin root
    // (prevents /vite-inject-mocker-entry.js 404s when Storybook lives under /storybook)
    const withoutMocker = filterPluginOptions(
      existing,
      (name) => !name.toLowerCase().includes("mocker")
    );

    // 🔑 Choose base path by environment:
    // - CI/local: "/" (so static server at root works)
    // - Vercel/prod deploy: "/storybook/"
    // - Or override explicitly with STORYBOOK_BASE_PATH
    const basePath =
      process.env.STORYBOOK_BASE_PATH ??
      (process.env.VERCEL ? "/storybook/" : "/");

    return {
      ...viteConfig,
      base: basePath,
      plugins: [...withoutMocker, tsconfigPaths()],
    };
  },

  typescript: { reactDocgen: "react-docgen-typescript" },

  build: {
    test: { disabledAddons: ["@storybook/addon-docs"] },
  },
};

export default config;
