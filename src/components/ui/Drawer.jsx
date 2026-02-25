export function Drawer({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/30" onClick={onClose} />
      <div className="w-full max-w-md bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-ink">{title}</h3>
          <button className="text-sm text-ink/60" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
