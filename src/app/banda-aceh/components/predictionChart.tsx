import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
} from "recharts";

interface PredictionData {
  date: string;
  predicted_price: number;
}

interface PredictionChartProps {
  data: PredictionData[];
  isLoading?: boolean;
}

export function PredictionChart({ data, isLoading }: PredictionChartProps) {
  if (isLoading) {
    return (
      <div className="h-64 w-full bg-muted rounded-lg animate-pulse"></div>
    );
  }

  return (
    <div className="h-64 md:h-80 w-full border-none outline-none shadow-none">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(tick) => new Date(tick).toLocaleDateString()}
          />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip
            labelFormatter={(label) => new Date(label).toLocaleDateString()}
            formatter={(value) => {
              const num =
                typeof value === "number" ? value : parseFloat(value as string);
              return [`$${!isNaN(num) ? num.toFixed(2) : value}`, "Harga Emas"];
            }}
          />
          <Line
            type="monotone"
            dataKey="predicted_price"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
