// .storybook/vitest.setup.ts
import { setProjectAnnotations } from "@storybook/react-vite";

import * as preview from "./preview";

export const annotations = setProjectAnnotations([preview]);
