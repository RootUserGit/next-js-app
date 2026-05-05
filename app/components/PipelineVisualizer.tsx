"use client";

import { useEffect, useState } from "react";
import {
  jenkinsPipelineStages,
  toneDot,
  toneIconBg,
  toneRing,
} from "../lib/pipeline-stages";
import { PipelineStageIcon } from "./pipeline-icons";

const STEP_MS = 2000;

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

export function PipelineVisualizer({
  headingId = "animated-pipeline-heading",
  sectionTitle = "Animated Jenkins-style flow",
}: {
  headingId?: string;
  /** Accessible heading text for the section */
  sectionTitle?: string;
}) {
  const stages = jenkinsPipelineStages;
  const reducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % stages.length);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion, stages.length]);

  const displayActive = reducedMotion ? stages.length : activeIndex;

  return (
    <section
      className="mt-14 rounded-2xl border border-slate-200/90 bg-white/80 p-5 shadow-xl ring-1 ring-slate-200/60 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.03] dark:ring-white/5 sm:p-8"
      aria-labelledby={headingId}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id={headingId}
            className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500"
          >
            {sectionTitle}
          </h2>
          <p className="mt-1 text-lg font-medium text-slate-900 sm:text-xl dark:text-white">
            Stages light up in order like a running build
          </p>
        </div>
        <p className="max-w-md text-sm text-slate-600 dark:text-slate-400">
          {reducedMotion
            ? "Motion is reduced on your system; stages are shown as completed for a calmer view."
            : "Each stage represents a common `stage { ... }` block in a declarative pipeline."}
        </p>
      </div>

      <div className="relative mt-10 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div
          className="flex min-w-max items-stretch gap-0 px-1"
          role="list"
          aria-label="Pipeline stages"
        >
          {stages.map((stage, index) => {
            const isComplete = displayActive > index;
            const isRunning = !reducedMotion && displayActive === index;
            const isPending = displayActive < index;

            return (
              <div key={stage.id} className="flex items-center" role="listitem">
                <div
                  className={`flex w-[7.25rem] flex-col items-center text-center sm:w-[8.5rem] ${
                    isRunning ? "scale-[1.02] motion-safe:transition-transform" : ""
                  }`}
                >
                  <div
                    className={`relative flex h-14 w-14 items-center justify-center rounded-2xl border bg-white/90 sm:h-16 sm:w-16 dark:bg-slate-950/80 ${
                      isRunning
                        ? `border-slate-300 ring-2 motion-safe:animate-pulse dark:border-white/25 ${toneRing[stage.tone]}`
                        : isComplete
                          ? "border-emerald-500/50 ring-1 ring-emerald-400/40 dark:border-emerald-500/40 dark:ring-emerald-400/30"
                          : "border-slate-200 opacity-80 dark:border-white/10 dark:opacity-60"
                    }`}
                  >
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ring-1 ring-slate-200 dark:ring-white/10 sm:h-12 sm:w-12 ${toneIconBg[stage.tone]} ${
                        isPending ? "opacity-50" : ""
                      }`}
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800/90 sm:h-10 sm:w-10 dark:bg-slate-900/85">
                        <PipelineStageIcon id={stage.id} />
                      </div>
                    </div>
                    {isComplete ? (
                      <span
                        className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-slate-950 shadow-lg motion-safe:animate-pop"
                        aria-label="Completed"
                      >
                        ✓
                      </span>
                    ) : null}
                    {isRunning ? (
                      <span
                        className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-200/30 to-transparent motion-safe:animate-pipeline-shimmer dark:from-white/10`}
                        aria-hidden
                      />
                    ) : null}
                  </div>
                  <p className="mt-3 line-clamp-2 text-[11px] font-semibold leading-snug text-slate-900 sm:text-xs dark:text-white">
                    {stage.short}
                  </p>
                  <span
                    className={`mt-1 h-1.5 w-1.5 rounded-full ${toneDot[stage.tone]} ${
                      isRunning ? "motion-safe:animate-ping" : ""
                    }`}
                    aria-hidden
                  />
                </div>

                {index < stages.length - 1 ? (
                  <div
                    className="relative flex h-14 w-6 shrink-0 items-center sm:h-16 sm:w-8"
                    aria-hidden
                  >
                    <div className="h-0.5 w-full rounded-full bg-slate-200 dark:bg-white/10" />
                    <div
                      className={`absolute left-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-400 motion-safe:transition-[width] motion-safe:duration-700 ${
                        isComplete ? "w-full opacity-90" : "w-0 opacity-0"
                      }`}
                    />
                    {isRunning ? (
                      <span className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-sky-300 shadow-[0_0_12px_3px_rgba(56,189,248,0.55)] motion-safe:animate-pipeline-flow" />
                    ) : null}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-500">
        Jenkins maps each block to Blue Ocean / Stage View; failures stop the line
        unless you wrap steps in <code className="text-slate-600 dark:text-slate-400">catchError</code>{" "}
        or similar.
      </p>
    </section>
  );
}
