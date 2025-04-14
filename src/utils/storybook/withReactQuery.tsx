import type { Decorator } from "@storybook/react/*";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "utils";

export const withReactQuery: Decorator = (story) => {
  queryClient.clear();

  return (
    <QueryClientProvider client={queryClient}>{story()}</QueryClientProvider>
  );
};
