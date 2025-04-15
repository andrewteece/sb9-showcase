import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

import { useProductQuery } from "@/features/products/infrastructure/productQuery";
import { ProductDetails } from "@/features/products/presentation/ProductDetails";
import { ProductNotFoundResult } from "@/features/products/presentation/ProductNotFoundResult";
import { Page } from "@/lib/components/Layout/Page";
import { InternalErrorResult } from "@/lib/components/Result/InternalErrorResult";
import { useNavigate, useParams, useRouteError } from "@/lib/components/Router";
import { t } from "@/lib/format/message";
import { ResourceNotFoundException } from "@/lib/http/exceptions/ResourceNotFoundException";

const ProductPage = () => {
  const params = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { data } = useProductQuery(params.productId!);

  return (
    <Page spacing={6}>
      <Button
        leftIcon={<ArrowBackIcon />}
        variant="link"
        onClick={() => navigate("/products")}
      >
        {t("Back to products' list")}
      </Button>
      <ProductDetails product={data} onBack={() => navigate("/products")} />
    </Page>
  );
};

export const Component = ProductPage;

export const ErrorBoundary = () => {
  const error = useRouteError();

  if (error instanceof ResourceNotFoundException) {
    return <ProductNotFoundResult />;
  }

  return <InternalErrorResult />;
};
