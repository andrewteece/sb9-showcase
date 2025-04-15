import { http, HttpResponse } from "msw";

import { ProductFixture } from "@/lib/fixtures/ProductFixture";
import { host } from "@/lib/http";

import type { GetResolver } from "./resolvers";

export const getProductHandler = (resolver?: GetResolver) =>
  http.get(`${host}/products/:productId`, (req) => {
    if (resolver) return resolver(req);

    return HttpResponse.json(ProductFixture.toStructure());
  });
