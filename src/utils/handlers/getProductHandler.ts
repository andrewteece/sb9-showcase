import { http, HttpResponse } from "msw";

import { ProductFixture } from "utils/fixtures";
import { host } from "utils/http";

import type { GetResolver } from "./resolvers";

export const getProductHandler = (resolver?: GetResolver) =>
  http.get(`${host}/products/:productId`, (req) => {
    if (resolver) return resolver(req);

    return HttpResponse.json(ProductFixture.toStructure());
  });
