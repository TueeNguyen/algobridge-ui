import { Suspense } from "react";
import { TablePagination } from "./pagination";
import { Search } from "./search";
import { StrategiesTable } from "@/components/ui/app/strategies-table";
import { AddComposerButton } from "@/components/ui/app/addComposerButton";
import { auth } from "@clerk/nextjs/server";
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ name?: string; page?: number }>;
}) {
  const { isAuthenticated } = await auth();
  const { name, page } = await searchParams;
  const url = new URL(
    "/api/external/strategies/search",
    process.env.NEXT_PUBLIC_BASE_URL,
  );
  if (name) {
    url.searchParams.append("name", name);
  }
  if (page) {
    url.searchParams.append("page", page.toString());
  }
  const result = await fetch(url);
  const searchResult: SearchResult = await result.json();

  // console.debug("Fetched search result:", searchResult);
  return (
    <div className="flex flex-col gap-4 mx-auto py-6 px-10">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Strategies
      </h2>
      <Search />
      <Suspense fallback={<p>Loading strategies...</p>}>
        <div className="flex gap-4 items-center">
          <div className="size-fit">
            <AddComposerButton />
          </div>

          {!isAuthenticated && (
            <div className="border rounded-md px-4 py-2 text-sm">
              Sign in to receive notifications
            </div>
          )}
        </div>
        <StrategiesTable
          headers={["name", "composer_created_at", "email", "save"]}
          data={searchResult.data}
        />
        <TablePagination searchResult={searchResult} />
      </Suspense>
    </div>
  );
}
