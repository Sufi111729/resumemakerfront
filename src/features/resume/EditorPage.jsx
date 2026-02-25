import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useParams } from "react-router-dom";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import { Drawer } from "../../components/ui/Drawer";
import { Modal } from "../../components/ui/Modal";
import { resumeApi } from "../../api/resumeApi";
import { templatesApi } from "../../api/templatesApi";
import { exportsApi } from "../../api/exportsApi";
import { shareApi } from "../../api/shareApi";
import { uiStore } from "../../state/uiStore";
import { TemplateModern } from "./templates/TemplateModern";
import { TemplateClassic } from "./templates/TemplateClassic";

const SECTION_LABELS = {
  personal: "Personal",
  summary: "Summary",
  experience: "Experience",
  education: "Education",
  projects: "Projects",
  skills: "Skills",
  certifications: "Certifications",
  links: "Links"
};

const defaultValues = {
  personal: { fullName: "Muhamd Sufiyan", title: "Full Stack Developer", email: "muhamdsufiyan@email.com" },
  summary:
    "Backend-focused Full Stack Developer with hands-on experience building secure, scalable applications using Java, Spring Boot, JPA/Hibernate, and MySQL. Strong in REST API design, JWT-based authentication, role-based access control, and clean service-repository architecture. Skilled in integrating React frontends with production-style backend systems while prioritizing performance, maintainability, and ATS-friendly output quality.",
  experience: [],
  education: [
    {
      id: "edu_1",
      school: "Technocrats Institute of Technology",
      degree: "B.Tech (CSE)",
      start: "",
      end: ""
    }
  ],
  projects: [
    {
      id: "proj_1",
      name: "Multi-Vendor Ecommerce Application",
      summary:
        "Implemented RBAC for Admin, Moderator, Seller, and Buyer workflows using Spring Security + JWT, improving endpoint-level access control across core modules.\nDesigned modular Spring Boot services for product and order lifecycle management, reducing feature coupling and improving release maintainability.\nBuilt normalized MySQL schema with JPA/Hibernate mappings for consistent transactional behavior and scalable data operations.\nStructured payment-ready integration points and extensible order flows to support future gateway onboarding with minimal refactor.",
      githubUrl: "",
      liveUrl: ""
    },
    {
      id: "proj_2",
      name: "SaaS Resume Maker Application",
      summary:
        "Developed backend workflows for resume create/autosave/versioning/export with Spring Boot + MySQL, improving data consistency across editing sessions.\nBuilt dynamic template APIs powering real-time frontend preview updates with low-latency form-to-preview synchronization.\nEngineered ATS-friendly PDF export alignment with frontend structure, increasing visual consistency between preview and downloadable resume.\nImplemented JWT auth, validation, and centralized exception handling to improve API reliability and production-readiness.",
      githubUrl: "",
      liveUrl: ""
    }
  ],
  skills: [
    "Java",
    "Spring Boot",
    "JPA",
    "Hibernate",
    "MySQL",
    "React.js",
    "Vite",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Git",
    "GitHub",
    "Postman",
    "REST APIs",
    "JWT Authentication"
  ],
  certifications: [],
  links: ["GitHub: github.com/muhamdsufiyan", "Phone: +91-XXXXXXXXXX", "Location: India"]
};

