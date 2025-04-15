import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import { useRef, type RefObject } from "react";

import { usePurchaseDialogStore } from "@/features/carts/presentation/CheckoutButton/usePurchaseDialogStore";
import { t } from "@/lib/format/message";

import { CheckoutForm } from "../CheckoutForm";

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
