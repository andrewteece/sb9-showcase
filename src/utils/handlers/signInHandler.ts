import { http, HttpResponse } from "msw";

import { host } from "utils/http";

import { PostResolver } from "./resolvers";

export const getSignInHandler = (resolver?: PostResolver) =>
  http.post(`${host}/auth/login`, (req) => {
    if (resolver) return resolver(req);

    return HttpResponse.json({ token: "authtoken" });
  });
