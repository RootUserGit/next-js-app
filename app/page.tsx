import Link from "next/link";
import { PageShell } from "./components/PageShell";
import { PipelineVisualizer } from "./components/PipelineVisualizer";
import { PipelineStageIcon } from "./components/pipeline-icons";
import {
  jenkinsPipelineStages,
  toneDot,
  toneIconBg,
  toneRing,
} from "./lib/pipeline-stages";

export default function Home() {
  return (
    <PageShell>
      <header className="flex flex-col gap-6 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Jenkins pipeline walkthrough
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
            Next.js static export
          </span>
        </div>

        <div className="space-y-4">
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Learn <span className="text-gradient">CI/CD</span> with a Jenkins
            shaped story
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-slate-400 sm:mx-0">
            These pages explain continuous integration and delivery in plain
            language, then map that mental model to the{" "}
            <strong className="font-medium text-slate-200">stages</strong> you
            usually model in a Jenkinsfile—from checkout through deploy and
            verification.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
            <Link
              href="/concepts"
              className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/25 transition hover:bg-sky-400"
            >
              CI/CD basics
            </Link>
            <Link
              href="/jenkins"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-100 transition hover:border-white/25 hover:bg-white/10"
            >
              Jenkins stages
            </Link>
            <Link
              href="/pipeline"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-transparent px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-violet-400/40 hover:text-white"
            >
              Full-screen pipeline
            </Link>
            <Link
              href="/deploy-s3"
              className="inline-flex items-center justify-center rounded-full border border-orange-400/25 bg-orange-500/10 px-5 py-2.5 text-sm font-medium text-orange-100 transition hover:border-orange-400/40 hover:bg-orange-500/15"
            >
              S3 + Jenkins Groovy
            </Link>
          </div>
        </div>
      </header>

      <PipelineVisualizer />

      <section
        className="mt-16 space-y-10"
        aria-labelledby="stages-detail-heading"
      >
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <h2
            id="stages-detail-heading"
            className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500"
          >
            Stage reference
          </h2>
          <p className="text-2xl font-medium text-white">
            Eight blocks teams commonly encode in Jenkins
          </p>
          <p className="max-w-2xl text-slate-400">
            Names vary by org, but the responsibilities below show up in almost
            every mature pipeline for a deployable service or site.
          </p>
        </div>

        <ol className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {jenkinsPipelineStages.map((step, index) => (
            <li key={step.id} className="relative">
              <div
                className={`flex h-full flex-col rounded-2xl border border-white/10 bg-[var(--bg-card)] p-5 shadow-xl ring-1 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-white/20 motion-reduce:transform-none ${toneRing[step.tone]}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 ${toneIconBg[step.tone]}`}
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900/80">
                        <PipelineStageIcon id={step.id} />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                        Stage {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="text-sm font-semibold leading-snug text-white">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <span
                    className={`mt-1 h-2 w-2 shrink-0 rounded-full ${toneDot[step.tone]}`}
                    aria-hidden
                  />
                </div>
                <p className="mt-3 flex-1 text-xs leading-relaxed text-slate-400 sm:text-sm">
                  {step.summary}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {step.hints.map((hint) => (
                    <li
                      key={hint}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] text-slate-300 sm:text-xs"
                    >
                      {hint}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur">
          <h2 className="text-lg font-semibold text-white">
            What your build produces here
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            After <code className="font-mono text-sky-200">npm run build</code>,
            upload everything under{" "}
            <code className="font-mono text-sky-200">out/</code>. That folder is
            the static site (HTML, hashed JS/CSS). A Jenkins publish stage can{" "}
            <code className="font-mono text-sky-200">aws s3 sync</code> it or
            attach it as a build artifact—no Node server is required at the edge.
          </p>
          <div className="mt-6 space-y-3 rounded-xl border border-white/10 bg-slate-950/60 p-4 font-mono text-xs text-slate-300 sm:text-sm">
            <p>
              <span className="text-slate-500">$</span> npm install
            </p>
            <p>
              <span className="text-slate-500">$</span> npm run build
            </p>
            <p className="text-slate-500">
              # sync out/ to a bucket (example)
            </p>
            <p>
              <span className="text-slate-500">$</span> aws s3 sync out/
              s3://your-bucket --delete
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-dashed border-white/15 bg-gradient-to-br from-white/[0.04] to-transparent p-8">
          <h2 className="text-lg font-semibold text-white">
            Why order matters
          </h2>
          <ul className="mt-5 space-y-4 text-sm text-slate-400">
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
              <span>
                Run cheap checks (lint, unit tests) before expensive work
                (full builds, security scans, deploys).
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-400" />
              <span>
                Treat artifacts as immutable: the bits you deploy should be the
                same archive that passed tests.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-400" />
              <span>
                Always end with verification so a green deploy stage still
                proves the app answers health checks.
              </span>
            </li>
          </ul>
        </div>
      </section>

      <footer className="mt-16 border-t border-white/10 pt-8 text-center text-xs text-slate-500 sm:text-left">
        Built with Next.js App Router and{" "}
        <code className="text-slate-400">output: &quot;export&quot;</code> for
        static hosting behind Jenkins-driven releases.
      </footer>
    </PageShell>
  );
}
