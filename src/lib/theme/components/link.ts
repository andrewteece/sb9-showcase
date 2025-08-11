import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const baseStyle = defineStyle(({ colorMode }) => ({
  color: colorMode === "light" ? "blue.700" : "blue.300",
  _hover: {
    color: colorMode === "light" ? "blue.800" : "blue.200",
    textDecoration: "underline",
  },
}));

export const Link = defineStyleConfig({ baseStyle });
