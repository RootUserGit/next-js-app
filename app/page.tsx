import Link from "next/link";
import { BrandSocialLinks } from "./components/BrandSocialLinks";
import { CodingQuoteBlock } from "./components/CodingQuoteBlock";
import { CursorPreparedBadge } from "./components/CursorPreparedBadge";
import { PageShell } from "./components/PageShell";
import { StackLogoGrid } from "./components/StackLogoGrid";

const SESSION_DATE = "May 5, 2026";

const GITHUB = "https://github.com/RootUserGit/";
const LINKEDIN = "https://www.linkedin.com/in/rahul-singh-pilkh/";

export default function Home() {
  return (
    <PageShell>
      <div className="mx-auto max-w-6xl pt-6 sm:pt-10 lg:h-[calc(100vh-7.5rem)] lg:overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
            <span className="rounded-full bg-cyan-500/12 px-2.5 py-0.5 text-cyan-300">
              PipelineLab
            </span>
            <span className="hidden text-slate-600 sm:inline">·</span>
            <span className="text-slate-400">Jenkins CI/CD reference</span>
          </div>
          <CursorPreparedBadge prominent />
        </div>

        <section className="mt-6 grid items-stretch gap-6 lg:h-[calc(100%-6rem)] lg:grid-cols-12 lg:gap-8">
          <div className="relative lg:col-span-7 rounded-3xl border border-white/10 bg-[var(--bg-card)] p-8 shadow-[0_28px_60px_-28px_rgba(0,0,0,0.75)] backdrop-blur-sm sm:p-10 lg:h-full">
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-cyan-500/25 to-violet-600/20 blur-2xl" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
              Overview
            </p>
            <h1 className="mt-3 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.3rem]">
              Jenkins-style <span className="text-gradient">CI/CD</span> notes in static HTML
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-slate-400 sm:text-lg">
              This repo is <code className="text-cyan-300/90">output: export</code> so the
              deploy artifact is plain static files in <code className="text-cyan-300/90">out/</code>.
              Pages map to Jenkins stages, Groovy + S3 deploy, and Docker-based
              publish flow.
              <span className="text-slate-500">
                {" "}GitHub Actions workflow lives in{" "}
                <code className="text-slate-400">.github/workflows/</code>.
              </span>
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              <Link
                href="/playbook"
                className="rounded-2xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-[#081018] shadow-lg shadow-cyan-500/18 transition hover:bg-cyan-400"
              >
                Open playbook
              </Link>
              <Link
                href="/concepts"
                className="rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-cyan-500/25 hover:bg-white/[0.07]"
              >
                CI/CD terms
              </Link>
              <Link
                href="/deploy-s3"
                className="rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-cyan-500/25 hover:bg-white/[0.07]"
              >
                S3 & Docker
              </Link>
            </div>

            <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                Author
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Rahul Singh — CI/CD focus using Jenkins, S3 static hosting, Docker, and GitHub Actions.
              </p>
              <div className="mt-4">
                <BrandSocialLinks githubUrl={GITHUB} linkedInUrl={LINKEDIN} />
              </div>
            </div>
          </div>

          <aside className="flex flex-col gap-4 lg:col-span-5 lg:h-full">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                Current setup
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                <time dateTime="2026-05-05" className="font-semibold text-white">
                  {SESSION_DATE}
                </time>
                : dark-only UI, single-screen home, stack logos, and rotating coding quotes.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#161e2f] to-[#101722] p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                Stack (this build)
              </p>
              <div className="mt-4">
                <StackLogoGrid />
              </div>
            </div>

            <CodingQuoteBlock />
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <p className="text-[11px] text-slate-400">
                Need deeper walkthrough?
                <Link href="/playbook" className="ml-2 font-semibold text-cyan-400 hover:text-cyan-300">
                  Open full playbook →
                </Link>
              </p>
            </div>
          </aside>
        </section>
      </div>
    </PageShell>
  );
}
