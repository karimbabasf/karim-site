"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { TrafficLights } from "@/components/terminal";
import "./tetris.css";

/**
 * A small, self-contained Tetris, opened from the green window dot. Retro,
 * monochrome-neon, on the site palette. Full game: move, rotate, soft and hard
 * drop, line clears, levels, pause, reset, and a best score kept in
 * localStorage the way the Chrome dino game does. Nothing here touches the rest
 * of the page; it is an easter egg and only mounts while open.
 */

const COLS = 10;
const ROWS = 18;
const BEST_KEY = "karim.tetris.best";

type Cell = 0 | 1 | 2; // 0 empty, 1 locked, 2 active
type Matrix = number[][];
type Piece = { type: string; shape: Matrix; row: number; col: number };

const SHAPES: Record<string, Matrix> = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
};
const TYPES = Object.keys(SHAPES);
const SCORE = [0, 100, 300, 500, 800];

function randType(): string {
  return TYPES[Math.floor(Math.random() * TYPES.length)];
}

function emptyBoard(): Cell[][] {
  return Array.from({ length: ROWS }, () => Array<Cell>(COLS).fill(0));
}

function spawn(type: string): Piece {
  const shape = SHAPES[type];
  return { type, shape, row: 0, col: Math.floor((COLS - shape[0].length) / 2) };
}

function rotateCW(m: Matrix): Matrix {
  const R = m.length;
  const C = m[0].length;
  const out: Matrix = Array.from({ length: C }, () => Array(R).fill(0));
  for (let r = 0; r < R; r++)
    for (let c = 0; c < C; c++) out[c][R - 1 - r] = m[r][c];
  return out;
}

function collides(
  board: Cell[][],
  shape: Matrix,
  row: number,
  col: number,
): boolean {
  for (let r = 0; r < shape.length; r++)
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      const br = row + r;
      const bc = col + c;
      if (bc < 0 || bc >= COLS || br >= ROWS) return true;
      if (br >= 0 && board[br][bc]) return true;
    }
  return false;
}

function merge(board: Cell[][], piece: Piece): Cell[][] {
  const nb = board.map((row) => row.slice()) as Cell[][];
  const { shape, row, col } = piece;
  for (let r = 0; r < shape.length; r++)
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c]) {
        const br = row + r;
        const bc = col + c;
        if (br >= 0 && br < ROWS && bc >= 0 && bc < COLS) nb[br][bc] = 1;
      }
    }
  return nb;
}

function clearLines(board: Cell[][]): { board: Cell[][]; cleared: number } {
  let cleared = 0;
  const kept = board.filter((row) => {
    const full = row.every((v) => v);
    if (full) cleared++;
    return !full;
  });
  while (kept.length < ROWS) kept.unshift(Array<Cell>(COLS).fill(0));
  return { board: kept, cleared };
}

type State = {
  board: Cell[][];
  piece: Piece;
  next: string;
  score: number;
  lines: number;
  level: number;
  status: "playing" | "paused" | "over";
};

type Action =
  | { type: "reset" }
  | { type: "pause" }
  | { type: "move"; dx: number }
  | { type: "rotate" }
  | { type: "soft" }
  | { type: "tick" }
  | { type: "hard" };

function init(): State {
  return {
    board: emptyBoard(),
    piece: spawn(randType()),
    next: randType(),
    score: 0,
    lines: 0,
    level: 1,
    status: "playing",
  };
}

/** Lock the current piece, clear lines, spawn the next one, detect game over. */
function lockAndNext(state: State): State {
  const { board, cleared } = clearLines(merge(state.board, state.piece));
  const lines = state.lines + cleared;
  const level = Math.min(15, Math.floor(lines / 10) + 1);
  const score = state.score + SCORE[cleared] * state.level;
  const piece = spawn(state.next);
  const over = collides(board, piece.shape, piece.row, piece.col);
  return {
    board,
    lines,
    level,
    score,
    piece: over ? state.piece : piece,
    next: randType(),
    status: over ? "over" : "playing",
  };
}

function reducer(state: State, action: Action): State {
  if (action.type === "reset") return init();
  if (action.type === "pause") {
    if (state.status === "over") return state;
    return { ...state, status: state.status === "paused" ? "playing" : "paused" };
  }
  if (state.status !== "playing") return state;

  switch (action.type) {
    case "move": {
      const col = state.piece.col + action.dx;
      if (!collides(state.board, state.piece.shape, state.piece.row, col))
        return { ...state, piece: { ...state.piece, col } };
      return state;
    }
    case "rotate": {
      const shape = rotateCW(state.piece.shape);
      for (const dx of [0, -1, 1, -2, 2]) {
        const col = state.piece.col + dx;
        if (!collides(state.board, shape, state.piece.row, col))
          return { ...state, piece: { ...state.piece, shape, col } };
      }
      return state;
    }
    case "soft": {
      const row = state.piece.row + 1;
      if (!collides(state.board, state.piece.shape, row, state.piece.col))
        return { ...state, piece: { ...state.piece, row }, score: state.score + 1 };
      return lockAndNext(state);
    }
    case "tick": {
      const row = state.piece.row + 1;
      if (!collides(state.board, state.piece.shape, row, state.piece.col))
        return { ...state, piece: { ...state.piece, row } };
      return lockAndNext(state);
    }
    case "hard": {
      let row = state.piece.row;
      let drop = 0;
      while (!collides(state.board, state.piece.shape, row + 1, state.piece.col)) {
        row++;
        drop++;
      }
      return lockAndNext({
        ...state,
        piece: { ...state.piece, row },
        score: state.score + drop * 2,
      });
    }
    default:
      return state;
  }
}

