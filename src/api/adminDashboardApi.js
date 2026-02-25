import http from "./http";

export const adminDashboardApi = {
  metrics: () => http.get("/admin/metrics"),
  recentActivity: () => http.get("/admin/activity")
};
