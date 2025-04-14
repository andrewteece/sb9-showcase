import type { Decorator } from "@storybook/react";
// eslint-disable-next-line no-restricted-imports
import {
  initializeAuthStore,
  Provider,
} from "modules/auth/application/authStore";

export const withoutAuth: Decorator = (story) => {
  const store = initializeAuthStore({
    isAuthenticated: false,
    isError: false,
    state: "finished",
  });

  return <Provider value={store}>{story()}</Provider>;
};
