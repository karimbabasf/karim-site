import Link from "next/link";

/**
 * Viewer chrome for /resume, as on the home page: Back on the left, the
 * download on the right, both plain text in the dark.
 */
export default function ResumeToolbar() {
  return (
    <header className="resumeBar">
      <Link href="/" aria-label="Back to home" className="resumeBar-back">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M10 3.5 5.5 8l4.5 4.5" />
        </svg>
        Back
      </Link>

      <a
        href="/Karim-Baba-Resume.pdf"
        download="Karim-Baba-Resume.pdf"
        aria-label="Download résumé as PDF"
        className="resumeBar-download"
      >
        Download PDF
      </a>
    </header>
  );
}
