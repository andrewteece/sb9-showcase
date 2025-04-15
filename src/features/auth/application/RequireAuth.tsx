import type { ReactNode } from "react";

import { useAuthStore } from "./authStore";
import { Navigate } from "@/lib/components/Router";

export interface IRequireAuthProps {
  children: ReactNode;
  to?: string;
}

const RequireAuth = ({ children, to }: IRequireAuthProps) => {
  const isAuthenticated = useAuthStore((store) => store.isAuthenticated);

  return isAuthenticated ? <>{children}</> : <Navigate to={to ?? "/"} />;
};

export { RequireAuth };
