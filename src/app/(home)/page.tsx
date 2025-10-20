import { Suspense } from "react";
import { TablePagination } from "./pagination";
import { Search } from "./search";
import { StrategiesTable } from "@/components/ui/app/strategies-table";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ name?: string; page?: number }>;
}) {
  // const { name, page } = await searchParams;
  // const url = new URL(
  //   "/api/external/strategies/search",
  //   process.env.NEXT_PUBLIC_BASE_URL
  // );
  // if (name) {
  //   url.searchParams.append("name", name);
  // }
  // if (page) {
  //   url.searchParams.append("page", page.toString());
  // }

  // const result = await fetch(url);
  // const searchResult: SearchResult = await result.json();

  //// console.debug("Fetched search result:", searchResult);

  // !NOT FOR PRODUCTION
  const mockStrategy: Strategy[] = [
    {
      id: "strat_001",
      url: "https://api.example.com/strategies/strat_001",
      name: "Balanced Growth Portfolio",
      composer_id: "user_123",
      composer_created_at: "2025-01-15T10:30:00Z",
      version_id: "v1.2.3",
      last_modified_utc: "2025-10-10T14:45:00Z",
      holdings: [
        { symbol: "AAPL", weight: 0.25, sector: "Technology" },
        { symbol: "GOOGL", weight: 0.2, sector: "Technology" },
        { symbol: "TSLA", weight: 0.15, sector: "Automotive" },
        { symbol: "AMZN", weight: 0.25, sector: "Consumer Discretionary" },
        { symbol: "BND", weight: 0.15, sector: "Fixed Income" },
      ],
    },
  ];
  return (
    <div className="flex flex-col gap-4 mx-auto">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Strategies
      </h2>
      <Search />
      <Suspense fallback={<p>Loading strategies...</p>}>
        {/* <StrategiesTable
          headers={["name", "composer_created_at", "tools"]}
          data={searchResult.data}
        /> */}
        <StrategiesTable
          headers={["name", "composer_created_at", "email", "save"]}
          data={mockStrategy}
        />
        {/* <TablePagination searchResult={searchResult} /> */}
      </Suspense>
    </div>
  );
}
