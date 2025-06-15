"use client";

import React from "react";
import { CardTitle } from "@/components/ui/card";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";

interface CardHeaderContentProps {
  timeRange: string;
  onTimeRangeChange: (value: string) => void;
}

const CardHeaderContent: React.FC<CardHeaderContentProps> = ({}) => {
  return (
    <main className="flex items-center gap-2 space-y-0 border-none sm:flex-row">
      <div className="grid flex-1 gap-1 text-center sm:text-left">
        <CardTitle className="text-left text-5xl">
          Global Gold Price (IDR) Dashboard
        </CardTitle>
        {/* <CardDescription>
          Showing data for the last{" "}
          {timeRange === "90d"
            ? "3 months"
            : timeRange === "30d"
            ? "30 days"
            : "7 days"}
        </CardDescription> */}
      </div>
      {/* <Select value={timeRange} onValueChange={onTimeRangeChange}>
        <SelectTrigger
          className="w-[160px] rounded-lg sm:ml-auto"
          aria-label="Select a value"
        >
          <SelectValue placeholder="Last 3 months" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          <SelectItem value="90d" className="rounded-lg">
            Last 3 months
          </SelectItem>
          <SelectItem value="30d" className="rounded-lg">
            Last 30 days
          </SelectItem>
          <SelectItem value="7d" className="rounded-lg">
            Last 7 days
          </SelectItem>
        </SelectContent>
      </Select> */}
    </main>
  );
};

export default CardHeaderContent;
