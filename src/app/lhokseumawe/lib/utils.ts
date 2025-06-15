// lib/utils.ts
export const formatYAxisLabel = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return `${value}`;
};

export const parseIDRValue = (value: string): number => {
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
