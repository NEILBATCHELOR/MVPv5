// src/context/StoreProvider.tsx
import React, { createContext, useContext, ReactNode } from "react";
import { useStore } from "@/store/store";

const StoreContext = createContext<ReturnType<typeof useStore> | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const store = useStore;
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStoreContext must be used within a StoreProvider");
  }
  return context;
};