"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import VideoCard from "./VideoCard";
import { getVideoInfo } from "@/actions/get_video_info";
import { VideoInfo } from "@/types/videoInfo";
import { ArrowRight, LucideLink2 } from "lucide-react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const initialRender = useRef(true);

  // Auto-select saat klik input
  const handleInputFocus = () => {
    urlInputRef.current?.select();
  };

  // Validasi URL
  const isValidUrl = useCallback((url: string) => {
    try {
      const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/i;
      return regex.test(url);
    } catch {
      return false;
    }
  }, []);

  const processUrl = useCallback(
    async (urlToProcess: string) => {
      if (!urlToProcess.trim() || !isValidUrl(urlToProcess)) return;

      setIsLoading(true);
      setError("");

      try {
        const data = await getVideoInfo(urlToProcess);
        if (data.status === "success") {
          setVideoInfo({ ...data, url: urlToProcess });
        } else {
          throw new Error(data.error || "Gagal memproses link");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || "Terjadi kesalahan");
        } else {
          setError("Terjadi kesalahan");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [, isValidUrl, setError, setIsLoading, setVideoInfo]
  );

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await processUrl(url);
  };

  // Auto-proses saat URL berubah
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      if (url && isValidUrl(url)) {
        processUrl(url);
      }
    }, 1000); // Delay 1 detik untuk menghindari request terlalu sering

    return () => clearTimeout(timer);
  }, [url, processUrl, isValidUrl]);

  // Handle download dengan modal
  const handleDownload = (url: string, format: string) => {
    if (!url) {
      setError("URL tidak tersedia untuk video ini");
      return;
    }

    setIsModalOpen(true);
    setProgress(0);

    const evtSource = new EventSource(
      `http://localhost:8000/download?url=${encodeURIComponent(
        url
      )}&fmt=${encodeURIComponent(format)}`
    );

    evtSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.status === "success") {
          setTimeout(() => {
            setIsModalOpen(false);
            evtSource.close();
          }, 1000);
        } else if (data.status === "error") {
          setError(data.error);
          setIsModalOpen(false);
          evtSource.close();
        }
      } catch {
        const percentMatch = event.data.match(/(\d+\.\d+)%/);
        if (percentMatch) {
          setProgress(parseFloat(percentMatch[1]));
        }
      }
    };

    evtSource.onerror = () => {
      setError("Koneksi terputus selama download");
      setIsModalOpen(false);
      evtSource.close();
    };
  };

  return (
    <main className="min-h-screen max-w-[1000px] mx-auto flex items-center justify-center p-4">
      {/* Modal Progress */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Download Progress</h2>

            <progress
              className="w-full h-2 bg-slate-200 rounded-full overflow-hidden"
              value={progress}
              max="100"
            />

            <div className="mt-4 text-center">
              <p className="text-lg font-medium">
                {progress.toFixed(1)}% selesai
              </p>
              {progress >= 100 && (
                <p className="text-green-600 mt-2">Download selesai!</p>
              )}
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full mt-6 bg-slate-200 text-slate-800 py-2 px-4 rounded-md hover:bg-slate-300 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      <Card className="w-full max-w-[800px] shadow-none border-none">
        <CardHeader>
          <CardTitle className="text-5xl text-center">
            YouTube Downloader
          </CardTitle>
          <CardDescription className="text-center">
            Download YouTube videos in MP3, MP4 formats
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url" className="sr-only">
                YouTube URL
              </Label>

              <div className="flex gap-2 py-1 px-3 items-center border-2 border-slate-200 rounded-2xl overflow-hidden">
                <LucideLink2 />

                <Input
                  id="url"
                  ref={urlInputRef}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onFocus={handleInputFocus}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className={`
                    ${
                      error
                        ? "border-red-500"
                        : "border-none shadow-none focus:!ring-0 focus:!border-transparent"
                    }
                    focus:outline-none
                  `}
                  style={{ outline: "none", boxShadow: "none" }}
                />

                <Button type="submit" disabled={isLoading} variant={"ghost"}>
                  {isLoading ? (
                    <span className="flex items-center">
                      <span className="animate-spin h-4 w-4 mr-2 border-2 border-slate-800 border-t-transparent rounded-full"></span>
                    </span>
                  ) : (
                    <ArrowRight />
                  )}
                </Button>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </form>

          {videoInfo && (
            <VideoCard onDownload={handleDownload} videoInfo={videoInfo} />
          )}
        </CardContent>
      </Card>
    </main>
  );
}
