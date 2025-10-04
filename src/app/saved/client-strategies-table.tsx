'use client';

import { StrategiesTable } from "@/components/ui/app/strategies-table";
import { useGetSavedStrategies } from "@/hooks/useGetSavedStrategies";
import { useLocalStorage } from "usehooks-ts";

export const ClientStrategiesTable = () => {
    const [savedStrategies] = useLocalStorage<string[]>("savedStrategies", [], {
        initializeWithValue: false,
    });
  const {data, isLoading} = useGetSavedStrategies(savedStrategies);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <StrategiesTable headers={["name", "composer_created_at", "tools"]} data={data || []} />
      )}
    </>
  )
};