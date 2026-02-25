import http from "./http";

export const adminTemplatesApi = {
  list: () => http.get("/admin/templates"),
  create: (payload) => http.post("/admin/templates", payload),
  update: (id, payload) => http.patch(`/admin/templates/${id}`, payload)
};
