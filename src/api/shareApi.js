import http from "./http";

export const shareApi = {
  create: (versionId, payload = {}) => http.post(`/share/${versionId}`, payload)
};
