// app/banda-aceh/hooks/useURLSync.ts
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useURLSync = (dataYears: string[]) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Ekstrak tahun dari data
  const years = Array.from(
    new Set(dataYears.map((year) => year.toString()))
  ).sort();

  // Ambil nilai year dari URL
  const urlYear = searchParams.get("year") || null;

  // Set default year
  const [selectedYear, setSelectedYear] = useState<string | null>(
    urlYear ||
      (years.includes("2025")
        ? "2025"
        : years.length > 0
        ? years[years.length - 1]
        : null)
  );

  // Sinkronkan URL dengan state
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (selectedYear) {
      params.set("year", selectedYear);
    } else {
      params.delete("year");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [selectedYear, pathname, router, searchParams]);

  return { selectedYear, setSelectedYear, years };
};
