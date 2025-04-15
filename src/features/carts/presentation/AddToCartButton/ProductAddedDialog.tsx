import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  VStack,
  Text,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import { useRef, type RefObject } from "react";

import { useProductAddedDialogStore } from "@/features/carts/presentation/AddToCartButton/useProductAddedDialogStore";
import { useNavigate } from "@/lib/components/Router";
import { t } from "@/lib/format/message";
import { useSecondaryTextColor } from "@/lib/theme/useSecondaryTextColor";

const ProductAddedDialog = () => {
  const secondaryColor = useSecondaryTextColor();
  const navigate = useNavigate();

  const cancelRef = useRef<HTMLButtonElement>();

  const { isOpen, onClose, cartId } = useProductAddedDialogStore((state) => ({
    isOpen: state.isOpen,
    onClose: state.onClose,
    cartId: state.selectedItem,
  }));

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef as RefObject<HTMLButtonElement>}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {t("New product in the cart")}
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <VStack align="stretch">
              <Text>
                {t(
                  "Wonderful! You have already added a new product to your cart."
                )}
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
              {t("Continue shopping")}
            </Button>
            <Button
              colorScheme="orange"
              onClick={() => {
                onClose();
                navigate(`/cart/${cartId}`);
              }}
              ml={3}
            >
              {t("Go to cart")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export { ProductAddedDialog };
