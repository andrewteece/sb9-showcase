import { useRef, type RefObject } from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";

import { CheckoutForm } from "../CheckoutForm";
import { createModalStore } from "@/lib/components/Modal/createModalStore";
import { t } from "@/lib/format/message";

export const usePurchaseDialogStore = createModalStore();

const CheckoutDialog = () => {
  const cancelRef = useRef<HTMLButtonElement>();

  const { isOpen, onClose } = usePurchaseDialogStore((state) => ({
    isOpen: state.isOpen,
    onClose: state.onClose,
  }));

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef as RefObject<HTMLButtonElement>}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent pb={4}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {t("Checkout")}
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <CheckoutForm onSuccess={onClose} />
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export { CheckoutDialog };
