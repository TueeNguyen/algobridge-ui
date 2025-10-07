import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { IconLink } from "@tabler/icons-react";
import Link from "next/link";
import { HoldingsTable } from "./holdings-table";

export default async function StrategiesPage({
  params,
}: {
  params: { id: string };
}) {
  params = await params;
  const url = new URL(
    `/api/external/strategies/${params.id}`,
    process.env.NEXT_PUBLIC_BASE_URL
  );
  const strategy = await fetch(url);
  const strategyData: Strategy = await strategy.json();
  // console.debug("Fetched strategy data:", strategyData.holdings[0]);
  return (
    <div className="flex flex-col gap-1 mx-auto p-4">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {strategyData.name}
      </h2>
      <br />
      <div className="flex flex-row gap-2">
        <Button
          variant="secondary"
          className="w-fit hover:opacity-60 border border-gray-400 rounded-3xl dark:border-gray-600"
          asChild
          size="sm"
        >
          <Link href={strategyData.url || "#"} target="_blank">
            <IconLink />
            View in Composer&nbsp;
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="w-fit hover:opacity-60 border border-gray-400 rounded-3xl dark:border-gray-600"
          asChild
          size="sm"
        >
          <Link href={"https://www.mermaidchart.com/play"} target="_blank">
            <IconLink />
            Mermaid playground&nbsp;
          </Link>
        </Button>
      </div>

      <div>
        Out of sample date:&nbsp;
        {formatDate(strategyData.composer_created_at)} | &nbsp;
        <span className="mb-2 text-sm text-muted-foreground">
          Version: {strategyData.version_id}
        </span>
      </div>

      <br />
      <HoldingsTable holdings={strategyData.holdings} />
    </div>
  );
}
