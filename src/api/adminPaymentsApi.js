import http from "./http";

export const adminPaymentsApi = {
  list: (params) => http.get("/admin/payments", { params })
};