export function EditorPage() {
  const { id } = useParams();
  const { pushToast } = uiStore();
  const [sectionsOrder, setSectionsOrder] = useState([
    "personal",
    "summary",
    "skills",
    "experience",
    "projects",
    "education",
    "links",
    "certifications",
  ]);
  const [selectedSection, setSelectedSection] = useState("personal");
  const [autosaveStatus, setAutosaveStatus] = useState("Saved");
  const [templates, setTemplates] = useState([]);
  const [templateKey, setTemplateKey] = useState("modern");
  const [versionsOpen, setVersionsOpen] = useState(false);
  const [versions, setVersions] = useState([]);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareLink, setShareLink] = useState(null);
  const [exporting, setExporting] = useState(false);
  const [exportLink, setExportLink] = useState(null);
  const [skillDraft, setSkillDraft] = useState("");
  const previewRef = useRef(null);

  const form = useForm({ defaultValues });
  const { register, control, watch, setValue, getValues } = form;

  const experienceArray = useFieldArray({ control, name: "experience" });
  const projectsArray = useFieldArray({ control, name: "projects" });
  const educationArray = useFieldArray({ control, name: "education" });

  const watchedData = watch();
  const watchedSkills = watch("skills") || [];

  useEffect(() => {
    templatesApi
      .list()
      .then((res) => setTemplates(res.data || []))
      .catch(() => setTemplates([]));
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await resumeApi.get(id);
        const resume = res.data;
        if (resume?.data) {
          Object.keys(defaultValues).forEach((key) => {
            if (resume.data[key] !== undefined) setValue(key, resume.data[key]);
          });
        }
        if (resume?.sectionsOrder) setSectionsOrder(resume.sectionsOrder);
        if (resume?.templateKey) setTemplateKey(resume.templateKey);
      } catch {
        // ignore
      }
    };
    load();
  }, [id, setValue]);

  useEffect(() => {
    const handle = setTimeout(async () => {
      setAutosaveStatus("Saving...");
      try {
        await resumeApi.autosave(id, {
          data: getValues(),
          sectionsOrder,
          templateKey
        });
        setAutosaveStatus("Saved");
      } catch {
        setAutosaveStatus("Error");
      }
    }, 2000);
    return () => clearTimeout(handle);
  }, [watchedData, sectionsOrder, templateKey, id, getValues]);

  const onDragEndSections = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = sectionsOrder.indexOf(active.id);
    const newIndex = sectionsOrder.indexOf(over.id);
    setSectionsOrder(arrayMove(sectionsOrder, oldIndex, newIndex));
  };

  const onDragEndExperience = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = experienceArray.fields.findIndex((f) => f.id === active.id);
    const newIndex = experienceArray.fields.findIndex((f) => f.id === over.id);
    experienceArray.move(oldIndex, newIndex);
  };

  const onDragEndProjects = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = projectsArray.fields.findIndex((f) => f.id === active.id);
    const newIndex = projectsArray.fields.findIndex((f) => f.id === over.id);
    projectsArray.move(oldIndex, newIndex);
  };

  const handleVersionSave = async () => {
    try {
      await resumeApi.createVersion(id);
      pushToast({ title: "Version saved" });
    } catch (err) {
      pushToast({ title: "Failed", message: err.message || "Could not save version" });
    }
  };

  const openVersions = async () => {
    setVersionsOpen(true);
    try {
      const res = await resumeApi.versions(id);
      setVersions(res.data || []);
    } catch {
      setVersions([]);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const res = await exportsApi.exportResumePdf({ resumeId: id, pageSize: "A4", includeHeaderFooter: false });
      await savePdfBlobResponse(res);
      pushToast({ title: "Export ready", message: "PDF downloaded." });
    } catch (err) {
      const detail = await parseBlobErrorMessage(err);
      pushToast({ title: "Export failed", message: detail || err.message || "Try again" });
    } finally {
      setExporting(false);
    }
  };

  const handleShare = async () => {
    try {
      const res = await shareApi.create(id, { passwordProtected: false });
      setShareLink(res.data.url || `${window.location.origin}/r/${res.data.slug}`);
      setShareOpen(true);
    } catch (err) {
      pushToast({ title: "Share failed", message: err.message || "Try again" });
    }
  };

  const currentTemplate = useMemo(() => {
    if (templateKey === "classic") return TemplateClassic;
    return TemplateModern;
  }, [templateKey]);

  const data = getValues();

  const addSkillsFromText = (inputText) => {
    const text = (inputText || "").trim();
    if (!text) return;
    const parsed = text
      .split(/[\n,]/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (!parsed.length) return;

    const merged = [...(watch("skills") || [])];
    parsed.forEach((skill) => {
      if (!merged.some((s) => s.toLowerCase() === skill.toLowerCase())) {
        merged.push(skill);
      }
    });
    setValue("skills", merged, { shouldDirty: true, shouldTouch: true });
    setSkillDraft("");
  };

  const removeSkill = (index) => {
    const current = [...(watch("skills") || [])];
    current.splice(index, 1);
    setValue("skills", current, { shouldDirty: true, shouldTouch: true });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[220px,1fr,400px]">
      <Card className="p-4">
        <div className="text-sm font-semibold">Sections</div>
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEndSections}>
          <SortableContext items={sectionsOrder} strategy={verticalListSortingStrategy}>
            <div className="mt-4 space-y-2">
              {sectionsOrder.map((section) => (
                <SortableItem
                  key={section}
                  id={section}
                  active={selectedSection === section}
                  onSelect={() => setSelectedSection(section)}
                >
                  {SECTION_LABELS[section]}
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold">Editor</div>
            <div className="text-xs text-ink/50">{autosaveStatus}</div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" onClick={openVersions}>
              Versions
            </Button>
            <Button size="sm" onClick={handleVersionSave}>
              Save Version
            </Button>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {selectedSection === "personal" ? (
            <div className="grid gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-ink/50">Full name</label>
                <Input {...register("personal.fullName")} />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-ink/50">Title</label>
                <Input {...register("personal.title")} />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-ink/50">Email</label>
                <Input {...register("personal.email")} />
              </div>
            </div>
          ) : null}

          {selectedSection === "summary" ? (
            <div>
              <label className="text-xs uppercase tracking-widest text-ink/50">Summary</label>
              <Textarea rows={6} {...register("summary")} />
            </div>
          ) : null}

          {selectedSection === "experience" ? (
            <div className="space-y-4">
              <DndContext collisionDetection={closestCenter} onDragEnd={onDragEndExperience}>
                <SortableContext items={experienceArray.fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-4">
                    {experienceArray.fields.map((field, index) => (
                      <SortableCard key={field.id} id={field.id}>
                        <div className="grid gap-3">
                          <Input placeholder="Role" {...register(`experience.${index}.role`)} />
                          <Input placeholder="Company" {...register(`experience.${index}.company`)} />
                          <div className="grid gap-3 md:grid-cols-2">
                            <Input placeholder="Start" {...register(`experience.${index}.start`)} />
                            <Input placeholder="End" {...register(`experience.${index}.end`)} />
                          </div>
                          <Textarea rows={3} placeholder="Bullet points (one per line)" {...register(`experience.${index}.bullets.0`)} />
                          <div className="flex items-center justify-end">
                            <Button size="sm" variant="ghost" onClick={() => experienceArray.remove(index)}>
                              Remove
                            </Button>
                          </div>
                        </div>
                      </SortableCard>
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
              <Button size="sm" onClick={() => experienceArray.append({ id: `exp_${Date.now()}`, role: "", company: "", start: "", end: "", bullets: [] })}>
                Add Experience
              </Button>
            </div>
          ) : null}

          {selectedSection === "education" ? (
            <div className="space-y-4">
              {educationArray.fields.map((field, index) => (
                <Card key={field.id} className="p-4">
                  <div className="grid gap-3">
                    <Input placeholder="School" {...register(`education.${index}.school`)} />
                    <Input placeholder="Degree" {...register(`education.${index}.degree`)} />
                    <div className="grid gap-3 md:grid-cols-2">
                      <Input placeholder="Start" {...register(`education.${index}.start`)} />
                      <Input placeholder="End" {...register(`education.${index}.end`)} />
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => educationArray.remove(index)}>
                      Remove
                    </Button>
                  </div>
                </Card>
              ))}
              <Button size="sm" onClick={() => educationArray.append({ id: `edu_${Date.now()}`, school: "", degree: "", start: "", end: "" })}>
                Add Education
              </Button>
            </div>
          ) : null}

          {selectedSection === "projects" ? (
            <div className="space-y-4">
              <DndContext collisionDetection={closestCenter} onDragEnd={onDragEndProjects}>
                <SortableContext items={projectsArray.fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-4">
                    {projectsArray.fields.map((field, index) => (
                      <SortableCard key={field.id} id={field.id}>
                        <div className="grid gap-3">
                          <Input placeholder="Project name" {...register(`projects.${index}.name`)} />
                          <Textarea rows={3} placeholder="Summary" {...register(`projects.${index}.summary`)} />
                          <Input placeholder="GitHub URL (optional)" {...register(`projects.${index}.githubUrl`)} />
                          <Input placeholder="Live URL (optional)" {...register(`projects.${index}.liveUrl`)} />
                          <div className="flex items-center justify-end">
                            <Button size="sm" variant="ghost" onClick={() => projectsArray.remove(index)}>
                              Remove
                            </Button>
                          </div>
                        </div>
                      </SortableCard>
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
              <Button
                size="sm"
                onClick={() =>
                  projectsArray.append({ id: `proj_${Date.now()}`, name: "", summary: "", githubUrl: "", liveUrl: "" })
                }
              >
                Add Project
              </Button>
            </div>
          ) : null}

          {selectedSection === "skills" ? (
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-widest text-ink/50">Skills</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Type a skill and press Enter"
                  value={skillDraft}
                  onChange={(e) => setSkillDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === ",") {
                      e.preventDefault();
                      addSkillsFromText(skillDraft);
                    }
                  }}
                />
                <Button type="button" size="sm" onClick={() => addSkillsFromText(skillDraft)}>
                  Add
                </Button>
              </div>
              <div className="text-xs text-ink/50">Tip: separate multiple skills with comma or new line.</div>
              <div className="flex flex-wrap gap-2">
                {watchedSkills.map((skill, index) => (
                  <button
                    key={`${skill}-${index}`}
                    type="button"
                    className="rounded-full bg-ink/5 px-3 py-1 text-xs text-ink hover:bg-ink/10"
                    onClick={() => removeSkill(index)}
                    title="Remove skill"
                  >
                    {skill} ×
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {selectedSection === "certifications" ? (
            <div>
              <label className="text-xs uppercase tracking-widest text-ink/50">Certifications</label>
              <Textarea rows={4} {...register("certifications")} />
            </div>
          ) : null}

          {selectedSection === "links" ? (
            <div>
              <label className="text-xs uppercase tracking-widest text-ink/50">Links</label>
              <Textarea rows={4} {...register("links")} />
            </div>
          ) : null}
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Live Preview</div>
          <Badge color="mint">{templateKey}</Badge>
        </div>

        <div className="mt-3">
          <label className="text-xs uppercase tracking-widest text-ink/50">Template</label>
          <select
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-3 py-2 text-sm"
            value={templateKey}
            onChange={(e) => setTemplateKey(e.target.value)}
          >
            {templates.map((tpl) => (
              <option key={tpl.key} value={tpl.key} disabled={tpl.isPremium}>
                {tpl.name} {tpl.isPremium ? "(Pro)" : ""}
              </option>
            ))}
          </select>
          {templates.find((t) => t.key === templateKey)?.isPremium ? (
            <div className="mt-2 text-xs text-ink/60">Upgrade to unlock this template.</div>
          ) : null}
        </div>

        <div ref={previewRef} className="mt-4 rounded-3xl border border-ink/10 bg-white p-4">
          {currentTemplate({ data })}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button size="sm" onClick={handleExport} disabled={exporting}>
            {exporting ? "Exporting..." : "Export PDF"}
          </Button>
          <Button size="sm" variant="secondary" onClick={handleShare}>
            Share
          </Button>
        </div>
        {exportLink ? (
          <button
            type="button"
            className="mt-2 block text-left text-sm text-ink/70 underline"
            onClick={() => openExportFile(exportLink)}
          >
            Download PDF
          </button>
        ) : null}
      </Card>

      <Drawer open={versionsOpen} onClose={() => setVersionsOpen(false)} title="Version history">
        <div className="space-y-3 text-sm">
          {versions.length === 0 ? <div>No versions yet.</div> : null}
          {versions.map((version) => (
            <div key={version.id} className="flex items-center justify-between">
              <div>v{version.version}</div>
              <Button size="sm" variant="secondary">
                Restore
              </Button>
            </div>
          ))}
        </div>
      </Drawer>

      <Modal open={shareOpen} onClose={() => setShareOpen(false)} title="Share link">
        <div className="space-y-4">
          <div className="text-sm text-ink/60">Share your resume with a public link.</div>
          <Input value={shareLink || ""} readOnly />
          <Button
            onClick={() => {
              navigator.clipboard.writeText(shareLink || "");
              pushToast({ title: "Copied", message: "Link copied" });
            }}
          >
            Copy link
          </Button>
        </div>
      </Modal>
    </div>
  );
}

async function openExportFile(urlOrId) {
  const res = await exportsApi.download(urlOrId);
  const contentType = (res.headers?.["content-type"] || "").toLowerCase();
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
  } else {
    window.open(blobUrl, "_blank", "noopener,noreferrer");
  }

  setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
}

async function savePdfBlobResponse(res) {
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

  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
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

function SortableItem({ id, active, onSelect, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
  return (
    <button
      ref={setNodeRef}
      style={style}
      onClick={onSelect}
      type="button"
      className={`flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-sm ${
        active ? "bg-ink text-white" : "text-ink/70 hover:bg-ink/5"
      }`}
    >
      {children}
      <span
        className="text-xs cursor-grab active:cursor-grabbing"
        aria-label="Drag to reorder"
        onClick={(e) => e.stopPropagation()}
        {...attributes}
        {...listeners}
      >
        ??
      </span>
    </button>
  );
}

function SortableCard({ id, handleLabel = "Drag to reorder", children }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
  return (
    <Card ref={setNodeRef} style={style} className="p-4">
      <div className="mb-3 flex items-center justify-between text-xs text-ink/50">
        <span>{handleLabel}</span>
        <button
          type="button"
          className="cursor-grab active:cursor-grabbing"
          aria-label="Drag to reorder"
          {...attributes}
          {...listeners}
        >
          ??
        </button>
      </div>
      {children}
    </Card>
  );
}
