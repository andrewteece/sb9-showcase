import { http, HttpResponse } from "msw";

import type { DeleteResolver } from "./resolvers";
import { host } from "@/lib/http";

export const getClearCartHandler = (resolver?: DeleteResolver) =>
  http.delete(`${host}/carts/:cartId`, (req) => {
    if (resolver) return resolver(req);

    return HttpResponse.json({});
  });
