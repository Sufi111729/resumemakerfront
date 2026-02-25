import { create } from "zustand";

const storageKey = "proresume_tokens";

function readStored() {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : { accessToken: null, refreshToken: null, role: "USER" };
  } catch {
    return { accessToken: null, refreshToken: null, role: "USER" };
  }
}

function writeStored(tokens) {
  localStorage.setItem(storageKey, JSON.stringify(tokens));
}

export const useAuthStore = create((set) => ({
  ...readStored(),
  setTokens: (tokens) => {
    writeStored(tokens);
    set(tokens);
  },
  clear: () => {
    writeStored({ accessToken: null, refreshToken: null, role: "USER" });
    set({ accessToken: null, refreshToken: null, role: "USER" });
  }
}));

export function getAuthTokens() {
  const state = useAuthStore.getState();
  return { accessToken: state.accessToken, refreshToken: state.refreshToken };
}

export function setAuthTokens(tokens) {
  useAuthStore.getState().setTokens(tokens);
}

export function clearAuthTokens() {
  useAuthStore.getState().clear();
}
