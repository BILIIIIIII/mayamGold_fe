import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jaks",
  subsets: ["latin"],
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "IDR Gold Forecast App",
  description:
    "Aplikasi peramalan harga emas terkini di Indonesia. Dapatkan prediksi harga emas akurat dan terupdate setiap hari.",
  keywords: [
    "harga emas",
    "peramalan harga emas",
    "IDR gold forecast",
    "emas terkini",
    "investasi emas",
    "harga emas hari ini",
  ],
  authors: [{ name: "Nama Anda", url: "https://www.situswebanda.com" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://www.idrgoldforecast.com",
    title: "IDR Gold Forecast App",
    description:
      "Aplikasi peramalan harga emas terkini di Indonesia. Dapatkan prediksi harga emas akurat dan terupdate setiap hari.",
    images: [
      {
        url: "https://www.idrgoldforecast.com/images/og-image.png",
        width: 800,
        height: 600,
        alt: "IDR Gold Forecast App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    siteId: "1234567890",
    creator: "@twitteranda",
    creatorId: "1234567890",
    title: "IDR Gold Forecast App",
    description:
      "Aplikasi peramalan harga emas terkini di Indonesia. Dapatkan prediksi harga emas akurat dan terupdate setiap hari.",
    images: ["https://www.idrgoldforecast.com/images/twitter-card.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${plusJakartaSans.variable} antialiased dark:bg-zinc-900 bg-slate-50 dark:text-white`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
