import http from "./http";

export const exportsApi = {
  create: (versionId) => http.post(`/exports/${versionId}`),
  status: (exportId) => http.get(`/exports/${exportId}`),
  exportResumePdf: (payload) =>
    http.post("/exports/resume/pdf", payload, {
      responseType: "blob",
      headers: { Accept: "application/pdf, application/json" },
      timeout: 90000
    }),
  download: (urlOrId) => {
    if (typeof urlOrId === "string") {
      if (urlOrId.startsWith("http://") || urlOrId.startsWith("https://")) {
        return http.get(urlOrId, { responseType: "blob" });
      }
      if (urlOrId.startsWith("/api/")) {
        const normalized = urlOrId.replace(/^\/api/, "");
        return http.get(normalized, { responseType: "blob" });
      }
    }
    return http.get(`/exports/${urlOrId}/file`, { responseType: "blob" });
  }
};
