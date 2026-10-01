import { Google_Sans_Code, Google_Sans_Flex } from "next/font/google";

// Google Sans Flex sets the whole page: its width axis cuts the engraved
// nameplate and labels wide. Only wdth rides along: adding opsz nearly triples
// the file (119 KB to 315 KB), too much for a phone in an in-app browser.
// Google Sans Code sets the readouts on the glass displays.
export const sans = Google_Sans_Flex({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-sans",
  display: "swap",
});

export const code = Google_Sans_Code({
  subsets: ["latin"],
  variable: "--font-code",
  display: "swap",
});
