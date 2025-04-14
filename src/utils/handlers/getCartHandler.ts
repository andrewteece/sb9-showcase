import { http, HttpResponse } from "msw";

import { CartFixture } from "utils/fixtures";
import { host } from "utils/http";

import type { GetResolver } from "./resolvers";

export const getCartHandler = (resolver?: GetResolver) =>
  http.get(`${host}/carts/:cartId`, (req) => {
    if (resolver) return resolver(req);

    return HttpResponse.json(CartFixture.toStructure());
  });
