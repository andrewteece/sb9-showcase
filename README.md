# Storybook Showcase

A React + Vite SPA demonstrating component-driven development with Storybook, accessible UI (Chakra), and CI visual testing via Chromatic. The app is deployed on **Vercel**, with Storybook bundled under `/storybook/`.

---

## Quick links

- **Production app:** https://sb9-showcase-2hjyf95gd-andrewteeces-projects.vercel.app/
- **Storybook (production):** https://sb9-showcase-2hjyf95gd-andrewteeces-projects.vercel.app/storybook/
- **Chromatic project:** _link to latest Chromatic build_

---

## Tech stack

- **Build:** Vite 7 + React
- **UI:** Chakra UI (AA contrast defaults in theme)
- **Routing:** React Router 7 (Data Router)
- **Data:** MSW (mocked API for dev and, optionally, prod demos)
- **State/fetching:** TanStack Query
- **Testing:** Vitest + @storybook/test-runner
- **Visual review:** Chromatic
- **Deploy:** Vercel (SPA rewrites; Storybook at `/storybook/`)

---

## Requirements

- Node 20+
- pnpm 9+

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

---

## Getting started

```bash
pnpm install
pnpm dev            # http://localhost:5173
pnpm storybook      # http://localhost:6006
```

### Useful scripts

| Command                | Description                                                  |
| ---------------------- | ------------------------------------------------------------ |
| `pnpm dev`             | Run Vite dev server (HMR)                                    |
| `pnpm build`           | Build SPA to `dist/`                                         |
| `pnpm preview`         | Serve the production build locally                           |
| `pnpm storybook`       | Start Storybook locally                                      |
| `pnpm build-storybook` | Build static Storybook to `storybook-static/`                |
| `pnpm build:vercel`    | Build app + Storybook, copy Storybook into `dist/storybook/` |
| `pnpm test`            | Run Vitest tests                                             |
| `pnpm test:storybook`  | Run a11y + interaction tests via Storybook test-runner       |

> **Note:** `build:vercel` is the command used by Vercel. It runs `build` and `build-storybook`, then copies `storybook-static` into `dist/storybook/`.

---

## Environment variables

> Only variables prefixed with `VITE_` are exposed to the client.

- `VITE_ENABLE_MSW` (`"true"`/`"false"`) — When `true`, starts MSW in the browser so the app uses mocked endpoints. Useful for demos. (We currently enable MSW on Vercel.)
- `VITE_API_BASE_URL` (optional) — Point the app at a real API instead of MSW.

Create a `.env.local` for local overrides:

```
VITE_ENABLE_MSW=true
# VITE_API_BASE_URL=https://example.com
```

---

## MSW (Mock Service Worker)

The app can run entirely client-side using MSW for API mocking.

- Worker file lives at `public/mockServiceWorker.js`.
- For **Storybook**, the worker URL is set dynamically so it works both at the root and under `/storybook/`.
- At runtime, MSW is started **before** React mounts (see `src/mocks/enableMocking.ts` and the call in `src/main.tsx`).

### Adding/editing handlers

- App-level handlers live in `src/mocks/handlers.ts`.
- Story-specific handlers live inside `*.stories.tsx` via Storybook’s `msw` parameter.

---

## Routing

- Uses React Router’s Data Router with `createBrowserRouter`.
- On Vercel we host at the site root, so no `basename` is required.
- SPA rewrites are configured in `vercel.json` so deep links and refreshes work.

---

## Deployment (Vercel)

**One-time project configuration:**

- Framework preset: **Vite**
- Install command: `pnpm install --frozen-lockfile`
- Build command: `pnpm build:vercel`
- Output directory: `dist`
- Environment variables (Production & Preview):
  - `VITE_ENABLE_MSW=true` (for demo mode)

**SPA rewrites (`vercel.json`):**

```json
{
  "rewrites": [
    { "source": "/storybook/(.*)", "destination": "/storybook/index.html" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Deploy flow:**

- Every push to the configured branch triggers a Vercel preview deployment.
- Merging to the production branch (e.g. `main`) promotes the latest preview to production.

---

## CI

- **Chromatic (tests + publish):**
  - Runs story a11y + interaction tests
  - Publishes a visual build for review
  - Fails on unapproved visual changes (strict)
  - Requires `CHROMATIC_PROJECT_TOKEN` Action secret

> GitHub Pages deploy workflows were removed in favor of Vercel.

---

## Accessibility

- Chakra theme enforces AA contrast for text, links, and solid buttons.
- Storybook a11y addon runs locally; test-runner enforces in CI.

---

## Project structure (high level)

```
src/
  app/                 # app-wide providers
  features/            # vertical feature slices (auth, carts, products, …)
  lib/
    components/        # shared UI components (Layout, Result, Form, …)
    router/            # router helpers & routes map
    theme/             # Chakra theme + hooks
  mocks/               # MSW runtime handlers (app-level)
  pages/               # route-based pages (Home, Products, Product, Cart, …)
.storybook/            # Storybook config
public/                # static assets (incl. mockServiceWorker.js)
```

---

## Troubleshooting

- **Chromatic job fails for visual diffs**  
  Open the build link from the job logs → review → Approve → re-run the job.
- **Storybook SW 404 under `/storybook/`**  
  Ensure `.storybook/preview.tsx` sets `serviceWorker: { url: "/storybook/mockServiceWorker.js" }` when hosted under `/storybook/`.
- **Route refresh 404**  
  Confirm `vercel.json` rewrites are present (see above).
- **Playwright/Storybook test-runner errors in CI**  
  Ensure `pnpm exec playwright install chromium` runs in CI (already handled in workflow).

---

## License

MIT — see `LICENSE`.
