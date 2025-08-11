import { useColorModeValue } from "@chakra-ui/react";

export function useSecondaryTextColor() {
  return useColorModeValue("gray.700", "gray.300");
}
