import type { Branded } from "@/types/Branded";

import { Category } from "./Category";
import type { IRating } from "./IRating";

export type ProductId = Branded<number, "ProductId">;

export interface IProduct {
  id: ProductId;
  title: string;
  description: string;
  category: Category;
  image: string;
  price: number;
  rating: IRating;
}
