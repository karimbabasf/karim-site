import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import { blogUrl } from "@/lib/blog";
import "./blog.css";

// Manrope comes from the same files the home page loads (public/fonts, see blog.css); Geist Mono is for code only.
const mono = Geist_Mono({ variable: "--font-code", subsets: ["latin"], preload: false });

export const metadata: Metadata = {
  title: { default: "Blog, Karim Baba", template: "%s, Karim Baba" },
  description: "Posts by Karim Baba, engineer and founder in San Francisco.",
  alternates: { types: { "application/rss+xml": `${blogUrl}/feed.xml` } },
};

export const viewport: Viewport = {
  themeColor: "#020202",
  colorScheme: "dark",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <div className={`blog ${mono.variable}`}>{children}</div>;
}
