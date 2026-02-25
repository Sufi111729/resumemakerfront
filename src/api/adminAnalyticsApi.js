import http from "./http";

export const adminAnalyticsApi = {
  overview: (range) => http.get("/admin/analytics", { params: { range } })
};
