// src/features/carts/presentation/CheckoutButton/CheckoutButton.tsx
import { Button } from "@chakra-ui/react";

import { useTranslations } from "@/lib/i18n/useTransations";

import { CheckoutDialog } from "./CheckoutDialog";
import { usePurchaseDialogStore } from "./usePurchaseDialogStore";

const CheckoutButton = () => {
  const onOpen = usePurchaseDialogStore((s) => s.onOpen);
  const t = useTranslations("features.carts.checkout");

  return (
    <>
      <Button
        w="100%"
        color="white"
        bg="orange.700" // darker = AA contrast with white
        _hover={{ bg: "orange.800" }}
        _active={{ bg: "orange.900" }}
        _focusVisible={{ boxShadow: "outline" }}
        onClick={onOpen}
      >
        {t("button")}
      </Button>
      <CheckoutDialog />
    </>
  );
};

export { CheckoutButton };
