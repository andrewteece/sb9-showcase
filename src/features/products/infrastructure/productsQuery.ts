import type { UseQueryOptions } from "@tanstack/react-query";

import type { IProductDto } from "@/features/products/infrastructure/types/IProductDto";
import type { IProduct } from "@/features/products/types/IProduct";
import { buildUrl } from "@/lib/buildUrl";
import { httpService } from "@/lib/http";
import { queryClient, useQuery } from "@/lib/query";
import type { IMeta } from "@/types/IMeta";
import type { IQueryParams } from "@/types/IQueryParams";

const defaultParams = { limit: 10, sort: "asc" };

interface ICollection {
  products: IProduct[];
  meta: IMeta;
}

export const getProductsQueryKey = (params: IQueryParams = defaultParams) => [
  "products",
  params,
];

const getProductsQuery = (params: IQueryParams = defaultParams) => ({
  queryKey: getProductsQueryKey(params),
  queryFn: (): Promise<ICollection> =>
    httpService
      .get<IProductDto[]>(buildUrl("products", params))
      .then((res) => ({
        products: res,
        meta: {
          ...params,
          total: 20,
        },
      })),
});

export const useProductsQuery = (
  params: IQueryParams = defaultParams,
  options?: UseQueryOptions<ICollection>
) => {
  return useQuery({
    ...getProductsQuery(params),
    ...options,
  });
};

export const productsLoader = async (params: IQueryParams = defaultParams) =>
  queryClient.ensureQueryData(getProductsQuery(params));
