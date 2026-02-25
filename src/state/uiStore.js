import { create } from "zustand";

let id = 0;

export const uiStore = create((set) => ({
  toasts: [],
  pushToast: (toast) =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        { id: ++id, type: "info", duration: 3500, ...toast }
      ]
    })),
  removeToast: (toastId) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== toastId) }))
}));
