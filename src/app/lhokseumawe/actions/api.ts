"use server";

import { Prediction } from "../containers/predictContainer";

// src/actions/api.ts
export async function fetchPredictions(): Promise<Prediction[]> {
  try {
    const response = await fetch("http://127.0.0.1:8000/predict_next_year/");
    const data = await response.json();

    // Pastikan data adalah array
    if (!Array.isArray(data)) {
      console.error("Invalid response format:", data);
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error fetching predictions:", error);
    return []; // Return array kosong jika error
  }
}
