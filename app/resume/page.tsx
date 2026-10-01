import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { code, sans } from "../fonts";
import { ArrowLeft, Download } from "@/components/instrument/icons";
import { Light } from "@/components/instrument/light";
import "../instrument.css";
import "./resume.css";

export const metadata: Metadata = {
  title: "Resume, Karim Baba",
  description: "Karim Baba's resume.",
};

export const viewport: Viewport = {
  themeColor: "#dfe1e2",
  colorScheme: "light",
};

// The printed sheet lying on the same aluminium as the homepage. The image is
// rendered from the PDF by scripts/render-resume.sh, so what people read here is
// exactly what they download.
export default function ResumePage() {
  return (
    <div className={`face ${sans.variable} ${code.variable}`}>
      <Light />
      <header className="r-bar">
        <div className="r-bar-in">
          <Link className="key key--sm raised" href="/">
            <ArrowLeft className="key-icon" />
            Karim Baba
          </Link>
          <a className="key key--sm raised" href="/Karim-Baba-Resume.pdf" download>
            <Download className="key-icon" />
            Download PDF
          </a>
        </div>
      </header>
      <main className="r-page">
        <h1 className="vh">Resume</h1>
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
