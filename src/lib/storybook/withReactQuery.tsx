import { queryClient } from "@/lib/query";
import type { Decorator } from "@storybook/react/*";
import { QueryClientProvider } from "@tanstack/react-query";

export const withReactQuery: Decorator = (story) => {
  queryClient.clear();

  return (
    <QueryClientProvider client={queryClient}>{story()}</QueryClientProvider>
  );
};
