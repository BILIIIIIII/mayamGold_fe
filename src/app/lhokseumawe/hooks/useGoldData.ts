// app/banda-aceh/hooks/useGoldData.ts
import { Gold } from "@/types/gold";
import { useMemo } from "react";
import { parseIDRValue } from "../lib/utils";

export const useGoldData = (data: Gold[], selectedYear: string | null) => {
  return useMemo(() => {
    // Filter data berdasarkan tahun
    const filteredData = selectedYear
      ? data.filter(
          (item) =>
            new Date(item.time).getFullYear().toString() === selectedYear
        )
      : data;

    // Urutkan data
    const sortedData = [...filteredData].sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );

    // Format data untuk chart
    const chartData = sortedData.map((item) => ({
      time: item.time,
      close: parseIDRValue(item.close),
      open: parseIDRValue(item.open),
    }));

    // Hitung metrik
    const initialPrice = chartData[0]?.close ?? 0;
    const currentPrice = chartData[chartData.length - 1]?.close ?? 0;
    const highPrice = Math.max(...chartData.map((item) => item.close));
    const lowPrice = Math.min(...chartData.map((item) => item.close));
    const absoluteChange = currentPrice - initialPrice;
    const percentChange =
      initialPrice !== 0
        ? (absoluteChange / initialPrice) * 100
        : currentPrice !== 0
        ? 100
        : 0;

    return {
      chartData,
      metrics: {
        initialPrice,
        currentPrice,
        highPrice,
        lowPrice,
        absoluteChange,
        percentChange,
      },
    };
  }, [data, selectedYear]);
};
