"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { IconBookmark, IconBookmarkFilled } from "@tabler/icons-react";
import {
  ColumnDef,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export type StrategiesTableHeaders = "name" | "composer_created_at" | "tools";

export interface StrategiesTableProps {
  headers: StrategiesTableHeaders[];
  data: Strategy[];
}

export function StrategiesTable({ headers, data }: StrategiesTableProps) {
  const [savedStrategies, setSavedStrategies] = useLocalStorage<string[]>(
    "savedStrategies",
    [],
    {
      initializeWithValue: false,
    }
  );

  const handleSaveClicked = (e: React.MouseEvent, strategy: Strategy) => {
    e.stopPropagation();
    if (savedStrategies.includes(strategy.composer_id)) {
      setSavedStrategies((prev) =>
        prev.filter((id) => id !== strategy.composer_id)
      );
      return;
    }
    setSavedStrategies((prev) => [...prev, strategy.composer_id]);
  };

  const getColumns = () => {
    const columns: ColumnDef<Strategy>[] = [];
    if (headers.includes("name")) {
      columns.push({
        accessorKey: "name",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
      });
    }
    if (headers.includes("composer_created_at")) {
      columns.push({
        accessorKey: "composer_created_at",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Out of Sample Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => formatDate(row.getValue("composer_created_at")),
      });
    }

    if (headers.includes("tools")) {
      columns.push({
        accessorKey: "tools",
        header: "",
        cell: ({ row }) => (
          <Button
            variant="secondary"
            size="sm"
            className="hover:opacity-60 rounded-2xl border border-gray-400 dark:border-gray-600"
            onClick={(e) => {
              handleSaveClicked(e, row.original);
            }}
          >
            {savedStrategies.includes(row.original.composer_id) ? (
              <IconBookmarkFilled style={{ width: 12, height: 12 }} />
            ) : (
              <IconBookmark style={{ width: 12, height: 12 }} />
            )}
          </Button>
        ),
      });
    }
    return columns;
  };

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns: getColumns(),
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
  });

  const router = useRouter();

  const handleRowClick = (row: Row<Strategy>) => {
    const composerId = row.original.composer_id;
    router.push(`/strategies/${composerId}`);
  };

  return (
    <div className="rounded-md border">
      <Table className="dark:bg-neutral-900">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="border-gray-300 bg-gray-100 font-bold dark:bg-neutral-800 strategy-table-header"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              onClick={() => handleRowClick(row)}
              key={row.id}
              className="hover:bg-muted/50 cursor-pointer"
            >
              {row.getVisibleCells().map((cell) => {
                return (
                  <TableCell
                    className={
                      cell.column.id === "tools" ? "flex justify-end" : ""
                    }
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
