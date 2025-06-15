"use client";

import React, { useMemo, useCallback } from "react";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

interface GoldPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const usePageNumbers = (currentPage: number, totalPages: number) =>
  useMemo(() => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Add first page always
      pages.push(1);
      if (currentPage > 4) {
        pages.push("...");
      }
      // Determine middle pages
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 3) {
        pages.push("...");
      }
      // Add last page always
      pages.push(totalPages);
    }
    return pages;
  }, [currentPage, totalPages]);

export const GoldPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: GoldPaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = usePageNumbers(currentPage, totalPages);

  const handlePrevious = useCallback(() => {
    onPageChange(Math.max(currentPage - 1, 1)); // Ensure it doesn't go below 1
  }, [currentPage, onPageChange]);

  const handleNext = useCallback(() => {
    onPageChange(Math.min(currentPage + 1, totalPages)); // Ensure it doesn't exceed totalPages
  }, [currentPage, onPageChange, totalPages]);

  const handlePageClick = useCallback(
    (page: number | string) => {
      if (typeof page === "number" && page !== currentPage) {
        onPageChange(page);
      }
    },
    [currentPage, onPageChange]
  );

  return (
    <Pagination className="flex items-center justify-center space-x-2">
      <PaginationItem
        onClick={handlePrevious}
        className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
        aria-label="Go to previous page"
      >
        <PaginationPrevious />
      </PaginationItem>
      {pages.map((page, index) =>
        page === "..." ? (
          <PaginationItem key={`ellipsis-${index}`} className="list-none">
            <PaginationLink className="pointer-events-none">
              &hellip;
            </PaginationLink>
          </PaginationItem>
        ) : (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => handlePageClick(page)}
              isActive={currentPage === page}
              aria-label={`Go to page ${page}`}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        )
      )}
      <PaginationItem
        onClick={handleNext}
        className={
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }
        aria-label="Go to next page"
      >
        <PaginationNext />
      </PaginationItem>
    </Pagination>
  );
};
