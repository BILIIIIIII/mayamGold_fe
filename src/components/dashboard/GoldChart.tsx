"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SummaryCards } from "./SummaryCards";
import { Chart } from "./Chart";
import { Gold } from "@/types/gold";
import YearFilter from "./YearFilter"; // Import the YearFilter component
import CardHeaderContent from "./CardHeaderContent"; // Import the new CardHeaderContent component

interface GoldChartProps {
  data: Gold[];
}

const parseIDRValue = (value: string) => {
  try {
    const formattedValue = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(parseFloat(value));
    const cleanedValue = formattedValue.replace(/[^0-9]/g, "");
    return parseInt(cleanedValue, 10);
  } catch (error) {
    console.error("Error parsing IDR value:", error);
    return 0;
  }
};

export default function GoldChart({ data = [] }: GoldChartProps) {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState("90d");

  // Extract years from data
  const years = Array.from(
    new Set(data.map((item) => new Date(item.time).getFullYear().toString()))
  ).sort();

  // Filter data based on the selected year
  const filteredYearData = selectedYear
    ? data.filter(
        (item) => new Date(item.time).getFullYear().toString() === selectedYear
      )
    : data;

  // Sort data by date
  const sortedData = [...filteredYearData].sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
  );

  // Compute metrics
  const initialPrice = parseIDRValue(sortedData[0]?.close || "0");
  const currentPrice = parseIDRValue(
    sortedData[sortedData.length - 1]?.close || "0"
  );
  const highPrice = Math.max(
    ...sortedData.map((item) => parseIDRValue(item.close))
  );
  const lowPrice = Math.min(
    ...sortedData.map((item) => parseIDRValue(item.close))
  );

  let percentChange = 0;
  if (initialPrice !== 0) {
    percentChange = ((currentPrice - initialPrice) / initialPrice) * 100;
  } else if (currentPrice !== 0) {
    percentChange = 100;
  }

  // Format data for chart
  const chartData = sortedData.map((gold) => ({
    time: gold.time,
    close: parseIDRValue(gold.close),
    open: parseIDRValue(gold.open),
  }));

  // Filter chartData based on timeRange
  // const referenceDate =
  //   sortedData.length > 0
  //     ? new Date(sortedData[sortedData.length - 1].Date)
  //     : new Date();
  // let daysToSubtract = 90;
  // if (timeRange === "30d") {
  //   daysToSubtract = 30;
  // } else if (timeRange === "7d") {
  //   daysToSubtract = 7;
  // }
  // const startDate = new Date(referenceDate);
  // startDate.setDate(startDate.getDate() - daysToSubtract);

  // const filteredChartData = chartData.filter((item) => {
  //   const itemDate = new Date(item.Date);
  //   return itemDate >= startDate;
  // });

  return (
    <Card className="mb-8 bg-transparent  shadow-none border-none">
      {/* Year Filter */}

      {/* Card Header Content */}
      <CardHeader>
        <CardHeaderContent
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
        />
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Summary Cards */}
        <SummaryCards
          currentPrice={currentPrice}
          highPrice={highPrice}
          lowPrice={lowPrice}
          percentChange={percentChange}
        />

        {/* Chart */}
        <Chart chartData={chartData} />

        <YearFilter
          years={years}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
        />
      </CardContent>
    </Card>
  );
}
