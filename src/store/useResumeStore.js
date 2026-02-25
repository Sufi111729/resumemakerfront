import { create } from "zustand";

const useResumeStore = create((set) => ({
  resumeId: null,
  sections: [],
  setResumeId: (resumeId) => set({ resumeId }),
  setSections: (sections) => set({ sections })
}));

export default useResumeStore;
