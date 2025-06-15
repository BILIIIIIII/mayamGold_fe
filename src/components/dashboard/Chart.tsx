"use client";

import {
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

interface ChartDataType {
  time: string;
  close: number;
  open: number;
}

interface ChartProps {
  chartData: ChartDataType[];
}

export const Chart = ({ chartData }: ChartProps) => {
  if (chartData.length === 0) return null;

  const formatYAxisLabel = (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return `${value}`;
  };

  return (
    <section className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
        >
          <CartesianGrid vertical={false} stroke="#f1f5f9" strokeWidth={1} />
          <XAxis
            dataKey="time"
            tickLine={false}
            tick={{ fontSize: 12 }}
            // tickMargin={8}
            angle={-15}
            textAnchor="end"
            interval={Math.ceil(chartData.length / 11)}
          />
          <YAxis
            tickFormatter={formatYAxisLabel}
            tick={{ fontSize: 12 }}
            tickLine={false}
          />
          <Tooltip
            cursor={false}
            formatter={(value) =>
              new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              }).format(Number(value))
            }
          />
          <Legend />
          <defs>
            <linearGradient id="fillIDR" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55a" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#22c55a" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            type="basis"
            dataKey="close"
            fill="url(#fillIDR)"
            fillOpacity={0.4}
            stroke="#22c55e"
            strokeWidth={2}
            stackId={"a"}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </section>
  );
};
