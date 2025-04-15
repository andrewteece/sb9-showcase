import { useMutation } from "@tanstack/react-query";

import { useAuthStore } from "@/features/auth/application/authStore";
import { httpService } from "@/lib/http";
import { Logger } from "@/lib/logger";

export const useClearCart = () => {
  const cartId = useAuthStore((store) => store.user.cartId);

  const { mutateAsync, isLoading } = useMutation(() =>
    httpService.delete(`carts/${cartId}`)
  );

  const handler = () => {
    return mutateAsync()
      .then(async () => {
        // optionally mutate related data
      })
      .catch((e) => {
        // listen for a specific error and act respectively (e.g. throwing a specific error and catch it later)

        // notify backend about the error if needed
        Logger.error("An error occurred during clearing the cart", e as Error);

        throw e;
      });
  };

  return [handler, isLoading] as const;
};
