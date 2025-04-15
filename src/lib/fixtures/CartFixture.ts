import type { ICart } from "@/features/carts/types/ICart";
import { createFixture } from "./createFixture";
import { dateVO } from "@/lib/format/Date";

export const CartFixture = createFixture<ICart>({
  id: 1,
  date: dateVO.past(),
  userId: 1,
  products: [{ productId: 1, quantity: 2 }],
});
