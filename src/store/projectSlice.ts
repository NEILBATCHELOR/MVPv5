// src/store/projectSlice.ts
import { StateCreator } from "zustand";

export interface ProjectState {
  selectedProjectId: string | null;
  projectName: string;
  setSelectedProject: (projectId: string, name: string) => void;
  clearProject: () => void;
}

export const projectSlice: StateCreator<ProjectState> = (set) => ({
  selectedProjectId: null,
  projectName: "",
  setSelectedProject: (projectId: string, name: string) =>
    set({ selectedProjectId: projectId, projectName: name }),
  clearProject: () => set({ selectedProjectId: null, projectName: "" }),
});