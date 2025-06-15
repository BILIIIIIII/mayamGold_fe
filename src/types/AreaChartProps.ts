interface ChartDataType {
  time: string;
  close: number;
  open: number;
}

export interface AreaChartProps {
  chartData: ChartDataType[];
  formatYAxisLabel: (value: number) => string;
}
