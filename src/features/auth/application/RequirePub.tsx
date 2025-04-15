import type { ReactNode } from "react";

import { useAuthStore } from "./authStore";
import { Navigate } from "@/lib/components/Router";

export interface IRequirePubProps {
  children: ReactNode;
  to?: string;
}

const RequirePub = ({ children, to }: IRequirePubProps) => {
  const isAuthenticated = useAuthStore((store) => store.isAuthenticated);

  return isAuthenticated ? <Navigate to={to ?? "/"} /> : <>{children}</>;
};

export { RequirePub };
