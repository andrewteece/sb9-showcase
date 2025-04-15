import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useRef, type RefObject } from "react";

import { useClearCart } from "@/features/carts/infrastructure/useClearCart";
import { useConfirmClearCartDialogStore } from "@/features/carts/presentation/ClearCartButton/useConfirmClearCartDialogStore";
import { t } from "@/lib/format/message";
import { useSecondaryTextColor } from "@/lib/theme/useSecondaryTextColor";

import { useClearCartNotifications } from "./useClearCartNotifications";

const ConfirmClearCartDialog = () => {
  const cancelRef = useRef<HTMLButtonElement>();
  const secondaryColor = useSecondaryTextColor();
  const [clear, isLoading] = useClearCart();

  const { isOpen, onClose } = useConfirmClearCartDialogStore((state) => ({
    isOpen: state.isOpen,
    onClose: state.onClose,
  }));

  const [notifySuccess, notifyFailure] = useClearCartNotifications();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef as RefObject<HTMLButtonElement>}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {t("Clear cart")}
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <VStack align="stretch">
              <Text>
                {t("Are you sure? You can't undo this action afterwards.")}
              </Text>
              <Text fontSize="xs" color={secondaryColor}>
                {t(
                  "(because this app uses a fake API, the request will be mocked and won't affect the app's data)"
                )}
              </Text>
            </VStack>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              ref={cancelRef as RefObject<HTMLButtonElement>}
              onClick={onClose}
            >
              {t("Cancel")}
            </Button>
            <Button
              colorScheme="red"
              onClick={async () => {
                try {
                  await clear();
                  notifySuccess();
                } catch {
                  notifyFailure();
                } finally {
                  onClose();
                }
              }}
              isLoading={isLoading}
              ml={3}
            >
              {t("Confirm")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export { ConfirmClearCartDialog };
