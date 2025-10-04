"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePagination } from "@mantine/hooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const TablePagination = ({
  searchResult,
}: {
  searchResult: SearchResult;
}) => {
  const pagination = usePagination({
    total: searchResult.pages,
    page: searchResult.page,
  });
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlePageClick = (page: number) => {
    if (page === pagination.active) {
      return;
    }
    pagination.setPage(page);
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const handlePaginationNav = (type: "next" | "previous") => {
    console.debug({ active: pagination.active, range: pagination.range, type });
    if (type === "next" && pagination.active < pagination.range.length + 1) {
      handlePageClick(pagination.active + 1);
    } else if (type === "previous" && pagination.active > 1) {
      handlePageClick(pagination.active - 1);
    }
  };
  const cursorStyle = "cursor-pointer";
  return (
    <Pagination>
      <PaginationPrevious className={cursorStyle} onClick={() => handlePaginationNav("previous")} />
      <PaginationContent>
        {pagination.range.map((item, index) => (
          <PaginationItem key={index}>
            <PaginationLink className={cursorStyle}
              isActive={pagination.active === index + 1}
              onClick={() => {
                handlePageClick(
                  typeof item === "number" ? item : pagination.active
                );
              }}
            >
              {item === "dots" ? <PaginationEllipsis /> : item}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
      <PaginationNext className={cursorStyle} onClick={() => handlePaginationNav("next")} />
    </Pagination>
  );
};
