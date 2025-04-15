import type { Decorator } from "@storybook/react";

import {
  initializeAuthStore,
  Provider,
} from "@/features/auth/application/authStore";
import { UserFixture } from "@/lib/fixtures/UserFixture";

export const withAuth: Decorator = (story) => {
  const store = initializeAuthStore({
    isAuthenticated: true,
    isError: false,
    state: "finished",
    user: UserFixture.toStructure(),
  });

  return <Provider value={store}>{story()}</Provider>;
};
