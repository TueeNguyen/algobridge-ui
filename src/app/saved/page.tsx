import { StrategiesTable } from "@/components/ui/app/strategies-table";
import { Suspense } from "react";
import { ClientStrategiesTable } from "./client-strategies-table";

export default async function SavedPage() {
  return (
    <div className="flex flex-col gap-4 mx-auto">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Saved Strategies
      </h2>
      <Suspense fallback={<p>Loading saved strategies...</p>}>
        <ClientStrategiesTable />
        {/* <TablePagination searchResult={savedStrategies} /> */}
      </Suspense>
    </div>
  );
}
