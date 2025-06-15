"use client";

import { PredictionChart } from "../components/predictionChart";
import { PredictionCard } from "../components/predictionCard";
import { useEffect, useState } from "react";
import { fetchPredictions } from "../actions/api";

export type Prediction = {
  predicted_price: number;
  date: string;
  // Add other fields if needed
};

export default function Predict() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  //   const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPredictions() {
      //   setIsLoading(true);
      const data = await fetchPredictions();
      setPredictions(data);
      //   setIsLoading(false);
    }
    loadPredictions();
  }, []);

  console.log(predictions);

  const latestPrediction = predictions[predictions.length - 1]?.predicted_price;

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">
        Prediksi Harga Emas Tahun Depan
      </h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <PredictionCard
          title="Prediksi Terakhir"
          value={predictions.length > 0 ? latestPrediction : "Tidak tersedia"}
        />
        <PredictionCard title="Durasi Prediksi" value="365 Hari" />
        <PredictionCard
          title="Tanggal Akhir"
          value={
            predictions.length > 0
              ? predictions[predictions.length - 1]?.date || "Tidak tersedia"
              : "Memuat..."
          }
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border-none outline-none shadow-none p-4">
        <h2 className="text-xl font-semibold mb-4">Tren Harga Emas</h2>
        {predictions.length > 0 ? (
          <PredictionChart data={predictions} />
        ) : (
          <p className="text-center py-8 text-muted-foreground">
            Tidak ada data prediksi tersedia. Silakan coba lagi nanti.
          </p>
        )}
      </div>
    </main>
  );
}
