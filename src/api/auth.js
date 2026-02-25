import http from "./http";

export async function login(payload) {
  const res = await http.post("/auth/login", payload);
  return res.data;
}

export async function register(payload) {
  const res = await http.post("/auth/register", payload);
  return res.data;
}

export async function refreshToken(refreshTokenValue) {
  const res = await http.post("/auth/refresh", { refreshToken: refreshTokenValue });
  return res.data;
}
