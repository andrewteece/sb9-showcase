/* eslint-disable import/no-restricted-paths */

import { useAuthStore } from "@/features/auth/application/authStore";
import { AjaxError } from "@/lib/http/AjaxError";
import { useNavigate, useRouteError } from "@/lib/router";

import { InternalErrorResult } from "./InternalErrorResult";
import { InternalServerErrorResult } from "./InternalServerErrorResult";
import { NotFoundResult } from "./NotFoundResult";

interface ErrorPageStrategyProps {
  // AjaxError is constrained to <T extends Response>, so use the widest valid type
  error?: AjaxError<Response>;
}

export function ErrorPageStrategy({
  error: propError,
}: ErrorPageStrategyProps) {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const routeError = useRouteError();

  // Could be unknown from react-router; narrow via instanceof below
  const candidate: unknown = propError ?? routeError;

  if (candidate instanceof AjaxError) {
    // candidate is AjaxError<unknown> structurally; status exists regardless of T
    switch (candidate.status) {
      case 500:
        return <InternalServerErrorResult />;
      case 401:
        void logout().then(() => navigate("/"));
        return null;
      case 403:
      case 404:
        return <NotFoundResult />;
      default:
        return <InternalErrorResult />;
    }
  }

  return <InternalErrorResult />;
}
