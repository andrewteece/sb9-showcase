import { productLoader } from "@/features/products/infrastructure/productQuery";
import type { LoaderFunctionArgs } from "@/lib/components/Router";

export const productPageLoader = ({ params }: LoaderFunctionArgs) => {
  return productLoader((params as { productId: string }).productId);
};
