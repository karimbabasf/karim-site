import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { display, sans } from "../fonts";
import "../simple.css";

export const metadata: Metadata = {
  title: "Resume, Karim Baba",
  description: "Karim Baba's resume.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

// The image is rendered from the PDF by scripts/render-resume.sh, so what people
// read here is exactly what they download.
export default function ResumePage() {
  return (
    <div className={`s ${sans.variable} ${display.variable}`}>
      <header className="r-bar">
        <Link className="r-back" href="/">
          <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden focusable="false">
            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
          </svg>
          Karim Baba
        </Link>
        <a className="s-btn s-btn-fill r-download" href="/Karim-Baba-Resume.pdf" download>
          Download PDF
        </a>
      </header>
      <main className="r-sheet">
        <Image
          src="/resume.webp"
          alt="Karim Baba's resume"
          width={1700}
          height={2200}
          priority
          unoptimized
        />
      </main>
    </div>
  );
}
