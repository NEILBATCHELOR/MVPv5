// src/store/store.ts
import { createStore } from "zustand";
import { TokenState, tokenSlice } from "./tokenSlice";
import { ProjectState, projectSlice } from "./projectSlice";
import { UIState, uiSlice } from "./uiSlice";

// Define the overall store state interface
export interface AppState {
  tokens: TokenState;
  projects: ProjectState;
  ui: UIState;
}

// Create the store with initial state and slices
export const useStore = createStore<AppState>((set, get) => ({
  tokens: tokenSlice(set, get),
  projects: projectSlice(set, get),
  ui: uiSlice(set, get),
}));

// Export a hook for easy access to the store
export default useStore;