import { http, HttpResponse } from "msw";

import type { GetResolver } from "./resolvers";
import { host } from "@/lib/http";
import { ProductFixture } from "@/lib/fixtures/ProductFixture";

export const getProductHandler = (resolver?: GetResolver) =>
  http.get(`${host}/products/:productId`, (req) => {
    if (resolver) return resolver(req);

    return HttpResponse.json(ProductFixture.toStructure());
  });
