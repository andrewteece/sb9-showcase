import { Button } from "@chakra-ui/react";

import { usePurchaseDialogStore } from "@/features/carts/presentation/CheckoutButton/usePurchaseDialogStore";
import { t } from "@/lib/format/message";

import { CheckoutDialog } from "./CheckoutDialog";

const CheckoutButton = () => {
  const onOpen = usePurchaseDialogStore((state) => state.onOpen);

  return (
    <>
      <Button w="100%" colorScheme="orange" onClick={() => onOpen()}>
        {t("Checkout")}
      </Button>
      <CheckoutDialog />
    </>
  );
};

export { CheckoutButton };
