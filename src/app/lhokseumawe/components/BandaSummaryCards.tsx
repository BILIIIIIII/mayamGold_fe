"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

interface BandaSummaryCardDetailProps {
  title: string;
  percentChange: number;
  highPrice: number;
  lowPrice: number;
  currency?: "close" | "open";
  isPercentage?: boolean;
  isHigh?: boolean;
  isLow?: boolean;
  absoluteChange?: number;
}

const SummaryCards = ({
  title,
  percentChange,
  highPrice,
  lowPrice,
  isPercentage,
  isHigh,
  isLow,
  absoluteChange,
}: BandaSummaryCardDetailProps) => {
  const renderpercentChange = () => {
    const formattedpercentChange = new Intl.NumberFormat("id-ID", {}).format(
      percentChange
    );
    const formattedHighPrice = new Intl.NumberFormat("id-ID", {}).format(
      highPrice
    );
    const formattedLowPrice = new Intl.NumberFormat("id-ID", {}).format(
      lowPrice
    );

    if (isPercentage && absoluteChange !== undefined) {
      const Icon = percentChange >= 0 ? TrendingUp : TrendingDown;
      const formattedChange = new Intl.NumberFormat("id-ID", {}).format(
        absoluteChange
      );
      const formattedPercentage = `${percentChange.toFixed(2)}%`;

      const textColor = percentChange >= 0 ? "text-green-500" : "text-red-500";

      return (
        <div className="flex gap-1 dark:bg-zinc-900 bg-slate-50 ">
          <Icon className={`w-5 h-5 ${textColor}`} />
          <div className="flex gap-4">
            <span className={textColor}>{formattedChange}</span>
            <span className={textColor}>{formattedPercentage}</span>
          </div>
        </div>
      );
    }

    if (isHigh) {
      return (
        <div className="flex items-baseline gap-4 dark:bg-zinc-900 bg-slate-50 ">
          <span className="text-sm text-slate-400">{title}</span>
          <div className="flex items-center gap-1 text-slate-600">
            <span className="text-lg">{formattedHighPrice}</span>
            <sub className="text-xs">IDR</sub>
          </div>
        </div>
      );
    }

    if (isLow) {
      return (
        <div className="flex items-center gap-4 dark:bg-zinc-900 bg-slate-50 ">
          <span className="text-sm text-slate-400">{title}</span>
          <div className="flex items-baseline gap-1 text-slate-600">
            <span className="text-lg">{formattedLowPrice}</span>
            <sub className="text-xs">IDR</sub>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-baseline gap-1 dark:bg-zinc-900 bg-slate-50 ">
        <span className="text-5xl">{formattedpercentChange}</span>
        <sub className="text-sm">IDR</sub>
      </div>
    );
  };

  return (
    <Card className="shadow-none border-none">
      <CardContent className="flex flex-col justify-between m-0 p-0 gap-2">
        <span
          className={`text-2xl font-bold text-left ${
            isPercentage
              ? percentChange >= 0
                ? "text-green-500"
                : "text-red-500"
              : "text-foreground"
          }`}
        >
          {renderpercentChange()}
        </span>
      </CardContent>
    </Card>
  );
};

interface BandaSummaryCardsProps {
  currentPrice: number;
  highPrice: number;
  lowPrice: number;
  percentChange: number;
  absoluteChange: number;
}

const BandaSummaryCards = ({
  currentPrice,
  highPrice,
  lowPrice,
  percentChange,
  absoluteChange,
}: BandaSummaryCardsProps) => {
  return (
    <section className="flex justify-between gap-2 ">
      <article className="flex items-baseline gap-4 ">
        <SummaryCards
          title="Current"
          lowPrice={lowPrice}
          highPrice={highPrice}
          percentChange={currentPrice}
          currency="close"
        />
        <SummaryCards
          title="Changed (YTD)"
          lowPrice={lowPrice}
          highPrice={highPrice}
          percentChange={percentChange}
          absoluteChange={absoluteChange}
          isPercentage
        />
      </article>
      <article className="flex flex-col">
        <SummaryCards
          title="High"
          lowPrice={lowPrice}
          highPrice={highPrice}
          absoluteChange={absoluteChange}
          percentChange={percentChange}
          currency="close"
          isHigh
        />
        <SummaryCards
          title="Low"
          lowPrice={lowPrice}
          highPrice={highPrice}
          percentChange={percentChange}
          currency="close"
          isLow
        />
      </article>
    </section>
  );
};

export default BandaSummaryCards;
