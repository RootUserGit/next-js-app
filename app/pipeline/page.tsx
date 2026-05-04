import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "../components/PageShell";
import { PipelineVisualizer } from "../components/PipelineVisualizer";

export const metadata: Metadata = {
  title: "Live pipeline animation",
  description:
    "Animated Jenkins-style pipeline stages: checkout, lint, test, build, security, publish, deploy, verify.",
};

export default function PipelinePage() {
  return (
    <PageShell>
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
          Interactive diagram
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Watch a build travel left to right
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
          The animation loops so you can narrate it in a workshop: each pulse
          is the executor working that stage; connectors fill as work completes;
          the moving dot is a stylized “work packet” traveling the graph.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
          <Link href="/" className="text-sky-400 hover:text-sky-300">
            ← Home with full reference cards
          </Link>
          <Link href="/jenkins" className="text-violet-300 hover:text-violet-200">
            Jenkinsfile mapping →
          </Link>
        </div>
      </header>

      <div className="mt-10 sm:mt-14">
        <PipelineVisualizer
          headingId="pipeline-page-heading"
          sectionTitle="Live pipeline animation"
        />
      </div>

      <section className="mt-16 grid gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:grid-cols-3 sm:p-8">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Sequential stages
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Jenkins runs these in order by default. Failures bubble up unless
            you capture them—so ordering is both UX and risk management.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Parallel fan-out
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Real pipelines often use{" "}
            <code className="font-mono text-sky-200">parallel</code> for
            integration vs. performance suites. The linear animation is a
            teaching simplification.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Inputs &amp; outputs
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Each stage should declare what it needs (credentials, artifacts
            from archive) and what it leaves for the next stage—usually a
            workspace path or uploaded artifact URL.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
