"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface YearFilterProps {
  years: string[];
  selectedYear: string | null;
  onYearChange: (year: string | null) => void;
}

const YearFilter: React.FC<YearFilterProps> = ({
  years,
  selectedYear,
  onYearChange,
}) => {
  return (
    <section className="flex flex-wrap gap-2 mx-6">
      <Button
        variant={"secondary"}
        onClick={() => onYearChange(null)}
        className={`text-xs px-3 py-1 ${
          selectedYear === null ? "bg-blue-500 text-white" : ""
        }`}
      >
        All
      </Button>
      {years.map((year) => (
        <Button
          variant={"secondary"}
          key={year}
          onClick={() => onYearChange(year)}
          className={`text-xs px-3 py-1 ${
            selectedYear === year ? "bg-blue-500 text-white" : ""
          }`}
        >
          {year}
        </Button>
      ))}
    </section>
  );
};

export default YearFilter;
