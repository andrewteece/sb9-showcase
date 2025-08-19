import path from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";
import checker from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    root: __dirname,
    plugins: [
      tsconfigPaths(),
      react(),
      checker({
        typescript: true,
        overlay: false,
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: { port: 5173, open: true },
    preview: { port: 5173 },

    // Example of exposing env to code (use import.meta.env for most use cases)
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  };
});
