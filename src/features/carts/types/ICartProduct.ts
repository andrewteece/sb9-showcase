// eslint-disable-next-line import/no-restricted-paths
import type { IProduct } from "@/features/products/types/IProduct";

export interface ICartProduct extends IProduct {
  quantity: number;
}
