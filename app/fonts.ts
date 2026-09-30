import localFont from "next/font/local";

// Google Sans Flex (SIL OFL, see fonts-site/OFL.txt), self-hosted as two cuts
// taken from its opsz axis so the page ships 38 KB of type instead of 117 KB.
//
// Text: opsz pinned at 16, weight kept variable from 400 to 600, latin only.
// Display: opsz 96 at weight 600, cut down to the glyphs of "Karim Baba". If
// the name ever changes, fetch it again from the Google Fonts css2 API with
// family=Google+Sans+Flex:opsz,wght@96,600&text=<the new name>.
export const text = localFont({
  src: "./fonts-site/GoogleSansFlex-Text.woff2",
  weight: "400 600",
  variable: "--font-text",
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

export const display = localFont({
  src: "./fonts-site/GoogleSansFlex-Display.woff2",
  weight: "600",
  variable: "--font-display",
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});
