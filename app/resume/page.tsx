import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { typed } from "../fonts";
import "./resume.css";

export const metadata: Metadata = {
  title: "Resume, Karim Baba",
  description: "Karim Baba's resume.",
};

export const viewport: Viewport = {
  themeColor: "#e9e8e4",
  colorScheme: "light",
};

// The image is rendered from the PDF by scripts/render-resume.sh, so what people
// read here is exactly what they download.
export default function ResumePage() {
  return (
    <div className={`desk-resume ${typed.variable}`}>
      <header className="r-bar">
        <div className="r-bar-in">
          <Link className="r-back" href="/">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
              aria-hidden
              focusable="false"
            >
              <path d="M13 8H3.5M7.5 4 3.5 8l4 4" />
            </svg>
            Karim Baba
          </Link>
          <a className="r-download" href="/Karim-Baba-Resume.pdf" download>
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
              aria-hidden
              focusable="false"
            >
              <path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13.5h10" />
            </svg>
            <span>Download PDF</span>
          </a>
        </div>
      </header>
      <main className="r-page">
        <h1 className="r-hidden">Resume</h1>
        {/* On a phone the sheet is too small to read, so a tap opens it full
            size where pinch zoom works. */}
        <a
          className="r-sheet"
          href="/resume.webp"
          target="_blank"
          rel="noopener"
          aria-label="Open the resume full size"
        >
          <Image
            src="/resume.webp"
            alt="Karim Baba's resume"
            width={1700}
            height={2200}
            preload
            quality={90}
            sizes="(min-width: 55rem) 51rem, calc(100vw - 2rem)"
          />
        </a>
        <p className="r-hint">Tap the page to open it full size.</p>
      </main>
    </div>
  );
}
