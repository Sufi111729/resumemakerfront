import http from "./http";

export const resumeApi = {
  list: () => http.get("/resumes"),
  get: (id) => http.get(`/resumes/${id}`),
  create: (payload) => http.post("/resumes", payload),
  update: (id, payload) => http.put(`/resumes/${id}`, payload),
  remove: (id) => http.delete(`/resumes/${id}`),
  autosave: (id, payload) => http.post(`/resumes/${id}/draft`, payload),
  createVersion: (id) => http.post(`/resumes/${id}/versions`),
  versions: (id) => http.get(`/resumes/${id}/versions`)
};
