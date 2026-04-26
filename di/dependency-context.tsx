import React, { createContext, PropsWithChildren, useContext } from "react";
import { AuthService, createAuthService } from "../services/auth-service";
import { consoleLogger, Logger } from "../services/logger";

export type AppDependencies = {
  authService: AuthService;
  logger: Logger;
};

const defaultDependencies: AppDependencies = {
  logger: consoleLogger,
  authService: createAuthService(consoleLogger),
};

const DependencyContext = createContext<AppDependencies | undefined>(undefined);

type DependencyProviderProps = PropsWithChildren<{
  dependencies?: AppDependencies;
}>;

export const DependencyProvider = ({
  children,
  dependencies = defaultDependencies,
}: DependencyProviderProps) => (
  <DependencyContext.Provider value={dependencies}>
    {children}
  </DependencyContext.Provider>
);

export const useDependencies = () => {
  const dependencies = useContext(DependencyContext);

  if (!dependencies) {
    throw new Error("useDependencies must be used within a DependencyProvider");
  }

  return dependencies;
};
