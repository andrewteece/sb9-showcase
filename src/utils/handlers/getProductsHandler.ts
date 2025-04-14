import { http, HttpResponse } from "msw";

import { buildUrl } from "utils";
import { ProductFixture } from "utils/fixtures";
import { host } from "utils/http";

import type { GetResolver } from "./resolvers";

export const getProductsHandler = (resolver?: GetResolver) =>
  http.get(
    `${host}/${buildUrl("products", { limit: 10, sort: "asc" })}`,
    (req) => {
      if (resolver) return resolver(req);

      return HttpResponse.json(
        ProductFixture.createCollection([{ id: 1 }, { id: 2 }])
      );
    }
  );
