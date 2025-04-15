import { Button } from "@chakra-ui/react";

import { CheckoutDialog, usePurchaseDialogStore } from "./CheckoutDialog";
import { t } from "@/lib/format/message";

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
