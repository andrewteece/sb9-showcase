import { DeleteIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

import {
  ConfirmClearCartDialog,
  useConfirmClearCartDialogStore,
} from "./ConfirmClearCartDialog";
import { t } from "@/lib/format/message";

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
