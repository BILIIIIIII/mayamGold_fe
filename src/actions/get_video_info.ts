"use server"

export async function getVideoInfo(url: string) {
  try {
    const response = await fetch(`http://localhost:8000/video_info?url=${encodeURIComponent(url)}`)
    
    if (!response.ok) {
      throw new Error("Gagal mengambil informasi video")
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching video info:", error)
    throw error
  }
}