"use client";

import { Gold } from "@/types/gold";
import GoldChart from "../dashboard/GoldChart";
// import GoldTable from "../GoldTable/GoldTable";

interface GoldsListProps {
  initialGoldsData?: Gold[];
}

export default function GoldsList({ initialGoldsData = [] }: GoldsListProps) {
  // If initialGoldsData is undefined or null, use empty array
  const goldsData = initialGoldsData ?? [];

  return (
    <div className="w-full mx-auto ">
      {/* <h1 className="text-4xl font-bold mb-8">Data Gold</h1> */}

      {goldsData.length === 0 ? (
        <p className="text-center text-gray-600">
          Gagal memuat data. server belum hidup!
        </p>
      ) : (
        <main className="border-none shadow-none outline-none rounded-2xl bg-transparent">
          <GoldChart data={goldsData} />
          {/* <GoldTable data={goldsData} /> */}
        </main>
      )}
    </div>
  );
}
