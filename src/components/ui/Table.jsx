export function Table({ columns, data, emptyText = "No data", loading = false, renderRow }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-ink/10 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-ink/5 text-xs uppercase tracking-widest text-ink/50">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td className="px-4 py-6 text-center text-ink/50" colSpan={columns.length}>
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td className="px-4 py-6 text-center text-ink/50" colSpan={columns.length}>
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row) => renderRow(row))
          )}
        </tbody>
      </table>
    </div>
  );
}
