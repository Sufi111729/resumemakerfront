import { create } from "zustand";

const storageKey = "proresume-auth";

const readStorage = () => {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeStorage = (state) => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    // ignore
  }
};

const initial = readStorage() || {
  accessToken: null,
  refreshToken: null,
  user: null
};

export const authStore = create((set) => ({
  accessToken: initial.accessToken,
  refreshToken: initial.refreshToken,
  user: initial.user,
  setTokens: (accessToken, refreshToken) =>
    set((state) => {
      const next = { ...state, accessToken, refreshToken };
      writeStorage(next);
      return next;
    }),
  setUser: (user) =>
    set((state) => {
      const next = { ...state, user };
      writeStorage(next);
      return next;
    }),
  logout: () =>
    set(() => {
      const next = { accessToken: null, refreshToken: null, user: null };
      writeStorage(next);
      return next;
    })
}));
