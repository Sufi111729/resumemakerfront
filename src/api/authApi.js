import http from "./http";

export const authApi = {
  login: (payload) => http.post("/auth/login", payload),
  register: (payload) => http.post("/auth/register", payload),
  refresh: (payload) => http.post("/auth/refresh", payload),
  sendEmailCode: (payload) => http.post("/auth/send-email-code", payload),
  logout: () => http.post("/auth/logout")
};
