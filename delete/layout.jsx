import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "فروشگاه عصر دیجیتال",
  description: "سایت رسمی فروشگاه عصر دیجیتال",
  keywords: "فروشگاه, عصر دیجیتال, فروشگاه عصر دیجیتال",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={inter.variable}>
      <head>
        {/* Preload Vazir for faster first paint of Persian text */}
        <link
          rel="preload"
          href="/fonts/vazir/Vazir-FD-WOL.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased bg-slate-100 min-h-screen">{children}</body>
    </html>
  );
}
