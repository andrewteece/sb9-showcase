import { withRequireAuth } from "@/features/auth/application/withRequireAuth";
import { useCartProductsQuery } from "@/features/carts/infrastructure/useCartProductsQuery";
import { CartsList } from "@/features/carts/presentation/CartsList";
import { ClearCartButton } from "@/features/carts/presentation/ClearCartButton/ClearCartButton";
import { Page } from "@/lib/components/Layout/Page";
import { PageHeader } from "@/lib/components/Layout/PageHeader";
import { ErrorPageStrategy } from "@/lib/components/Result/ErrorPageStrategy";
import { useParams } from "@/lib/components/Router";
import { dateVO } from "@/lib/format/Date";
import { t } from "@/lib/format/message";

const CartPage = () => {
  const params = useParams<{ cartId: string }>();
  const { data } = useCartProductsQuery(params.cartId!);

  return (
    <Page>
      <PageHeader
        title={t("List of selected products")}
        description={t(
          "These are all products that you yet chose (updated {time}).",
          {
            time: dateVO.formatRelativeTime(data.date),
          }
        )}
      >
        <ClearCartButton />
      </PageHeader>
      <CartsList
        cartProducts={data.products.map((product) => ({
          id: product.id,
          title: product.title,
          price: product.price,
          imageUrl: product.image,
          category: product.category,
          quantity: product.quantity,
        }))}
      />
    </Page>
  );
};

export const Component = withRequireAuth(CartPage, { to: "/sign-in" });

export const ErrorBoundary = ErrorPageStrategy;
