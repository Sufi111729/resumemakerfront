import http from "./http";

export const adminExportsApi = {
  list: (params) => http.get("/admin/exports", { params }),
  retry: (id) => http.post(`/admin/exports/${id}/retry`)
};
