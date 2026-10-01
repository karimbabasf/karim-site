"use client";

import { useEffect, useState } from "react";

const sf = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: "America/Los_Angeles",
});

// San Francisco local time. The server sends dashes, like a display that has
// not synced yet; the client fills it in and then ticks on the minute.
export function Clock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    let id = 0;
    const tick = () => {
      setTime(sf.format(new Date()));
      id = window.setTimeout(tick, 60_000 - (Date.now() % 60_000) + 40);
    };
    tick();
    return () => window.clearTimeout(id);
  }, []);

  const shown = time ?? "--:--";
  return (
    <time className="clock" dateTime={time ?? undefined}>
      <span className="vh">{time ? `${time} in San Francisco` : "Local time in San Francisco"}</span>
      <span aria-hidden>
        {shown.split("").map((c, i) => (
          <Digit key={i} value={c} />
        ))}
      </span>
    </time>
  );
}

// A digit changes like a lit numeral in a stack of glass: the new one comes
// forward out of focus and sharpens while the old one sinks back and fades.
export function Digit({ value }: { value: string }) {
  const [cur, setCur] = useState(value);
  const [prev, setPrev] = useState<string | null>(null);
  if (value !== cur) {
    setPrev(cur);
    setCur(value);
  }
  return (
    <span className="dg">
      {prev !== null ? (
        <span key={`o${prev}`} className="dg-out" onAnimationEnd={() => setPrev(null)}>
          {prev}
        </span>
      ) : null}
      <span key={`i${cur}`} className={prev !== null ? "dg-in" : undefined}>
        {cur}
      </span>
    </span>
  );
}
