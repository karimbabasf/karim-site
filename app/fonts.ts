import { Geist } from "next/font/google";

// The homepage and resume type everything in Geist; next/font self-hosts it
// and preloads the latin subset, the only one either page draws.
export const typed = Geist({
  subsets: ["latin"],
  variable: "--font-typed",
  display: "swap",
});
