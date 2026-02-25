export function mockDelay(ms = 400) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function mockLogin() {
  await mockDelay();
  return { accessToken: "dev-access", refreshToken: "dev-refresh", role: "ADMIN" };
}
