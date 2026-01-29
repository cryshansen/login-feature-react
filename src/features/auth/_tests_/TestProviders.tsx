// src/test/TestProviders.tsx
import { PropsWithChildren } from "react";

import { LoadingProvider } from "../../../context/LoadingContext";
import { AuthProvider } from "../context/AuthContext";

export function TestProviders({ children }:PropsWithChildren) {
  return (
    <LoadingProvider>
      <AuthProvider>
          {children}
      </AuthProvider>
    </LoadingProvider>
  );
}
