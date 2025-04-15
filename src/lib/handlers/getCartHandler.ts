import { http, HttpResponse } from "msw";

import { CartFixture } from "@/lib/fixtures/CartFixture";
import { host } from "@/lib/http";

import type { GetResolver } from "./resolvers";

export const getCartHandler = (resolver?: GetResolver) =>
  http.get(`${host}/carts/:cartId`, (req) => {
    if (resolver) return resolver(req);

    return HttpResponse.json(CartFixture.toStructure());
  });
