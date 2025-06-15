"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { VideoInfo } from "@/types/videoInfo";
import { Music2, Video } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function VideoCard({
  videoInfo,
  onDownload, // Tambahkan callback
}: {
  videoInfo: VideoInfo;
  onDownload: (url: string, format: string) => void; // Definisikan tipe
}) {
  const [format, setFormat] = useState("mp4");

  return (
    <article className="grid grid-cols-2 gap-4  mt-6">
      <div className="thumbnail mb-4 border overflow-hidden rounded-lg">
        <Image
          src={videoInfo.thumbnail || "/placeholder.jpg"}
          alt="Thumbnail"
          width={500}
          height={500}
          className="w-full h-auto "
        />
        <div>
          <h2 className="text-xl font-bold p-2">{videoInfo.fulltitle}</h2>
          <hr />
          <div className="channel flex gap-2  p-2 items-center ">
            <p>
              {videoInfo.channel} {videoInfo.channel_is_verified && "✓"}
            </p>
            <p className="text-sm text-gray-500">{videoInfo.uploader_id}</p>
          </div>
          <hr />
          <div className="details flex gap-2 p-2">
            <p className="text-sm">{videoInfo.duration_string}</p>
            <p className="text-sm text-gray-500">
              {videoInfo.filesize_approx} bytes
            </p>
          </div>
        </div>
      </div>

      <div className="info">
        <p className="text-sm text-gray-700 line-clamp-3">
          {videoInfo.description}
        </p>

        <div className="mt-4 w-fit">
          <Label htmlFor="format" className="sr-only">
            Format:
          </Label>
          <div
            className="flex  overflow-hidden rounded-md border-none mt-2"
            role="group"
            aria-label="Format Selection"
          >
            <Button
              type="button"
              onClick={() => setFormat("mp4")}
              className={`
         transition-colors duration-200 rounded-l-md rounded-r-none
        ${
          format === "mp4"
            ? "bg-slate-500 border text-white shadow-none hover:bg-slate-600 hover:text-white "
            : " text-gray-700 bg-white "
        }
      `}
              aria-pressed={format === "mp4"}
              variant={"ghost"}
            >
              <Video />
              Video
            </Button>

            <Button
              type="button"
              onClick={() => setFormat("mp3")}
              className={`
         transition-colors duration-200 rounded-r-md rounded-l-none
        ${
          format === "mp3"
            ? " bg-slate-500 border text-white shadow-none hover:bg-slate-600 hover:text-white"
            : "bg-white text-gray-700 shadow-none"
        }
      `}
              aria-pressed={format === "mp3"}
              variant={"ghost"}
            >
              <Music2 />
              Audio
            </Button>
          </div>
        </div>

        <button
          onClick={() => onDownload(videoInfo.url || "", format)} // Gunakan callback
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Download {format === "mp3" ? "Audio" : "Video"}
        </button>
      </div>
    </article>
  );
}
