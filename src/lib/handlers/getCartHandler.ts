import { http, HttpResponse } from "msw";

import type { GetResolver } from "./resolvers";
import { host } from "@/lib/http";
import { CartFixture } from "@/lib/fixtures/CartFixture";

export const getCartHandler = (resolver?: GetResolver) =>
  http.get(`${host}/carts/:cartId`, (req) => {
    if (resolver) return resolver(req);

    return HttpResponse.json(CartFixture.toStructure());
  });
