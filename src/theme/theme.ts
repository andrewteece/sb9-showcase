import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  semanticTokens: {
    colors: {
      // Use this everywhere you want branded body text
      "brand.text": {
        default: "orange.700", // AA on light backgrounds
        _dark: "orange.200", // readable on dark backgrounds
      },
      "text.muted": {
        default: "gray.700", // passes on white
        _dark: "gray.300", // readable on dark bg
      },
    },
  },
});
