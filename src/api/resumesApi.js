import http from "./http";

export const listResumes = () => http.get("/resumes").then((r) => r.data);
export const createResume = (payload) => http.post("/resumes", payload).then((r) => r.data);
export const updateResume = (id, payload) => http.put(`/resumes/${id}`, payload).then((r) => r.data);
export const deleteResume = (id) => http.delete(`/resumes/${id}`).then((r) => r.data);
export const autosaveDraft = (id, payload) => http.post(`/resumes/${id}/draft`, payload).then((r) => r.data);
export const saveVersion = (id, draftId) =>
  http.post(`/resumes/${id}/versions/${draftId}/publish`).then((r) => r.data);
export const listVersions = (id) => http.get(`/resumes/${id}/versions`).then((r) => r.data);
