import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SectionCard({ section, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: section.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} className="rounded-xl border border-ink/10 bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">{section.title}</div>
        <button
          className="rounded-md border border-ink/20 px-2 py-1 text-[10px]"
          {...attributes}
          {...listeners}
          type="button"
        >
          Drag
        </button>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
