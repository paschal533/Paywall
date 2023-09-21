import React from "react";

import { useCompanies } from "@/hooks/useCompanies";

type Context = ReturnType<typeof useCompanies>;

export const CompanyContext = React.createContext<Context>({} as Context);

interface Props {
  children: React.ReactNode;
}

export const CompanyProvider = ({ children }: Props) => {
  const value = useCompanies();

  return (
    <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>
  );
};
