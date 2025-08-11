import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const solid = defineStyle((props) => {
  const { colorScheme: c, colorMode } = props;

  // darker in light mode, lighter in dark mode
  const shade = colorMode === "light" ? 700 : 300;
  const hover = colorMode === "light" ? 800 : 200;
  const active = colorMode === "light" ? 900 : 100;

  return {
    bg: `${c}.${shade}`,
    color: "white",
    _hover: { bg: `${c}.${hover}` },
    _active: { bg: `${c}.${active}` },
    _focusVisible: { boxShadow: "outline" },
  };
});

export const Button = defineStyleConfig({
  variants: { solid }, // outline/ghost remain Chakra defaults
});
