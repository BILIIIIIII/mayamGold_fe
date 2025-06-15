"use server";

export async function startDownload(url: string, format: string) {
  try {
    const response = await fetch(
      `http://localhost:8000/download?url=${encodeURIComponent(
        url
      )}&fmt=${encodeURIComponent(format)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "text/event-stream",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Gagal memulai download");
    }

    // Hapus semua logika reader karena SSE tetap harus dihandle di client
    return { status: "success", message: "Download dimulai" };
  } catch (error) {
    console.error("Error starting download:", error);
    throw error;
  }
}
