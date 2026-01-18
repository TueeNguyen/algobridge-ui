"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounceCallback } from "usehooks-ts";

export const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearchChange = useDebounceCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("name", term);
    } else {
      params.delete("name");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <form>
      <div className="flex items-center space-x-2">
        <Input
          id="search"
          type="text"
          placeholder="Search..."
          defaultValue={searchParams.get("name") || ""}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>
    </form>
  );
};
