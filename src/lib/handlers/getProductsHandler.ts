import { http, HttpResponse } from "msw";

import type { GetResolver } from "./resolvers";
import { host } from "@/lib/http";
import { buildUrl } from "@/lib/buildUrl";
import { ProductFixture } from "@/lib/fixtures/ProductFixture";

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
