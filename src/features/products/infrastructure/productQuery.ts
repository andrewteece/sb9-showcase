import type { UseQueryOptions } from "@tanstack/react-query";

import type { IProductDto } from "@/features/products/infrastructure/types/IProductDto";
import type { IProduct } from "@/features/products/types/IProduct";
import { httpService } from "@/lib/http";
import { queryClient, useQuery } from "@/lib/query";

export const getProductQueryKey = (productId: string) => ["product", productId];

export const getProductQuery = (productId: string) => ({
  queryKey: getProductQueryKey(productId),
  queryFn: (): Promise<IProduct> =>
    httpService.get<IProductDto>(`products/${productId}`),
});

export const useProductQuery = (
  productId: string,
  options?: UseQueryOptions<IProduct>
) => {
  return useQuery({
    ...getProductQuery(productId),
    ...options,
  });
};

export const productLoader = async (productId: string) =>
  queryClient.ensureQueryData(getProductQuery(productId));
