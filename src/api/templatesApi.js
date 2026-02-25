import http from "./http";

export const templatesApi = {
  list: () => http.get("/templates")
};