/** board with the active piece painted in, for rendering only */
function withPiece(state: State): Cell[][] {
  const view = state.board.map((r) => r.slice()) as Cell[][];
  const { shape, row, col } = state.piece;
  if (state.status === "over") return view;
  for (let r = 0; r < shape.length; r++)
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c]) {
        const br = row + r;
        const bc = col + c;
        if (br >= 0 && br < ROWS && bc >= 0 && bc < COLS) view[br][bc] = 2;
      }
    }
  return view;
}

export default function Tetris({ onClose }: { onClose: () => void }) {
  const [state, dispatch] = useReducer(reducer, undefined, init);
  const [best, setBest] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  // load best once
  useEffect(() => {
    try {
      const v = parseInt(localStorage.getItem(BEST_KEY) || "0", 10);
      if (v) setBest(v);
    } catch {}
  }, []);

  // persist best on game over
  useEffect(() => {
    if (state.status === "over" && state.score > best) {
      setBest(state.score);
      try {
        localStorage.setItem(BEST_KEY, String(state.score));
      } catch {}
    }
  }, [state.status, state.score, best]);

  // gravity
  useEffect(() => {
    if (state.status !== "playing") return;
    const speed = Math.max(90, 700 - (state.level - 1) * 55);
    const id = setInterval(() => dispatch({ type: "tick" }), speed);
    return () => clearInterval(id);
  }, [state.status, state.level]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " "].includes(e.key))
        e.preventDefault();
      switch (e.key) {
        case "ArrowLeft":
          dispatch({ type: "move", dx: -1 });
          break;
        case "ArrowRight":
          dispatch({ type: "move", dx: 1 });
          break;
        case "ArrowUp":
        case "x":
        case "X":
          dispatch({ type: "rotate" });
          break;
        case "ArrowDown":
          dispatch({ type: "soft" });
          break;
        case " ":
          dispatch({ type: "hard" });
          break;
        case "p":
        case "P":
          dispatch({ type: "pause" });
          break;
        case "r":
        case "R":
          dispatch({ type: "reset" });
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    rootRef.current?.focus();
  }, []);

  const view = withPiece(state);
  const nextShape = SHAPES[state.next];
  const shownBest = Math.max(best, state.score);

  return (
    <div className="t-root" ref={rootRef} tabIndex={-1}>
      <div className="t-bar">
        <TrafficLights onGreen={onClose} />
        <span className="t-title">tetris</span>
        <span className="t-hint">esc to close</span>
      </div>

      <div className="t-stage">
        <div
          className="t-board"
          style={{ gridTemplateColumns: `repeat(${COLS}, var(--t-cell))` }}
          role="grid"
          aria-label="Tetris board"
        >
          {view.map((row, r) =>
            row.map((cell, c) => (
              <span
                key={`${r}-${c}`}
                className={`t-cell${cell === 1 ? " on" : ""}${cell === 2 ? " on active" : ""}`}
              />
            )),
          )}

          {state.status !== "playing" ? (
            <div className="t-over">
              {state.status === "over" ? (
                <>
                  <span className="t-over-title">game over</span>
                  <span className="t-over-score">{state.score}</span>
                  <button
                    type="button"
                    className="t-btn"
                    onClick={() => dispatch({ type: "reset" })}
                  >
                    play again
                  </button>
                </>
              ) : (
                <>
                  <span className="t-over-title">paused</span>
                  <button
                    type="button"
                    className="t-btn"
                    onClick={() => dispatch({ type: "pause" })}
                  >
                    resume
                  </button>
                </>
              )}
            </div>
          ) : null}
        </div>

        <div className="t-side">
          <div className="t-stat">
            <span>score</span>
            <b>{state.score}</b>
          </div>
          <div className="t-stat">
            <span>best</span>
            <b className="neon">{shownBest}</b>
          </div>
          <div className="t-stat">
            <span>lines</span>
            <b>{state.lines}</b>
          </div>
          <div className="t-stat">
            <span>level</span>
            <b>{state.level}</b>
          </div>

          <div className="t-next">
            <span>next</span>
            <div
              className="t-next-grid"
              style={{ gridTemplateColumns: `repeat(${nextShape[0].length}, 12px)` }}
            >
              {nextShape.map((row, r) =>
                row.map((v, c) => (
                  <span key={`${r}-${c}`} className={`t-mini${v ? " on" : ""}`} />
                )),
              )}
            </div>
          </div>

          <button
            type="button"
            className="t-btn"
            onClick={() => dispatch({ type: "reset" })}
          >
            reset
          </button>

          <div className="t-keys">
            &larr; &rarr; move
            <br />
            &uarr; rotate
            <br />
            &darr; soft drop
            <br />
            space hard drop
            <br />p pause
          </div>
        </div>
      </div>

      {/* touch controls */}
      <div className="t-touch" aria-hidden>
        <button type="button" onClick={() => dispatch({ type: "move", dx: -1 })}>
          &larr;
        </button>
        <button type="button" onClick={() => dispatch({ type: "rotate" })}>
          &#8635;
        </button>
        <button type="button" onClick={() => dispatch({ type: "move", dx: 1 })}>
          &rarr;
        </button>
        <button type="button" onClick={() => dispatch({ type: "soft" })}>
          &darr;
        </button>
        <button type="button" onClick={() => dispatch({ type: "hard" })}>
          &#8681;
        </button>
      </div>
    </div>
  );
}
