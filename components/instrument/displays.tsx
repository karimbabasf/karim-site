"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import { Digit } from "./clock";
import { Check } from "./icons";

// The glass display on each project module. Every display runs a short demo of
// that product's mechanism, in the product's own terms. They are labelled Demo
// on the glass: nothing on them is live data.

const RM = "(prefers-reduced-motion: reduce)";
const subscribeRM = (cb: () => void) => {
  const m = window.matchMedia(RM);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeRM,
    () => window.matchMedia(RM).matches,
    () => false,
  );
}

// True while the display is on screen and the tab is visible. Off screen, the
// loop stops and the CSS animations pause.
function useLive(ref: RefObject<HTMLElement | null>, enabled: boolean) {
  const [live, setLive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    let seen = false;
    const sync = () => setLive(seen && document.visibilityState === "visible");
    const io = new IntersectionObserver(
      ([e]) => {
        seen = e.isIntersecting;
        sync();
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [ref, enabled]);
  return enabled && live;
}

// Steps through a demo loop while live. Reduced motion holds the `still` frame,
// the one that best explains the product on its own.
function useLoop(durations: readonly number[], still: number) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const live = useLive(ref, !reduced);
  const [step, setStep] = useState(0);
  const at = useRef(0);

  useEffect(() => {
    if (!live) return;
    let id = 0;
    const next = () => {
      id = window.setTimeout(() => {
        at.current = (at.current + 1) % durations.length;
        setStep(at.current);
        next();
      }, durations[at.current]);
    };
    next();
    return () => window.clearTimeout(id);
  }, [live, durations]);

  return { ref, live, step: reduced ? still : step };
}

function Glass({
  mode,
  label,
  order,
  live,
  innerRef,
  children,
}: {
  mode: string;
  label: string;
  order: number;
  live: boolean;
  innerRef: RefObject<HTMLDivElement | null>;
  children: ReactNode;
}) {
  return (
    <div
      ref={innerRef}
      className="glass"
      role="img"
      aria-label={label}
      data-live={live ? "" : undefined}
      style={{ "--i": order } as CSSProperties}
    >
      <div className="glass-in">
        <p className="glass-bar">
          <span>{mode}</span>
          <span>Demo</span>
        </p>
        {children}
      </div>
    </div>
  );
}

function Status({ tone, children }: { tone: "dim" | "ok" | "wait"; children: string }) {
  return (
    <p className="ro-status" data-tone={tone}>
      {tone === "wait" ? (
        <i className="led" />
      ) : tone === "ok" ? (
        <Check className="ro-icon" />
      ) : (
        <i className="ro-tick" />
      )}
      <span key={children} className="ro-text">
        {children}
      </span>
    </p>
  );
}

function Readout({ text }: { text: string }) {
  return (
    <span className="readout">
      {text.split("").map((c, i) => (
        <Digit key={i} value={c} />
      ))}
    </span>
  );
}

/* Phosphor: an agent's swap under the owner's limit goes straight through; one
   above it waits on the gauge, amber, for a click. */
const PHOSPHOR = [1300, 1900, 1300, 3200, 1900] as const;

function PhosphorDisplay({ order }: { order: number }) {
  const { ref, live, step } = useLoop(PHOSPHOR, 3);
  const big = step >= 2;
  const status =
    step === 0 || step === 2
      ? ({ tone: "dim", text: "Checking your limit" } as const)
      : step === 1
        ? ({ tone: "ok", text: "Under your limit, sent" } as const)
        : step === 3
          ? ({ tone: "wait", text: "Waits for your click" } as const)
          : ({ tone: "ok", text: "Approved by you, sent" } as const);

  return (
    <Glass
      innerRef={ref}
      live={live}
      order={order}
      mode="Proposal"
      label="Demo of Phosphor: an agent proposes a swap. Under the owner's limit it goes through. Above it, it waits for a click."
    >
      <p className="ro-row">
        <span className="ro-k">Agent</span>
        <span>
          Swap <Readout text={big ? "0.80" : "0.05"} /> ETH to USDC
        </span>
      </p>
      <div
        className="gauge"
        data-over={big ? "" : undefined}
        style={{ "--fill": big ? 0.86 : 0.22 } as CSSProperties}
      >
        <span className="gauge-bar" />
        <span className="gauge-limit" />
      </div>
      <p className="gauge-scale">
        <span>0</span>
        <span className="gauge-scale-limit">Your limit</span>
      </p>
      <Status tone={status.tone}>{status.text}</Status>
    </Glass>
  );
}

/* Warden: every coding agent session on the machine as a blip on a radar. Blips
   brighten as their context fills; subagents orbit the session that started
   them. Pure CSS, paused off screen. */
const BLIPS = [
  { a: 38, r: 0.64, f: 0 },
  { a: 128, r: 0.36, f: 5 },
  { a: 212, r: 0.8, f: 9 },
  { a: 304, r: 0.52, f: 2.5 },
];
const SWEEP = 4;

function WardenDisplay({ order }: { order: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const live = useLive(ref, !useReducedMotion());
  return (
    <Glass
      innerRef={ref}
      live={live}
      order={order}
      mode="Sessions"
      label="Demo of Warden: coding agent sessions on a radar. They brighten as their context fills, and subagents orbit the session that started them."
    >
      <div className="radar">
        <div className="radar-scope">
          <span className="radar-sweep" />
          {BLIPS.map((b, i) => (
            <span
              key={i}
              className="blip"
              style={
                {
                  "--a": `${b.a}deg`,
                  "--r": b.r,
                  "--hit": `${(b.a / 360) * SWEEP - SWEEP}s`,
                  "--fill": `${-b.f}s`,
                } as CSSProperties
              }
            >
              {i === 0 ? (
                <span className="orbit">
                  <i />
                  <i />
                </span>
              ) : null}
            </span>
          ))}
        </div>
        <div className="radar-notes">
          <p>Sessions brighten as their context fills.</p>
          <p>Subagents orbit the session that started them.</p>
        </div>
      </div>
    </Glass>
  );
}

/* SolBid: every lot opens at one cent and the agents raise until one is left;
   the winner pays over x402. */
const SOLBID = [1400, 1200, 1300, 3000] as const;
const ROUNDS: (number | null)[][] = [
  [0.01, 0.01, 0.01],
  [0.6, 0.85, 0.5],
  [1.1, 1.0, null],
  [1.4, null, null],
];
const BIDDERS = ["Your agent", "Agent 2", "Agent 3"];
const SOLBID_NOTES = [
  "Lot opens at one cent",
  "Agents raise",
  "Agent 3 is out",
  "Won at $1.40, paid over x402",
];

function SolBidDisplay({ order }: { order: number }) {
  const { ref, live, step } = useLoop(SOLBID, 3);
  const bids = ROUNDS[step];
  const top = Math.max(...bids.map((b) => b ?? 0));
  return (
    <Glass
      innerRef={ref}
      live={live}
      order={order}
      mode="Auction"
      label="Demo of SolBid: agents raise against each other from one cent until one is left, and the winner pays over x402."
    >
      <ul className="bids">
        {BIDDERS.map((name, i) => {
          const v = bids[i];
          return (
            <li
              key={name}
              className="bid"
              data-out={v === null ? "" : undefined}
              data-lead={v !== null && v === top && step > 0 ? "" : undefined}
              style={{ "--w": v === null ? 0 : Math.max(0.03, v / 1.5) } as CSSProperties}
            >
              <span className="bid-name">{name}</span>
              <span className="bid-track">
                <span className="bid-bar" />
              </span>
              <span className="bid-v">
                {v === null ? "Out" : <Readout text={`$${v.toFixed(2)}`} />}
              </span>
            </li>
          );
        })}
      </ul>
      <Status tone={step === 3 ? "ok" : "dim"}>{SOLBID_NOTES[step]}</Status>
    </Glass>
  );
}

/* Vesper Wallet: two models from different labs read the request blind, policy
   rules in code decide, and a person approves before anything moves. */
const VESPER = [1100, 1000, 1000, 1100, 3200, 2200] as const;
const LAMPS = ["Model A", "Model B", "Policy", "You"];
const VESPER_NOTES = [
  "New request",
  "Model A reads it blind",
  "Model B reads it blind",
  "Policy rules allow it",
  "Waits for your approval",
  "Approved, receipt signed",
];

function VesperDisplay({ order }: { order: number }) {
  const { ref, live, step } = useLoop(VESPER, 4);
  const lamp = (i: number) =>
    i < 3 ? (step > i ? "on" : "off") : step === 4 ? "wait" : step === 5 ? "on" : "off";
  return (
    <Glass
      innerRef={ref}
      live={live}
      order={order}
      mode="Request"
      label="Demo of Vesper Wallet: two models read a request blind, policy rules decide, and a person approves before money moves."
    >
      <p className="ro-row">
        <span className="ro-k">Send</span>
        <span>120 USDC to 0x8f3c...a21c</span>
      </p>
      <ol className="lamps">
        {LAMPS.map((name, i) => (
          <li key={name} className="lamp-cell" data-state={lamp(i)}>
            <i className="lamp-lens" />
            <span>{name}</span>
          </li>
        ))}
      </ol>
      <Status tone={step === 4 ? "wait" : step === 5 ? "ok" : "dim"}>{VESPER_NOTES[step]}</Status>
    </Glass>
  );
}

export function Display({ id, order }: { id: string; order: number }) {
  switch (id) {
    case "phosphor":
      return <PhosphorDisplay order={order} />;
    case "warden":
      return <WardenDisplay order={order} />;
    case "solbid":
      return <SolBidDisplay order={order} />;
    case "vesper":
      return <VesperDisplay order={order} />;
    default:
      return null;
  }
}
