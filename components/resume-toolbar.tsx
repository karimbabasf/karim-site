import Link from "next/link";

/**
 * Viewer chrome for /resume: a quiet strip on the desk above the sheet. The
 * download is a small chip of the same card stock, the one call to action.
 */
export default function ResumeToolbar() {
  return (
    <header className="resumeBar">
      <div className="resumeBar-inner">
        <Link href="/" aria-label="Back to home" className="resumeBar-back">
          Back
        </Link>

        <span className="resumeBar-title" aria-hidden>
          Résumé
        </span>

        <a
          href="/Karim-Baba-Resume.pdf"
          download="Karim-Baba-Resume.pdf"
          aria-label="Download résumé as PDF"
          className="resumeBar-download"
        >
          Download PDF
        </a>
      </div>
    </header>
  );
}
