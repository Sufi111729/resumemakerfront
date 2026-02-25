import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useResumeEditorStore } from "../../store/useResumeEditorStore";
import useDebouncedCallback from "../../hooks/useDebouncedCallback";
import { autosaveDraft, listVersions, saveVersion } from "../../api/resumesApi";
import { createExport, getExport } from "../../api/exportsApi";
import Drawer from "../../components/ui/Drawer";
import Modal from "../../components/ui/Modal";
import Badge from "../../components/ui/Badge";
import SectionCard from "../../sections/SectionCard";
import Preview from "../../sections/Preview";

const schema = z.object({
  template: z.string(),
  sectionsOrder: z.array(z.string()),
  personal: z.object({
    name: z.string().min(1),
    title: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(6),
    location: z.string().min(2),
    links: z.string().optional()
  }),
  summary: z.object({ text: z.string().min(10) }),
  experience: z.array(
    z.object({
      id: z.string(),
      role: z.string().min(1),
      company: z.string().min(1),
      period: z.string().min(1),
      bullets: z.string().min(1)
    })
  ),
  education: z.array(
    z.object({
      id: z.string(),
      school: z.string().min(1),
      degree: z.string().min(1),
      period: z.string().min(1)
    })
  ),
  projects: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(1),
      stack: z.string().min(1),
      description: z.string().min(1)
    })
  ),
  skills: z.object({ items: z.string().min(1) })
});

const templates = [
  { name: "Modern", premium: false },
  { name: "Classic", premium: false },
  { name: "Minimal", premium: true }
];

