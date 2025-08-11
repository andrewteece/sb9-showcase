import { useColorModeValue } from "@chakra-ui/react";

/**
 * Brand text color for links/brand accents (AA on light/dark).
 * Use for text/icon color – not button backgrounds (see theme Button.solid).
 */
export function useBrandColor() {
  return useColorModeValue("blue.700", "blue.300");
}

/** Optional: hover color for brand text */
export function useBrandHoverColor() {
  return useColorModeValue("blue.800", "blue.200");
}

/** Optional: ready-to-spread props for a solid brand button (AA) */
export function useBrandButtonColors() {
  return {
    color: "white",
    bg: useColorModeValue("blue.700", "blue.300"),
    _hover: { bg: useColorModeValue("blue.800", "blue.200") },
    _active: { bg: useColorModeValue("blue.900", "blue.100") },
  } as const;
}
