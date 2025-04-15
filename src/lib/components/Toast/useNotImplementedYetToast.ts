import { t } from "@/lib/format/message";

import { useToast } from "./useToast";

export const useNotImplementedYetToast = () => {
  const toast = useToast();

  return () =>
    toast({
      status: "info",
      title: t("Feature not available yet"),
      description: t("We are working on it day and night :))"),
    });
};