export default function Editor() {
  const { id } = useParams();
  const { data, setData } = useResumeEditorStore();
  const [saveState, setSaveState] = useState("Saved");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [versions, setVersions] = useState([]);
  const [exportJob, setExportJob] = useState(null);
  const [shareModal, setShareModal] = useState(false);
  const [shareLink, setShareLink] = useState(null);
  const [sharePassword, setSharePassword] = useState("");

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: data,
    mode: "onChange"
  });

  const expArray = useFieldArray({ control: form.control, name: "experience" });
  const projArray = useFieldArray({ control: form.control, name: "projects" });

  const sectionsOrder = form.watch("sectionsOrder");
  const allValues = form.watch();

  const debouncedSave = useDebouncedCallback(async () => {
    try {
      setSaveState("Saving...");
      const payload = form.getValues();
      await autosaveDraft(id, { snapshotJson: JSON.stringify(payload) });
      setData(payload);
      setSaveState("Saved");
    } catch {
      setSaveState("Error");
    }
  }, 2000);

  useEffect(() => {
    debouncedSave();
  }, [allValues, debouncedSave]);

  useEffect(() => {}, [form, setData]);

  const sectionIds = useMemo(() => sectionsOrder, [sectionsOrder]);

  const onSectionDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = sectionIds.indexOf(active.id);
    const newIndex = sectionIds.indexOf(over.id);
    form.setValue("sectionsOrder", arrayMove(sectionIds, oldIndex, newIndex));
  };

  const onExperienceDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const ids = expArray.fields.map((f) => f.id);
    const oldIndex = ids.indexOf(active.id);
    const newIndex = ids.indexOf(over.id);
    expArray.move(oldIndex, newIndex);
  };

  const onProjectDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const ids = projArray.fields.map((f) => f.id);
    const oldIndex = ids.indexOf(active.id);
    const newIndex = ids.indexOf(over.id);
    projArray.move(oldIndex, newIndex);
  };

  const handleCreateVersion = async () => {
    const draftId = await autosaveDraft(id, { snapshotJson: JSON.stringify(form.getValues()) });
    await saveVersion(id, draftId);
    const list = await listVersions(id);
    setVersions(list);
    setDrawerOpen(true);
  };

  const handleRestore = async () => {
    setDrawerOpen(false);
  };

  const handleExport = async () => {
    const jobId = await createExport(id);
    const poll = setInterval(async () => {
      const latest = await getExport(jobId);
      setExportJob(latest);
      if (latest?.status === "DONE") clearInterval(poll);
    }, 800);
  };

  const handleShare = async () => {
    setShareLink({ url: "http://localhost:5173/r/demo", id: "demo" });
  };

  const handleRevoke = async () => {
    setShareLink(null);
  };

  const versionList = async () => {
    const list = await listVersions(id);
    setVersions(list);
    setDrawerOpen(true);
  };

  return (
    <div className="grid grid-cols-[1.1fr_0.9fr] gap-6">
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-display font-semibold">Editor</div>
            <div className="text-xs text-ink/60">{saveState}</div>
          </div>
          <div className="flex gap-2">
            <button className="rounded-xl border border-ink/20 px-3 py-1 text-xs" onClick={versionList}>
              Version History
            </button>
            <button className="rounded-xl border border-ink/20 px-3 py-1 text-xs" onClick={handleCreateVersion}>
              Save Version
            </button>
            <button className="rounded-xl bg-ink px-3 py-1 text-xs text-white" onClick={handleExport}>
              Export PDF
            </button>
            <button className="rounded-xl border border-ink/20 px-3 py-1 text-xs" onClick={() => setShareModal(true)}>
              Share
            </button>
          </div>
        </div>

        <div className="mt-6">
          <div className="label">Sections</div>
          <DndContext collisionDetection={closestCenter} onDragEnd={onSectionDragEnd}>
            <SortableContext items={sectionIds} strategy={verticalListSortingStrategy}>
              <div className="mt-4 space-y-3">
                {sectionIds.map((sectionKey) => (
                  <SectionBlock
                    key={sectionKey}
                    sectionKey={sectionKey}
                    form={form}
                    expArray={expArray}
                    projArray={projArray}
                    onExperienceDragEnd={onExperienceDragEnd}
                    onProjectDragEnd={onProjectDragEnd}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between">
          <div className="text-lg font-display font-semibold">Live Preview</div>
          <div className="flex items-center gap-2">
            <select
              className="rounded-xl border border-ink/20 px-2 py-1 text-xs"
              {...form.register("template")}
            >
              {templates.map((t) => (
                <option key={t.name} value={t.name}>
                  {t.name} {t.premium ? "(Pro)" : ""}
                </option>
              ))}
            </select>
            {templates.find((t) => t.name === form.watch("template"))?.premium && <Badge>Pro</Badge>}
          </div>
        </div>
        <div className="mt-4">
          <Preview template={form.watch("template")} data={mapToPreview(form.getValues())} />
        </div>
        {exportJob && (
          <div className="mt-4 text-xs text-ink/60">
            <div>Export status: {exportJob.status}</div>
            <div className="mt-2 h-2 w-full rounded-full bg-ink/10">
              <div
                className="h-2 rounded-full bg-accent"
                style={{ width: `${exportJob.progress ?? 0}%` }}
              />
            </div>
            {exportJob.url && (
              <a className="mt-2 inline-block underline" href={exportJob.url} target="_blank" rel="noreferrer">
                Download
              </a>
            )}
          </div>
        )}
      </div>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Version History">
        <div className="space-y-3 text-sm">
          {versions.length === 0 && <div className="text-ink/60">No versions yet.</div>}
          {versions.map((v) => (
            <div key={v.id} className="rounded-xl border border-ink/10 p-3">
              <div className="font-semibold">{v.name}</div>
              <div className="text-xs text-ink/60">{new Date(v.createdAt).toLocaleString()}</div>
              <button className="mt-2 text-xs underline" onClick={() => handleRestore(v.id)}>
                Restore
              </button>
            </div>
          ))}
        </div>
      </Drawer>

      <Modal open={shareModal} onClose={() => setShareModal(false)} title="Share Resume">
        <div className="space-y-3 text-sm">
          <input
            className="input"
            placeholder="Password (optional)"
            value={sharePassword}
            onChange={(e) => setSharePassword(e.target.value)}
          />
          <button className="rounded-xl bg-ink px-3 py-2 text-xs text-white" onClick={handleShare}>
            Create Link
          </button>
          {shareLink && (
            <div className="rounded-xl border border-ink/10 p-3 text-xs">
              <div className="break-all">{shareLink.url}</div>
              <div className="mt-2 flex gap-2">
                <button
                  className="rounded-lg border border-ink/20 px-2 py-1"
                  onClick={() => navigator.clipboard.writeText(shareLink.url)}
                >
                  Copy
                </button>
                <button className="rounded-lg border border-ink/20 px-2 py-1" onClick={handleRevoke}>
                  Revoke
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

function mapToPreview(values) {
  const contentMap = {
    summary: { title: "Summary", content: values.summary.text },
    experience: {
      title: "Experience",
      content: values.experience
        .map((e) => `${e.role} · ${e.company} (${e.period})\n${e.bullets}`)
        .join("\n\n")
    },
    education: {
      title: "Education",
      content: values.education.map((e) => `${e.school} · ${e.degree} (${e.period})`).join("\n")
    },
    projects: {
      title: "Projects",
      content: values.projects
        .map((p) => `${p.name} · ${p.stack}\n${p.description}`)
        .join("\n\n")
    },
    skills: { title: "Skills", content: values.skills.items }
  };
  const ordered = (values.sectionsOrder || []).map((key) => contentMap[key]).filter(Boolean);
  return {
    name: values.personal.name,
    title: values.personal.title,
    sections: ordered
  };
}

function SectionBlock({ sectionKey, form, expArray, projArray, onExperienceDragEnd, onProjectDragEnd }) {
  const labelMap = {
    personal: "Personal",
    summary: "Summary",
    experience: "Experience",
    education: "Education",
    projects: "Projects",
    skills: "Skills"
  };
  const errors = form.formState.errors;

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: sectionKey
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} className="rounded-xl border border-ink/10 bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">{labelMap[sectionKey]}</div>
        <button
          className="rounded-md border border-ink/20 px-2 py-1 text-[10px]"
          {...attributes}
          {...listeners}
          type="button"
        >
          Drag
        </button>
      </div>
      {sectionKey === "personal" && (
        <div className="mt-3 grid grid-cols-2 gap-3">
          <input className="input" placeholder="Name" {...form.register("personal.name")} />
          <input className="input" placeholder="Title" {...form.register("personal.title")} />
          <input className="input" placeholder="Email" {...form.register("personal.email")} />
          <input className="input" placeholder="Phone" {...form.register("personal.phone")} />
          <input className="input" placeholder="Location" {...form.register("personal.location")} />
          <input className="input" placeholder="Links" {...form.register("personal.links")} />
          {(errors.personal?.email || errors.personal?.name) && (
            <div className="col-span-2 text-xs text-red-600">
              Enter valid personal details.
            </div>
          )}
        </div>
      )}
      {sectionKey === "summary" && (
        <>
          <textarea className="input mt-3" rows={4} {...form.register("summary.text")} />
          {errors.summary?.text && <div className="mt-1 text-xs text-red-600">Summary too short.</div>}
        </>
      )}
      {sectionKey === "experience" && (
        <div className="mt-3 space-y-3">
          <DndContext collisionDetection={closestCenter} onDragEnd={onExperienceDragEnd}>
            <SortableContext items={expArray.fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
              {expArray.fields.map((field, index) => (
                <SectionCard
                  key={field.id}
                  section={{ id: field.id, title: `Experience ${index + 1}` }}
                >
                  <div className="grid grid-cols-2 gap-3">
                    <input className="input" placeholder="Role" {...form.register(`experience.${index}.role`)} />
                    <input className="input" placeholder="Company" {...form.register(`experience.${index}.company`)} />
                    <input className="input" placeholder="Period" {...form.register(`experience.${index}.period`)} />
                  </div>
                  <textarea
                    className="input mt-3"
                    rows={4}
                    placeholder="Impact bullets"
                    {...form.register(`experience.${index}.bullets`)}
                  />
                  <button
                    className="mt-2 text-xs underline"
                    onClick={() => expArray.remove(index)}
                    type="button"
                  >
                    Remove
                  </button>
                </SectionCard>
              ))}
            </SortableContext>
          </DndContext>
          <button
            className="rounded-xl border border-ink/20 px-3 py-1 text-xs"
            type="button"
            onClick={() =>
              expArray.append({
                id: `exp-${crypto.randomUUID()}`,
                role: "",
                company: "",
                period: "",
                bullets: ""
              })
            }
          >
            Add Experience
          </button>
        </div>
      )}
      {sectionKey === "education" && (
        <div className="mt-3 space-y-3">
          {form.getValues("education").map((_, index) => (
            <div key={index} className="grid grid-cols-2 gap-3">
              <input className="input" placeholder="School" {...form.register(`education.${index}.school`)} />
              <input className="input" placeholder="Degree" {...form.register(`education.${index}.degree`)} />
              <input className="input" placeholder="Period" {...form.register(`education.${index}.period`)} />
            </div>
          ))}
        </div>
      )}
      {sectionKey === "projects" && (
        <div className="mt-3 space-y-3">
          <DndContext collisionDetection={closestCenter} onDragEnd={onProjectDragEnd}>
            <SortableContext items={projArray.fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
              {projArray.fields.map((field, index) => (
                <SectionCard
                  key={field.id}
                  section={{ id: field.id, title: `Project ${index + 1}` }}
                >
                  <div className="grid grid-cols-2 gap-3">
                    <input className="input" placeholder="Name" {...form.register(`projects.${index}.name`)} />
                    <input className="input" placeholder="Stack" {...form.register(`projects.${index}.stack`)} />
                  </div>
                  <textarea
                    className="input mt-3"
                    rows={3}
                    placeholder="Description"
                    {...form.register(`projects.${index}.description`)}
                  />
                  <button
                    className="mt-2 text-xs underline"
                    onClick={() => projArray.remove(index)}
                    type="button"
                  >
                    Remove
                  </button>
                </SectionCard>
              ))}
            </SortableContext>
          </DndContext>
          <button
            className="rounded-xl border border-ink/20 px-3 py-1 text-xs"
            type="button"
            onClick={() =>
              projArray.append({
                id: `proj-${crypto.randomUUID()}`,
                name: "",
                stack: "",
                description: ""
              })
            }
          >
            Add Project
          </button>
        </div>
      )}
      {sectionKey === "skills" && (
        <>
          <textarea className="input mt-3" rows={3} {...form.register("skills.items")} />
          {errors.skills?.items && <div className="mt-1 text-xs text-red-600">Add skills.</div>}
        </>
      )}
    </div>
  );
}
