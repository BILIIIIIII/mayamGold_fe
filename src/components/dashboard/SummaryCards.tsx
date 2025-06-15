"use client";

import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { TrendingDown, TrendingUp } from "lucide-react";

interface SummaryCardDetailProps {
  title: string;
  value: number;
  currency?: "close" | "open";
  isPercentage?: boolean;
}

export const SummaryCard = ({
  title,
  value,
  currency,
  isPercentage,
}: SummaryCardDetailProps) => {
  const renderValue = () => {
    if (isPercentage) {
      const Icon = value >= 0 ? TrendingUp : TrendingDown;
      return (
        <div className="flex items-center gap-1">
          <Icon className="w-5 h-5" />
          <span>{value.toFixed(0)}%</span>
        </div>
      );
    }

    if (currency === "close") {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(value);
    }

    if (currency === "open") {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(value);
    }

    return value;
  };

  return (
    <Card className="h-full shadow-none p-4 border-none">
      <CardContent className="flex flex-col m-0 p-0 gap-2">
        <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
        <span
          className={`text-2xl font-bold text-left ${
            isPercentage
              ? value >= 0
                ? "text-green-500"
                : "text-red-500"
              : "text-foreground"
          }`}
        >
          {renderValue()}
        </span>
      </CardContent>
    </Card>
  );
};

interface SummaryCardsProps {
  currentPrice: number;
  highPrice: number;
  lowPrice: number;
  percentChange: number;
}

export const SummaryCards = ({
  currentPrice,
  highPrice,
  lowPrice,
  percentChange,
}: SummaryCardsProps) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <SummaryCard
        title="Harga Terkini"
        value={currentPrice}
        currency="close"
      />
      <SummaryCard title="Perubahan (YTD)" value={percentChange} isPercentage />
      <SummaryCard title="Harga Tertinggi" value={highPrice} currency="close" />
      <SummaryCard title="Harga Terendah" value={lowPrice} currency="close" />
    </section>
  );
};
