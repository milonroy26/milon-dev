import { ReactNode } from "react";

interface Column<T> {
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  keyField: (row: T) => string;
  emptyLabel?: string;
}

export function DataTable<T>({ columns, rows, keyField, emptyLabel = "Nothing here yet." }: DataTableProps<T>) {
  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-border-light dark:border-border-dark p-10 text-center text-sm text-muted-light dark:text-muted-dark">
        {emptyLabel}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border-light dark:border-border-dark">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-left">
            {columns.map((col) => (
              <th key={col.header} className="px-4 py-3 font-medium text-muted-light dark:text-muted-dark">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={keyField(row)} className="border-b border-border-light dark:border-border-dark last:border-0">
              {columns.map((col) => (
                <td key={col.header} className={`px-4 py-3 ${col.className ?? ""}`}>
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
