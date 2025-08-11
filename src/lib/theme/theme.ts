// src/lib/theme.ts
import { extendTheme, defineStyle, defineStyleConfig } from "@chakra-ui/react";

interface ThemeStyleProps {
  colorMode: "light" | "dark";
  colorScheme?: string;
}

/** Solid buttons: AA by default for any colorScheme */
const solid = defineStyle((props: ThemeStyleProps) => {
  const scheme = props.colorScheme ?? "blue";
  const isLight = props.colorMode === "light";
  const shade = isLight ? 700 : 300;
  const hover = isLight ? 800 : 200;
  const active = isLight ? 900 : 100;

  return {
    bg: `${scheme}.${shade}`,
    color: "white",
    _hover: { bg: `${scheme}.${hover}` },
    _active: { bg: `${scheme}.${active}` },
    _focusVisible: { boxShadow: "outline" },
  };
});

/** Link-style buttons use AA-safe link tokens */
const link = defineStyle({
  color: "text.link",
  _hover: { color: "text.linkHover", textDecoration: "underline" },
});

const Button = defineStyleConfig({
  variants: { solid, link },
  // Default to solid, but don't force a colorScheme (let each usage choose)
  defaultProps: { variant: "solid" },
});

export const theme = extendTheme({
  /** Global AA-safe defaults + hard override for Chakra <Link/> */
  styles: {
    global: (props: ThemeStyleProps) => ({
      body: { color: props.colorMode === "light" ? "gray.800" : "gray.100" },

      // Plain <a> fallback
      a: { color: "text.link", textDecoration: "none" },
      "a:hover": { color: "text.linkHover", textDecoration: "underline" },

      // Force Chakra Link to use our link tokens even if something overrides it
      ".chakra-link": {
        color: "var(--chakra-colors-text-link) !important",
        textDecoration: "none",
      },
      ".chakra-link:hover": {
        color: "var(--chakra-colors-text-linkHover) !important",
        textDecoration: "underline",
      },
    }),
  },

  /** Light/dark aware tokens */
  semanticTokens: {
    colors: {
      "chakra-body-text": { _light: "gray.800", _dark: "gray.100" },
      "chakra-subtle-text": { _light: "gray.700", _dark: "gray.300" },
      "chakra-muted-text": { _light: "gray.700", _dark: "gray.300" },

      // AA-safe link colors
      "text.link": { default: "blue.700", _dark: "blue.300" },
      "text.linkHover": { default: "blue.800", _dark: "blue.200" },

      // Reusable success color (e.g., “In stock”)
      "text.success": { default: "green.700", _dark: "green.300" },
    },
  },

  /** Component defaults */
  components: {
    Button,
    Text: {
      baseStyle: (props: ThemeStyleProps) => ({
        color: props.colorMode === "light" ? "gray.800" : "gray.100",
      }),
    },
    Heading: {
      baseStyle: (props: ThemeStyleProps) => ({
        color: props.colorMode === "light" ? "gray.900" : "whiteAlpha.900",
      }),
    },
    Link: {
      baseStyle: {
        color: "text.link",
        _hover: { color: "text.linkHover", textDecoration: "underline" },
      },
    },
  },
});
