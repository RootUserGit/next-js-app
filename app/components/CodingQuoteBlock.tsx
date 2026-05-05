"use client";

import { useCallback, useEffect, useState } from "react";
import { CODING_QUOTES } from "../lib/coding-quotes";

const FIVE_MIN_MS = 5 * 60 * 1000;

function pickIndex(exclude?: number): number {
  if (CODING_QUOTES.length <= 1) return 0;
  let n = Math.floor(Math.random() * CODING_QUOTES.length);
  let guard = 0;
  while (n === exclude && guard++ < 12) {
    n = Math.floor(Math.random() * CODING_QUOTES.length);
  }
  return n;
}

export function CodingQuoteBlock() {
  const [index, setIndex] = useState(() => pickIndex());

  const rotate = useCallback(() => {
    setIndex((prev) => pickIndex(prev));
  }, []);

  useEffect(() => {
    const id = window.setInterval(rotate, FIVE_MIN_MS);
    return () => window.clearInterval(id);
  }, [rotate]);

  const quote = CODING_QUOTES[index];

  return (
    <div
      className="rounded-3xl border border-cyan-500/15 bg-gradient-to-br from-slate-900/95 to-[#151d2e]/98 p-6 shadow-[inset_0_1px_0_0_rgba(56,189,248,0.08)] ring-1 ring-white/5"
      aria-live="polite"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-cyan-400/80">
        Dev break
      </p>
      <blockquote className="mt-4 text-[15px] leading-relaxed text-slate-200 sm:text-base">
        <span aria-hidden className="text-cyan-500/55">
          &ldquo;
        </span>
        {quote.text}
        <span aria-hidden className="text-cyan-500/55">
          &rdquo;
        </span>
      </blockquote>
      {quote.tag ? (
        <p className="mt-3 font-mono text-xs text-slate-500">{quote.tag}</p>
      ) : null}
    </div>
  );
}
