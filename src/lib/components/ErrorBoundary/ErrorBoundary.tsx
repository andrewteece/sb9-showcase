/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType, ReactNode } from "react";
import {
  ErrorBoundary as Boundary,
  type ErrorBoundaryPropsWithFallback,
} from "react-error-boundary";

import { ErrorPageStrategy } from "@/lib/components/Result/ErrorPageStrategy";

export interface FallbackProps<ErrorType> {
  error: ErrorType;
}

export type ErrorFallback<ErrorType> = ComponentType<FallbackProps<ErrorType>>;

interface ErrorBoundaryProps<ErrorType> {
  onResetKeysChange?: ErrorBoundaryPropsWithFallback["onResetKeysChange"];
  onReset?: () => void;
  onError?: (
    error: Error,
    info: {
      componentStack: string;
    }
  ) => void;
  fallback?: ErrorFallback<ErrorType> | React.ReactElement<any, any>;
  resetKeys?: any[];
}

export interface IErrorBoundaryProps<ErrorType>
  extends ErrorBoundaryProps<ErrorType> {
  children: ReactNode;
}

export function ErrorBoundary<ErrorType extends Error>({
  fallback,
  children,
  ...props
}: IErrorBoundaryProps<ErrorType>) {
  return (
    <Boundary
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      FallbackComponent={(fallback as any) ?? ErrorPageStrategy}
      {...props}
    >
      {children}
    </Boundary>
  );
}
