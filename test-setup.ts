import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { afterEach, beforeAll, afterAll } from "vitest";

import * as enGB from "./public/locales/en-GB/translation.json";
import { mockServer } from "./src/test-lib/mockServer";

await i18n.use(initReactI18next).init({
  lng: "en-GB",
  fallbackLng: "en-GB",
  resources: {
    "en-GB": {
      translation: enGB,
    },
  },
  interpolation: {
    escapeValue: false,
  },
  load: "languageOnly",
});

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
  mockServer.resetHandlers();
});

beforeAll(() => {
  mockServer.listen();
});

afterAll(() => {
  mockServer.close();
});
