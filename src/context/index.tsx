import { ReactNode } from "react";
import { AuthProvider } from "./context-data/auth-context";
import { QueryClientProvider, QueryClient } from "react-query";

// 1. 提供一个入口，包裹全局的APP
export const AppProvicers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};
