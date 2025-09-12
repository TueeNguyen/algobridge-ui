import Image from "next/image";
import { DataTable, strategyColumns } from "./strategies-table";
import { Suspense } from "react";

export default async function Home() {
  const strategies = await fetch("http://localhost:8000/strategies");
  const strategiesData = await strategies.json();

  return (
    <div>
      <h1>Strategies</h1>
      <Suspense fallback={<p>Loading strategies...</p>}>
        <DataTable data={strategiesData} columns={strategyColumns} />
      </Suspense>
    </div>
  );
}
