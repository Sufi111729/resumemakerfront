import { useEffect, useState } from "react";
import { resumeApi } from "../../api/resumeApi";
import { exportsApi } from "../../api/exportsApi";
import { shareApi } from "../../api/shareApi";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { EmptyState } from "../../components/ui/EmptyState";
import { Skeleton } from "../../components/ui/Skeleton";
import { Link } from "react-router-dom";
import { uiStore } from "../../state/uiStore";

export function ResumesPage() {
  const { pushToast } = uiStore();
  const [loading, setLoading] = useState(true);
  const [resumes, setResumes] = useState([]);
  const [query, setQuery] = useState("");
  const [actionBusy, setActionBusy] = useState({});

  const load = async () => {
    setLoading(true);
    try {
      const res = await resumeApi.list();
      setResumes(res.data || []);
    } catch (err) {
      pushToast({ title: "Failed", message: err.message || "Could not load resumes" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async () => {
    try {
      const res = await resumeApi.create({ title: "Untitled Resume" });
      setResumes((prev) => [res.data, ...prev]);
      pushToast({ title: "Created", message: "Resume created" });
    } catch (err) {
      pushToast({ title: "Failed", message: err.message || "Could not create resume" });
    }
  };

  const filtered = resumes.filter((r) => r.title?.toLowerCase().includes(query.toLowerCase()));

  const setBusy = (id, key, value) => {
    setActionBusy((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || {}), [key]: value }
    }));
  };

  const handleDuplicate = async (resume) => {
    setBusy(resume.id, "duplicate", true);
    try {
      const res = await resumeApi.create({ title: `${resume.title || "Untitled"} (Copy)` });
      const newResume = res.data;
      if (resume.data || resume.sectionsOrder || resume.templateKey) {
        await resumeApi.autosave(newResume.id, {
          data: resume.data || {},
          sectionsOrder: resume.sectionsOrder || [],
          templateKey: resume.templateKey || "modern"
        });
      }
      setResumes((prev) => [newResume, ...prev]);
      pushToast({ title: "Duplicated", message: "Resume copy created" });
    } catch (err) {
      pushToast({ title: "Failed", message: err.message || "Could not duplicate resume" });
    } finally {
      setBusy(resume.id, "duplicate", false);
    }
  };

  const handleExport = async (resume) => {
    setBusy(resume.id, "export", true);
    pushToast({ title: "Export started", message: "Rendering high-quality PDF..." });
    try {
      const res = await exportsApi.exportResumePdf({ resumeId: resume.id, pageSize: "A4", includeHeaderFooter: false });
      await savePdfBlobResponse(res, pushToast);
    } catch (err) {
      setBusy(resume.id, "export", false);
      pushToast({ title: "Export failed", message: (await parseBlobErrorMessage(err)) || err.message || "Try again" });
      return;
    }
    setBusy(resume.id, "export", false);
  };

  const handleShare = async (resume) => {
    setBusy(resume.id, "share", true);
    try {
      const res = await shareApi.create(resume.id, { passwordProtected: false });
      const url = res.data.url || `${window.location.origin}/r/${res.data.slug}`;
      try {
        await navigator.clipboard.writeText(url);
        pushToast({ title: "Share link copied", message: url });
      } catch {
        pushToast({ title: "Share link", message: url });
      }
    } catch (err) {
      pushToast({ title: "Share failed", message: err.message || "Try again" });
    } finally {
      setBusy(resume.id, "share", false);
    }
  };

  const handleDelete = async (resume) => {
    setBusy(resume.id, "delete", true);
    try {
      await resumeApi.remove(resume.id);
      setResumes((prev) => prev.filter((r) => r.id !== resume.id));
      pushToast({ title: "Deleted", message: "Resume removed" });
    } catch (err) {
      pushToast({ title: "Failed", message: err.message || "Could not delete resume" });
    } finally {
      setBusy(resume.id, "delete", false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">My Resumes</h1>
          <p className="text-sm text-ink/60">Create and manage your resumes.</p>
        </div>
        <Button onClick={handleCreate}>New Resume</Button>
      </div>

      <div className="flex items-center gap-3">
        <Input placeholder="Search resumes" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No resumes yet"
          description="Create your first resume to get started."
          action={<Button onClick={handleCreate}>Create Resume</Button>}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((resume) => (
            <Card key={resume.id} className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-lg font-semibold">{resume.title}</div>
                  <div className="text-xs text-ink/50">Updated {new Date(resume.updatedAt).toLocaleDateString()}</div>
                </div>
                <Link to={`/app/resume/${resume.id}/editor`}>
                  <Button size="sm">Edit</Button>
                </Link>
              </div>
              <div className="mt-4 flex gap-3 text-sm text-ink/60">
                <button
                  onClick={() => handleDuplicate(resume)}
                  disabled={actionBusy[resume.id]?.duplicate}
                >
                  {actionBusy[resume.id]?.duplicate ? "Duplicating..." : "Duplicate"}
                </button>
                <button
                  onClick={() => handleExport(resume)}
                  disabled={actionBusy[resume.id]?.export}
                >
                  {actionBusy[resume.id]?.export ? "Exporting..." : "Export"}
                </button>
                <button
                  onClick={() => handleShare(resume)}
                  disabled={actionBusy[resume.id]?.share}
                >
                  {actionBusy[resume.id]?.share ? "Sharing..." : "Share"}
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(resume)}
                  disabled={actionBusy[resume.id]?.delete}
                >
                  {actionBusy[resume.id]?.delete ? "Deleting..." : "Delete"}
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

async function savePdfBlobResponse(res, pushToast) {
  try {
    const contentType = (res.headers?.["content-type"] || "").toLowerCase();
    if (contentType.includes("application/json")) {
      const text = await res.data.text();
      const parsed = JSON.parse(text);
      throw new Error(parsed?.message || parsed?.error || "Export failed");
    }
    const disposition = res.headers?.["content-disposition"] || "";
    const filename = getFilenameFromDisposition(disposition) || "resume.pdf";
    const blob = res.data instanceof Blob ? res.data : new Blob([res.data], { type: contentType || "application/pdf" });
    const blobUrl = URL.createObjectURL(blob);

    const isPdf = contentType.includes("application/pdf") || filename.toLowerCase().endsWith(".pdf");

    if (isPdf) {
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      pushToast({ title: "Export ready", message: "PDF downloaded." });
    } else {
      window.open(blobUrl, "_blank", "noopener,noreferrer");
      pushToast({ title: "Export ready", message: "Opened in new tab." });
    }

    setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
  } catch (err) {
    pushToast({ title: "Export failed", message: err?.message || "Try again" });
  }
}

async function parseBlobErrorMessage(error) {
  const blob = error?.response?.data;
  if (!(blob instanceof Blob)) return null;
  try {
    const text = await blob.text();
    const parsed = JSON.parse(text);
    return parsed?.message || parsed?.error || null;
  } catch {
    return null;
  }
}

function getFilenameFromDisposition(disposition) {
  const utf8 = disposition.match(/filename\*=UTF-8''([^;]+)/i);
  if (utf8?.[1]) return decodeURIComponent(utf8[1].replace(/["']/g, "").trim());
  const ascii = disposition.match(/filename=([^;]+)/i);
  if (ascii?.[1]) return ascii[1].replace(/["']/g, "").trim();
  return null;
}
