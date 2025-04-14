import { http, HttpResponse } from "msw";

import { UserFixture } from "utils/fixtures";
import { host } from "utils/http";

import type { GetResolver } from "./resolvers";

export const getUserHandler = (resolver?: GetResolver) =>
  http.get(`${host}/users/:userId`, (req) => {
    if (resolver) return resolver(req);

    return HttpResponse.json(UserFixture.toStructure());
  });
