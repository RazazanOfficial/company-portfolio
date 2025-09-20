import localFont from "next/font/local";
import { Sora } from "next/font/google";

export const vazir = localFont({
  src: [
    {
      path: "../../../public/fonts/vazir/Vazir-FD-WOL.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/vazir/Vazir-FD-WOL.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-fa",
  display: "swap",
});

export const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-en",
  display: "swap",
});
