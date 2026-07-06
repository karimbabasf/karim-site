import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Absolute base for OG/Twitter image URLs. On Vercel this resolves to the
// production domain; locally it falls back to the dev server.
const metadataBase = new URL(
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000",
);

export const metadata: Metadata = {
  metadataBase,
  title: "Karim Baba",
  description: "Karim Baba, AI-native builder in San Francisco.",
  openGraph: {
    type: "website",
    title: "Karim Baba",
    description: "AI-native builder, BD @ 1Claw. Based in San Francisco.",
    siteName: "Karim Baba",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karim Baba",
    description: "AI-native builder, BD @ 1Claw. Based in San Francisco.",
    creator: "@karimbabasf",
  },
};

// Pitch-black browser chrome (status bar / overscroll / in-app browsers like
// Telegram). Without this, mobile in-app browsers tint the area above the page
// with a default color instead of matching the black background.
export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  // Extend the layout into the safe area so the nav's black background can fill
  // the notch / in-app-browser toolbar strip (see the safe-area padding on the
  // <header> in components/site-shell.tsx). Without this, that top strip renders
  // page content bleeding through — the "clear top" in Telegram's browser.
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // The pre-paint script below sets data-theme on <html> from localStorage
      // before hydration, so the client attribute intentionally differs from SSR.
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Apply the saved accent before first paint so blue mode never flashes green. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('karim-theme')==='blue')document.documentElement.dataset.theme='blue';}catch(e){}",
          }}
        />
        {/* Decide the intro before first paint: a return visit (or reduced
            motion) is revealed instantly via [data-intro="seen"]; a first visit
            stays black ([data-intro="play"]) until the cinematic reveal runs —
            so the page never flashes in before the intro takes over. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var s=sessionStorage.getItem('karim-intro-seen')==='1',r=matchMedia('(prefers-reduced-motion: reduce)').matches;document.documentElement.dataset.intro=(s||r)?'seen':'play';}catch(e){document.documentElement.dataset.intro='play';}",
          }}
        />
        {children}
      </body>
    </html>
  );
}
