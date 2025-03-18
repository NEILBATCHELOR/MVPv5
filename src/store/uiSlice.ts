// src/store/uiSlice.ts
import { StateCreator } from "zustand";

export interface UIState {
  activeTab: string;
  isLoading: boolean;
  setActiveTab: (tab: string) => void;
  setLoading: (loading: boolean) => void;
}

export const uiSlice: StateCreator<UIState> = (set) => ({
  activeTab: "tokens",
  isLoading: false,
  setActiveTab: (tab: string) => set({ activeTab: tab }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
});