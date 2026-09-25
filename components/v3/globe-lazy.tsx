"use client";

import dynamic from "next/dynamic";

const Globe = dynamic(() => import("./globe"), { ssr: false });

export default function GlobeLazy() {
  return (
    <div className="v3-globe">
      <Globe />
    </div>
  );
}
