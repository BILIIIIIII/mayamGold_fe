"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface YearFilterProps {
  years: string[];
  selectedYear: string | null;
  onYearChange: (year: string | null) => void;
}

const BandaYearFilter: React.FC<YearFilterProps> = ({
  years,
  selectedYear,
  onYearChange,
}) => {
  return (
    <section className="w-fit  ">
      <Select
        onValueChange={(value) => onYearChange(value === "All" ? null : value)}
        value={selectedYear === null ? "All" : selectedYear}
      >
        <SelectTrigger className="text-xs px-3 py-1">
          <SelectValue placeholder="Select a year" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="All">All</SelectItem>
          {years.map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </section>
  );
};

export default BandaYearFilter;
