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
import {
  IconBookmark,
  IconBookmarkFilled,
  IconMail,
  IconMailFilled,
} from "@tabler/icons-react";
import {
  ColumnDef,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Subscript } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useUser } from "@clerk/nextjs";
import { getRegisteredEmailStrategyList } from "@/lib/getRegisteredEmailStrategyList";
import updateStrategyEmail from "@/lib/registerDailyEmail";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { ToolButton } from "./email-button";
import { EmailAlert } from "./email-alert";

export type StrategiesTableHeaders =
  | "name"
  | "composer_created_at"
  | "email"
  | "save";

export interface StrategiesTableProps {
  headers: StrategiesTableHeaders[];
  data: Strategy[];
}

export function StrategiesTable({
  headers,
  data,
}: StrategiesTableProps): React.ReactNode {
  const [alertEmailList, setAlertEmailList] = useState<Strategy[]>([]);

  const [userEmail, setUserEmail] = useState<string | undefined>();
  const { isSignedIn, isLoaded, user } = useUser();
  if ((!isSignedIn && !isLoaded) || !user) {
    headers = headers.filter((x) => x !== "email");
    // setting user email
  }
  // email and saved strategies
  const [emailStrategies, setEmailStrategies] = useState<string[]>([]);
  console.log(emailStrategies);

  const [savedStrategies, setSavedStrategies] = useLocalStorage<string[]>(
    "savedStrategies",
    [],
    {
      initializeWithValue: false,
    }
  );

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      setUserEmail(user.primaryEmailAddress.emailAddress);
    }
  }, [user]);
  // fetching list of email that user want to receive email notification from
  useEffect(() => {
    const fetchEmailStrategies = async () => {
      const emailStrategyList: string[] | undefined =
        await getRegisteredEmailStrategyList(userEmail);
      if (emailStrategyList) setEmailStrategies(emailStrategyList);
    };

    fetchEmailStrategies();
  }, [userEmail]);

  // Handling tools click (email, tool)
  const handleEmailClick = async (e: React.MouseEvent, strategy: Strategy) => {
    if (headers.includes("email") && userEmail) {
      e.stopPropagation();

      // perdicate whether to sub or unsub
      const isCurrentlySubscribed = emailStrategies.includes(
        strategy.composer_id
      );
      // update strategy
      const { subscribeStatus } = await updateStrategyEmail(
        userEmail,
        strategy.composer_id,
        !isCurrentlySubscribed
      );

      if (!subscribeStatus) {
        setEmailStrategies((prev) =>
          prev.filter((id) => id !== strategy.composer_id)
        );
        return;
      }
      setEmailStrategies((prev) => [...prev, strategy.composer_id]);

      setAlertEmailList((prev) => {
        if (prev.length >= 2) {
          return [...prev.slice(0, -1), strategy];
        }
        return [...prev, strategy];
      });
    }
  };

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

  // COLUMNS
  const getColumns = () => {
    const columns: ColumnDef<Strategy>[] = [];
    if (headers.includes("name")) {
      columns.push({
        accessorKey: "name",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
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
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            Out of Sample Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => formatDate(row.getValue("composer_created_at")),
      });
    }

    // Combine email and save into one actions column
    if (headers.includes("email") || headers.includes("save")) {
      columns.push({
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div className="flex gap-2 justify-end">
            {headers.includes("email") && (
              <ToolButton
                tooltipText="receive email notification"
                isSubscribed={emailStrategies.includes(
                  row.original.composer_id
                )}
                className="hover:opacity-60 rounded-2xl border border-gray-400 dark:border-gray-600"
                onClick={(e) => {
                  handleEmailClick(e, row.original);
                }}
                FilledIcon={IconMailFilled}
                Icon={IconMail}></ToolButton>
            )}
            {headers.includes("save") && (
              <ToolButton
                tooltipText="save this strategy"
                isSubscribed={savedStrategies.includes(
                  row.original.composer_id
                )}
                className="hover:opacity-60 rounded-2xl border border-gray-400 dark:border-gray-600"
                onClick={(e) => {
                  handleSaveClicked(e, row.original);
                }}
                FilledIcon={IconBookmarkFilled}
                Icon={IconBookmark}></ToolButton>
            )}
          </div>
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
    <div>
      <div className="fixed top-20 right-0">
        <EmailAlert
          strategies={alertEmailList}
          setAlertEmailList={setAlertEmailList}
        />
      </div>

      <div className="rounded-md border">
        <Table className="dark:bg-neutral-900">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="border-gray-300 bg-gray-100 font-bold dark:bg-neutral-800 strategy-table-header">
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
                className="hover:bg-muted/50 cursor-pointer">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
