export function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-end gap-2">
      <button
        className="rounded-xl border border-ink/10 px-3 py-1 text-xs"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </button>
      <span className="text-xs text-ink/60">
        Page {page} of {totalPages}
      </span>
      <button
        className="rounded-xl border border-ink/10 px-3 py-1 text-xs"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
