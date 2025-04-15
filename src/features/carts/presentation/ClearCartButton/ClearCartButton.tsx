import { DeleteIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

import { useConfirmClearCartDialogStore } from "@/features/carts/presentation/ClearCartButton/useConfirmClearCartDialogStore";
import { t } from "@/lib/format/message";

import { ConfirmClearCartDialog } from "./ConfirmClearCartDialog";

const ClearCartButton = () => {
  const onOpen = useConfirmClearCartDialogStore((state) => state.onOpen);

  return (
    <>
      <Button leftIcon={<DeleteIcon />} onClick={() => onOpen()}>
        {t("Clear cart")}
      </Button>
      <ConfirmClearCartDialog />
    </>
  );
};

export { ClearCartButton };
