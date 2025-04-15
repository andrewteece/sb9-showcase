import type { ICart } from "@/features/carts/types/ICart";
import { dateVO } from "@/lib/format/Date";

import { createFixture } from "./createFixture";

export const CartFixture = createFixture<ICart>({
  id: 1,
  date: dateVO.past(),
  userId: 1,
  products: [{ productId: 1, quantity: 2 }],
});
