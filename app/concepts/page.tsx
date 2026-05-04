import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "../components/PageShell";

export const metadata: Metadata = {
  title: "CI/CD basics",
  description:
    "Continuous integration, continuous delivery, and continuous deployment explained for Jenkins-style pipelines.",
};

const sections = [
  {
    id: "ci",
    title: "Continuous integration (CI)",
    body: [
      "Developers merge small changes into a shared mainline branch often—ideally many times per day.",
      "Each merge triggers an automated pipeline that checks out the exact revision, installs dependencies, compiles or bundles the app, and runs fast feedback checks such as linters and unit tests.",
      "If any step fails, the build goes red and the change is blocked or reverted until fixed. That tight loop is CI: integrate continuously, prove it with machines, not only on laptops.",
    ],
  },
  {
    id: "cd-delivery",
    title: "Continuous delivery (CD)",
    body: [
      "After CI passes, the pipeline produces a release candidate—an image, JAR, or static folder—that is ready for production but may still wait for human approval or a change window.",
      "The artifact is promoted through staging environments with the same scripts you would use in production, so “works in staging” actually means something.",
      "Continuous delivery stops short of automatically pushing to live users whenever you feel risk requires a final gate.",
    ],
  },
  {
    id: "cd-deploy",
    title: "Continuous deployment",
    body: [
      "This is the stricter flavor of CD: every green mainline build that clears automated tests and policy checks is deployed to production without a manual button.",
      "It demands excellent monitoring, rollbacks, feature flags, and trust in your test pyramid—because the pipeline is now the release manager.",
      "Many teams mix models: CD to staging always, and continuous deployment only for low-risk services.",
    ],
  },
  {
    id: "pipeline",
    title: "Pipelines tie it together",
    body: [
      "A pipeline is the ordered graph of stages (checkout → test → build → …) plus the shared workspace and credentials those stages use.",
      "Jenkins expresses that graph in a Jenkinsfile, GitLab in `.gitlab-ci.yml`, GitHub in Actions workflows—the vocabulary changes, the shape is similar.",
      "Good pipelines fail fast, emit clear logs, cache dependencies, and never deploy untested artifacts.",
    ],
  },
] as const;

export default function ConceptsPage() {
  return (
    <PageShell>
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
          Foundations
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          CI/CD basics in one pass
        </h1>
        <p className="mt-4 text-lg text-slate-400">
          Use this page as a shared vocabulary before you read Jenkinsfiles or
          watch Blue Ocean stage graphs. Each idea below maps cleanly to blocks
          you will declare in code.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/jenkins"
            className="text-sm font-medium text-sky-300 hover:text-sky-200"
          >
            Jenkins stages →
          </Link>
          <Link
            href="/pipeline"
            className="text-sm font-medium text-violet-300 hover:text-violet-200"
          >
            Animated pipeline →
          </Link>
        </div>
      </header>

      <div className="mt-14 space-y-12">
        {sections.map((section, i) => (
          <article
            key={section.id}
            className="relative scroll-mt-24 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
            id={section.id}
          >
            <span className="absolute -left-px top-8 hidden h-12 w-1 rounded-full bg-gradient-to-b from-sky-400 to-violet-500 sm:block" />
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="font-mono text-xs text-slate-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="text-xl font-semibold text-white">
                {section.title}
              </h2>
            </div>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-400 sm:text-base">
              {section.body.map((p, j) => (
                <p key={`${section.id}-${j}`}>{p}</p>
              ))}
            </div>
          </article>
        ))}
      </div>

      <section className="mt-16 rounded-2xl border border-dashed border-white/15 bg-slate-950/40 p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-white">Quick glossary</h2>
        <dl className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="font-mono text-sm text-sky-300">Artifact</dt>
            <dd className="mt-1 text-sm text-slate-400">
              The immutable output of a build stage—a Docker image digest, npm
              tarball, or static `out/` folder you promote downstream.
            </dd>
          </div>
          <div>
            <dt className="font-mono text-sm text-sky-300">Quality gate</dt>
            <dd className="mt-1 text-sm text-slate-400">
              A mandatory check (coverage threshold, CVE budget, performance
              budget) that must pass before later stages unlock.
            </dd>
          </div>
          <div>
            <dt className="font-mono text-sm text-sky-300">Feedback loop</dt>
            <dd className="mt-1 text-sm text-slate-400">
              Time from commit to signal. CI/CD investments usually target
              shortening this loop while keeping risk flat or lower.
            </dd>
          </div>
          <div>
            <dt className="font-mono text-sm text-sky-300">Post actions</dt>
            <dd className="mt-1 text-sm text-slate-400">
              Hooks that always run—notify chat, archive logs, tear down
              ephemeral environments—often modeled with Jenkins `post { }`.
            </dd>
          </div>
        </dl>
      </section>
    </PageShell>
  );
}
