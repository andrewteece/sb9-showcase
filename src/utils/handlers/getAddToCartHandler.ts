import { http, HttpResponse } from "msw";

import { host } from "utils/http";

import { PutResolver } from "./resolvers";

export const getAddToCartHandler = (resolver?: PutResolver) =>
  http.put(`${host}/carts/:cartId`, (req) => {
    if (resolver) return resolver(req);

    return HttpResponse.json({});
  });
