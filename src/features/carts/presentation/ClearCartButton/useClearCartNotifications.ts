import { useToast } from "@/lib/components/Toast/useToast";
import { t } from "@/lib/format/message";

export const useClearCartNotifications = () => {
  const toast = useToast();

  const success = () =>
    toast({
      status: "success",
      title: t("Clear cart"),
      description: t("Your cart has been successfully cleared."),
    });

  const failure = () =>
    toast({
      status: "error",
      title: t("Clear cart"),
      description: t(
        "Something went wrong with clearing your cart. Pleas try again or contact us."
      ),
    });

  return [success, failure] as const;
};
