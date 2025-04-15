import type { IProduct } from "@/features/products/types/IProduct";

export interface ICartProduct extends IProduct {
  quantity: number;
}
