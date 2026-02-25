let draft = null;
let versions = [];
let exportJobs = {};
let shareLinks = {};

function wait(ms = 400) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function loadDraft() {
  await wait(300);
  return draft;
}

export async function saveDraft(payload) {
  await wait(500);
  draft = { ...payload, updatedAt: new Date().toISOString() };
  return draft;
}

export async function createVersion(payload) {
  await wait(600);
  const version = {
    id: crypto.randomUUID(),
    name: `Version ${versions.length + 1}`,
    createdAt: new Date().toISOString(),
    payload
  };
  versions = [version, ...versions];
  return version;
}

export async function listVersions() {
  await wait(300);
  return versions;
}

export async function restoreVersion(versionId) {
  await wait(400);
  const v = versions.find((x) => x.id === versionId);
  if (!v) throw new Error("Version not found");
  draft = { ...v.payload, updatedAt: new Date().toISOString() };
  return draft;
}

export async function createExportJob() {
  await wait(300);
  const id = crypto.randomUUID();
  exportJobs[id] = { id, status: "processing", progress: 10 };
  setTimeout(() => {
    exportJobs[id] = { ...exportJobs[id], progress: 55 };
  }, 700);
  setTimeout(() => {
    exportJobs[id] = { ...exportJobs[id], progress: 85 };
  }, 1200);
  setTimeout(() => {
    exportJobs[id] = { id, status: "done", progress: 100, url: "https://example.com/resume.pdf" };
  }, 1500);
  return exportJobs[id];
}

export async function getExportJob(jobId) {
  await wait(300);
  return exportJobs[jobId];
}

export async function createShareLink({ password }) {
  await wait(300);
  const id = crypto.randomUUID();
  const slug = Math.random().toString(36).slice(2, 8);
  shareLinks[id] = {
    id,
    slug,
    url: `http://localhost:5173/r/${slug}`,
    passwordProtected: Boolean(password)
  };
  return shareLinks[id];
}

export async function revokeShareLink(id) {
  await wait(300);
  delete shareLinks[id];
  return true;
}
