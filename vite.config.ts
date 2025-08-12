// vite.config.ts
import fs from "node:fs";
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
    plugins: [
      react(),
      tsconfigPaths(),
      checker({ typescript: true }),

      // --- keep: remove MSW worker from production output ---
      {
        name: "remove-msw-service-worker",
        closeBundle: () => {
          if (process.env.NODE_ENV === "production") {
            const mswFile = path.join(
              __dirname,
              "dist",
              "mockServiceWorker.js"
            );
            if (fs.existsSync(mswFile)) {
              fs.unlinkSync(mswFile);
            }
          }
        },
      },

      // --- keep: JSON locale hot-reload during dev ---
      {
        name: "i18n-hot-reload",
        handleHotUpdate({ file, server }) {
          if (file.includes("locales") && file.endsWith(".json")) {
            // Vite dev server custom event channel
            server.ws.send({
              type: "custom",
              event: "locales-update",
              data: file,
            });
          }
        },
      },
    ],

    server: { port: 5173, open: true },
    preview: { port: 5173 },

    define: {
      __APP_ENV__: env.APP_ENV,
    },
  };
});
