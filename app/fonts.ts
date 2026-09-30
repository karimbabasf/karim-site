import { Kanit } from "next/font/google";
import localFont from "next/font/local";

export const sans = localFont({
  src: [
    { path: "../public/fonts/GeneralSans-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/GeneralSans-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/GeneralSans-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

// The name is the one display moment, so it gets its own face.
export const display = Kanit({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-display",
  display: "swap",
});
