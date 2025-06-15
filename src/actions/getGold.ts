// app/actions/getTheses.js
"use server";

export async function fetchGolds() {
  try {
    const response = await fetch("http://157.245.157.23:3000/gold_prices/", {
      method: "GET", // atau POST, tergantung API-nya
    });

    if (!response.ok) {
      throw new Error("Gagal fetch data");
    }

    const data = await response.json();
    // console.log("gold:", data);

    return data;
  } catch (error) {
    console.error("Error fetching golds data:", error);
    return null;
  }
}
