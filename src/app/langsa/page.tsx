import Navigation from "@/components/main/Navigation";
import BandaPriceContainer from "./containers/BandaPriceContainer";
import { fetchGolds } from "@/actions/getGold";

import type { Viewport } from "next";
import Predict from "./containers/predictContainer";

export const viewport: Viewport = {
  themeColor: "black",
  width: "device-width",
  initialScale: 1,
};

export default async function Home() {
  let initialGoldsData = [];

  try {
    const response = await fetchGolds();
    const mayam = 3.3;

    if (Array.isArray(response)) {
      initialGoldsData = response.map((gold) => ({
        ...gold,
        open: (parseFloat(gold.open) * mayam).toString(),
        close: (parseFloat(gold.close) * mayam).toString(),
      }));
    }
  } catch (error) {
    console.error("Error fetching Golds:", error);
  }

  return (
    <div className="w-full grid min-h-screen p-1 pb-20 lg:p-0 ">
      <Navigation />

      <main className="w-full min-h-screen max-w-[1200px] mx-auto p-4 flex flex-col gap-4">
        <BandaPriceContainer data={initialGoldsData} />
        <Predict />
      </main>
    </div>
  );
}
