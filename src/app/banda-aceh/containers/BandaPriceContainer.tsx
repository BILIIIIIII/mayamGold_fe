// app/banda-aceh/containers/BandaPriceContainer.tsx
"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { useGoldData } from "../hooks/useGoldData";
import { useURLSync } from "../hooks/useURLSync";

import BandaCardHeader from "../components/BandaCardHeader";
import BandaChart from "../components/BandaChart";
import BandaGoldTable from "../components/BandaGoldTable";
import BandaSummaryCards from "../components/BandaSummaryCards";
import BandaYearFilter from "../components/BandaYearFilter";
import { Gold } from "@/types/gold";

interface GoldChartProps {
  data: Gold[];
}

export default function BandaPriceContainer({ data }: GoldChartProps) {
  // Ekstrak tahun dari data untuk URL sync
  const dataYears = data.map((item) =>
    new Date(item.time).getFullYear().toString()
  );

  // Gunakan custom hooks
  const { selectedYear, setSelectedYear, years } = useURLSync(dataYears);
  const { chartData, metrics } = useGoldData(data, selectedYear);

  if (chartData.length === 0) return null;

  return (
    <Card className="dark:bg-zinc-900 bg-slate-50 mb-8 pt-10 shadow-none border-0">
      <CardHeader>
        <BandaCardHeader />
      </CardHeader>

      <CardContent className="mt-16">
        <BandaSummaryCards
          currentPrice={metrics.currentPrice}
          highPrice={metrics.highPrice}
          lowPrice={metrics.lowPrice}
          percentChange={metrics.percentChange}
          absoluteChange={metrics.absoluteChange}
        />

        <hr className="my-4" />

        {/* Tab Komponen */}
        <Tabs defaultValue="chart">
          <TabsList>
            <TabsTrigger value="chart">Chart Mayam</TabsTrigger>
            <TabsTrigger value="mayam-table">Kalkulator Mayam</TabsTrigger>
            <TabsTrigger value="data-table">Data Tabel</TabsTrigger>
          </TabsList>

          <TabsContent value="mayam-table">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mayam</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 30 }, (_, i) => 30 - i).map((mayam) => {
                  const total = metrics.currentPrice * mayam;
                  const formattedTotal = new Intl.NumberFormat("id-ID").format(
                    total
                  );

                  return (
                    <TableRow key={mayam}>
                      <TableCell>{mayam}</TableCell>
                      <TableCell>{formattedTotal}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="chart">
            <div className="flex justify-between items-center gap-4">
              <h3 className="text-slate-400">
                Harga per tanggal 29 April 2025 GMT+7
              </h3>
              <BandaYearFilter
                years={years}
                selectedYear={selectedYear}
                onYearChange={setSelectedYear}
              />
            </div>
            <BandaChart chartData={chartData} />
          </TabsContent>

          <TabsContent value="data-table">
            <BandaGoldTable
              data={chartData.map((row) => ({
                ...row,
                close: new Intl.NumberFormat("id-ID").format(row.close),
                open: new Intl.NumberFormat("id-ID").format(row.open),
              }))}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
