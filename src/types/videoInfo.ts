export interface VideoInfo {
  status: "success" | "error";
  title?: string;
  fulltitle?: string;
  description?: string;
  thumbnail?: string | null;
  channel?: string;
  channel_is_verified?: boolean;
  uploader_id?: string;
  uploader_url?: string;
  upload_date?: string;
  duration_string?: string;
  filesize_approx?: number | string;
  error?: string;
  url?: string; // Tambahkan ini
}
