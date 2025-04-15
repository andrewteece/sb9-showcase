import { Category } from "@/features/products/types/Category";
import { t } from "@/lib/format/message";

export const useCategoryLabel = (category: Category) => {
  const message = messages[category];

  return t(message) ?? category;
};

const messages = {
  [Category.Women_clothing]: "Women's clothing",
  [Category.Men_clothing]: "Men's clothing",
  [Category.Jewelery]: "Jewelery",
  [Category.Electronics]: "Electronics",
};
