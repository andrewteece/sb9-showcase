import { config, configs as tsConfigs } from "typescript-eslint";
import js from "@eslint/js";
import { configs as rhConfigs } from "eslint-plugin-react-hooks";
import reactPlugin from "eslint-plugin-react";
import prettierPluginRecommended from "eslint-plugin-prettier/recommended";
import importPlugin from "eslint-plugin-import";
import storybookPlugin from "eslint-plugin-storybook";
import vitest from "eslint-plugin-vitest";
import reactRefresh from "eslint-plugin-react-refresh";

// used by import/no-restricted-paths
const featureSlices = ["carts", "marketing", "products"];
const featureToFeatureZones = featureSlices.map((feature) => ({
  target: `./src/features/${feature}`,
  from: "./src/features",
  except: [`./${feature}`, "./auth"],
  message: "Avoid importing from other features.",
}));

export default config(
  // -------- Global ignores (generated + tool files) --------
  {
    ignores: [
      "**/dist/**",
      "**/storybook-static/**",
      "**/coverage/**",
      "**/reports/**",
      "**/.storybook/**",
      "**/*.typegen.ts",
      "**/public/mockServiceWorker.js",
      "**/vitest.workspace.ts",
      "**/eslint.config.*",
      // Tool configs we lint separately (or not at all)
      "vite.config.ts",
      "vitest.config.ts",
    ],
  },

  // -------- Base presets --------
  js.configs.recommended,
  tsConfigs.recommendedTypeChecked,
  tsConfigs.stylisticTypeChecked,
  rhConfigs["recommended-latest"],
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  prettierPluginRecommended,
  ...storybookPlugin.configs["flat/recommended"],

  // -------- Global language options --------
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        __DEV__: false,
        __PROD__: false,
        __APP_VERSION__: false,
        __APP_URL__: false,
      },
    },
    settings: {
      react: { version: "detect" },
    },
  },

  // -------- TS/TSX app code rules --------
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { import: importPlugin, "react-refresh": reactRefresh },
    settings: {
      "import/resolver": {
        typescript: { project: "./tsconfig.json", alwaysTryTypes: true },
        node: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
      },
      "import/ignore": [
        "node_modules",
        ".json$",
        ".(css|scss)$",
        ".(jpg|png|gif|svg|html|txt|md|woff|woff2|ttf|eot)$",
      ],
      "import/external-module-folders": ["node_modules", ".pnpm-store"],
    },
    rules: {
      ...importPlugin.configs.recommended.rules,
      ...importPlugin.configs.typescript.rules,

      "import/no-dynamic-require": "error",
      "import/no-useless-path-segments": "error",
      "import/no-extraneous-dependencies": "error",
      "import/newline-after-import": "error",
      "import/no-commonjs": "error",
      "import/no-amd": "error",
      "import/order": [
        "error",
        {
          alphabetize: { caseInsensitive: true, order: "asc" },
          groups: ["builtin", "external", "internal", "parent", "sibling"],
          "newlines-between": "always",
        },
      ],

      "react-refresh/only-export-components": "error",
      "no-unused-vars": "off",
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      "no-console": ["error", { allow: ["error"] }],
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "always", propElementValues: "always" },
      ],
      "no-void": ["error", { allowAsStatement: true }],

      // TS strictness
      "testing-library/await-async-events": "off",
      "react/display-name": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/ban-ts-comment": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      "@typescript-eslint/only-throw-error": "error",
      "@typescript-eslint/prefer-promise-reject-errors": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-argument": "error",
      "@typescript-eslint/no-base-to-string": "error",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/no-floating-promises": [
        "error",
        { ignoreVoid: true },
      ],
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { arguments: false, attributes: false } },
      ],
      "@typescript-eslint/no-unsafe-enum-comparison": "error",

      // Import boundaries (feature slicing)
      "import/no-restricted-paths": [
        "error",
        {
          zones: featureToFeatureZones,
        },
      ],
    },
  },

  // -------- Test files --------
  {
    files: ["**/*.test.ts?(x)"],
    plugins: { vitest },
    rules: vitest.configs.recommended.rules,
    settings: { vitest: { typecheck: true } },
    languageOptions: {
      globals: { ...vitest.environments.env.globals },
    },
  },

  // -------- EXCEPTIONS (temporary): allow cross-feature imports in these files --------
  {
    files: [
      // carts importing products
      "src/features/carts/presentation/CartItem.tsx",
      // products importing carts
      "src/features/products/presentation/ProductCard.tsx",
      "src/features/products/presentation/ProductDetails.tsx",
      "src/features/products/presentation/ProductsList.tsx",
      // lib importing auth (Navbar, etc.)
      "src/lib/components/Layout/Navbar/**/*.tsx",
      "src/lib/components/Result/ErrorPageStrategy.tsx",
    ],
    rules: {
      "import/no-restricted-paths": "off",
    },
  },

  // -------- Zone rules for lib (keep in place for all other files) --------
  {
    files: ["./src/lib/**"],
    rules: {
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            {
              target: "./src/lib",
              from: "./src/features",
              message: "Lib should not depend on features.",
            },
          ],
        },
      ],
    },
  }
);
