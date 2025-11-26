import { Suspense } from "react";
import { TablePagination } from "./pagination";
import { Search } from "./search";
import { StrategiesTable } from "@/components/ui/app/strategies-table";
import { auth } from "@clerk/nextjs/server";
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ name?: string; page?: number }>;
}) {
  const { name, page } = await searchParams;
  const url = new URL(
    "/api/external/strategies/search",
    process.env.NEXT_PUBLIC_BASE_URL
  );
  if (name) {
    url.searchParams.append("name", name);
  }
  if (page) {
    url.searchParams.append("page", page.toString());
  }
  const { userId } = await auth();
  console.log(userId);
  const result = await fetch(url, {
    headers: {
      "user_id": userId || "",
    },
  });
  const searchResult: SearchResult = await result.json();

  // console.debug("Fetched search result:", searchResult);
  return (
    <div className="flex flex-col gap-4 mx-auto">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Strategies
      </h2>
      <Search />
      <Suspense fallback={<p>Loading strategies...</p>}>
        <StrategiesTable
          headers={["name", "composer_created_at", "email", "save"]}
          data={searchResult.data}
        />
        <TablePagination searchResult={searchResult} />
      </Suspense>
    </div>
  );
}
