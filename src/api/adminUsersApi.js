import http from "./http";

export const adminUsersApi = {
  list: (params) => http.get("/admin/users", { params }),
  block: (id) => http.patch(`/admin/users/${id}/block`),
  unblock: (id) => http.patch(`/admin/users/${id}/unblock`),
  updatePlan: (id, payload) => http.patch(`/admin/users/${id}/plan`, payload)
};
