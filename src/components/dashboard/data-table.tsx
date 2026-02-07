"use client";

import { useCallback } from "react";

interface Column<T> {
  key: string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  caption?: string;
  onRowClick?: (row: T) => void;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  caption,
  onRowClick,
}: DataTableProps<T>) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTableRowElement>, row: T) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onRowClick?.(row);
      }
    },
    [onRowClick]
  );

  const getRowId = (row: T, index: number): string => {
    const id = row.id;
    if (typeof id === "string" || typeof id === "number") {
      return String(id);
    }
    return `row-${index}`;
  };

  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
      <table className="w-full text-left" role="grid">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="border-b border-slate-border bg-slate-light-bg">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className="px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-slate-muted"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-16 text-center text-sm text-muted-foreground"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={getRowId(row, i)}
                tabIndex={onRowClick ? 0 : undefined}
                role={onRowClick ? "row" : undefined}
                onClick={() => onRowClick?.(row)}
                onKeyDown={(e) => handleKeyDown(e, row)}
                className={`border-b border-slate-border/50 transition-colors duration-150 hover:bg-primary/5 ${
                  onRowClick
                    ? "cursor-pointer focus:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                    : ""
                }`}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 text-sm text-dark">
                    {col.render ? col.render(row) : String(row[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
