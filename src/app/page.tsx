import GoldsList from "@/components/main/GoldList";
import { Gold } from "@/types/gold";
import { fetchGolds } from "@/actions/getGold";
import Navigation from "@/components/main/Navigation";

import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "black",
  width: "device-width",
  initialScale: 1,
};

export default async function Home() {
  let goldsData: Gold[] = [];

  try {
    const response = await fetchGolds();
    goldsData = response || [];
  } catch (error) {
    console.error("Error fetching Golds:", error);
  }

  // console.log("studentsData:", studentsData);
  // console.log("goldsData:", goldsData);

  return (
    <div className="w-full grid min-h-screen p-1 pb-20 gap-16 lg:p-0 font-[family-name:var(--font-geist-sans)]">
      <Navigation />
      <main className="w-full min-h-screen max-w-[1200px] mx-auto border-none outline-none shadow-none p-4 flex flex-col gap-4">
        {/* <ThesesList initialStudentsData={studentsData} /> */}
        <GoldsList initialGoldsData={goldsData} />
      </main>
    </div>
  );
}
