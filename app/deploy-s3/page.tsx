import type { Metadata } from "next";
import Link from "next/link";
import { DeployRecipeToggle } from "../components/DeployRecipeToggle";
import { PageShell } from "../components/PageShell";

export const metadata: Metadata = {
  title: "S3 static hosting & Jenkins",
  description:
    "Prerequisites for S3 static websites, sample Jenkins Groovy pipelines, Dockerfile build optimization, and end-to-end automation to S3.",
};

const prerequisites = [
  {
    title: "S3 bucket",
    items: [
      "Create a bucket in the target Region (same Region as Jenkins or CloudFront origin).",
      "For S3 static website hosting: enable **Static website hosting** and set **index** and **error** documents (often `index.html` and `404.html` for SPAs).",
      "Website endpoint URL looks like `http://<bucket>.s3-website-<region>.amazonaws.com` — HTTPS usually comes from **CloudFront** in front.",
    ],
  },
  {
    title: "Bucket policy & public access",
    items: [
      "If you serve objects publicly from the bucket website endpoint, attach a **bucket policy** allowing `s3:GetObject` on `arn:aws:s3:::<bucket>/*` for Principal `\"*\"` or CloudFront’s OAI/OAC only.",
      "Tighten **Block Public Access** if you use **CloudFront with OAC** instead of a fully public bucket (recommended for production).",
    ],
  },
  {
    title: "IAM for Jenkins",
    items: [
      "Create an IAM user or role with least privilege: at minimum `s3:PutObject`, `s3:GetObject`, `s3:ListBucket`, `s3:DeleteObject` on your bucket prefix, plus `cloudfront:CreateInvalidation` if you invalidate a distribution.",
      "Store access keys in Jenkins credentials or prefer **OIDC / IAM role** from the Jenkins controller or agent so nothing long-lived sits in plain text.",
    ],
  },
  {
    title: "Build output layout",
    items: [
      "This Next.js app uses `output: \"export\"` so `npm run build` writes **`out/`** at the repo root — that is the directory you sync to `s3://bucket/` (often with `--delete` to prune removed assets).",
      "Optionally set **Cache-Control** per object type (long cache for hashed assets, short or `must-revalidate` for `index.html`). The simple examples below use a single sync; refine with extra `aws s3 cp` steps if needed.",
    ],
  },
] as const;

const e2eSteps = [
  "Developer pushes to Git; a webhook or SCM polling triggers the Jenkins multibranch or pipeline job.",
  "Jenkins checks out the commit, installs dependencies, runs lint/tests, then runs `npm run build` (or builds the Docker image targeting the `export` stage).",
  "Static files land in `out/` on the agent or in a throwaway container filesystem under `/site`.",
  "`aws s3 sync` (with `--delete`) pushes bytes to the bucket; object ACLs stay private if CloudFront is the only reader.",
  "Optional: CloudFront invalidation (`/*` or specific paths) so viewers do not keep an old `index.html` in edge caches.",
  "Smoke step curls the website or CloudFront URL; `post { }` notifies Slack or email on fixed / broken builds.",
] as const;

export default function DeployS3Page() {
  return (
    <PageShell>
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
          Static hosting
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Jenkins, S3, and optional Docker for full automation
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          Use this page as a checklist for S3 static hosting, then copy the
          Groovy that matches how your agents run: **direct Node build + sync**
          or **Docker multi-stage build**, extract the static tree, and sync the
          same way.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <Link
            href="/jenkins"
            className="text-sky-700 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300"
          >
            ← Pipeline stages overview
          </Link>
          <Link
            href="/pipeline"
            className="text-violet-700 hover:text-violet-600 dark:text-violet-300 dark:hover:text-violet-200"
          >
            Live pipeline animation →
          </Link>
        </div>
      </header>

      <section className="mt-14" aria-labelledby="prereq-heading">
        <h2
          id="prereq-heading"
          className="text-xl font-semibold text-slate-900 sm:text-2xl dark:text-white"
        >
          Prerequisites for S3 static site hosting
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-slate-600 sm:text-base dark:text-slate-400">
          These are the same decisions you would encode in Terraform or the
          AWS console before the first successful{" "}
          <code className="text-sky-800 dark:text-sky-200">aws s3 sync</code> from
          Jenkins.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {prerequisites.map((block) => (
            <article
              key={block.title}
              className="rounded-2xl border border-slate-200/90 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-sky-700 dark:text-sky-300">
                {block.title}
              </h3>
              <ul className="mt-4 list-disc space-y-2 pl-4 text-sm text-slate-600 dark:text-slate-400">
                {block.items.map((item, i) => (
                  <li key={`${block.title}-${i}`}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="recipes-heading">
        <h2
          id="recipes-heading"
          className="text-xl font-semibold text-slate-900 sm:text-2xl dark:text-white"
        >
          Jenkins Groovy &amp; Dockerfile recipes
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-slate-600 dark:text-slate-400">
          Toggle between a **lightweight** path (Node on the agent, sync{" "}
          <code className="text-slate-800 dark:text-slate-300">out/</code>) and a **container-first**
          path (reproducible build image, extract static files, then the same S3
          sync). Both end at the same S3 bucket for a static Next export.
        </p>
        <div className="mt-8">
          <DeployRecipeToggle />
        </div>
      </section>

      <section
        className="mt-16 rounded-2xl border border-dashed border-orange-300 bg-orange-50/80 p-6 dark:border-orange-400/30 dark:bg-orange-500/[0.06] sm:p-8"
        aria-labelledby="e2e-heading"
      >
        <h2
          id="e2e-heading"
          className="text-lg font-semibold text-slate-900 sm:text-xl dark:text-white"
        >
          End-to-end automation (Git → Jenkins → S3 → browser)
        </h2>
        <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm text-slate-700 sm:text-base dark:text-slate-300">
          {e2eSteps.map((step, i) => (
            <li key={i} className="leading-relaxed">
              {step}
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-slate-600 dark:text-slate-500">
          Same story if you swap S3 for another object store: the contract is an
          immutable directory of static files produced by the build stage and
          verified before promotion.
        </p>
      </section>

      <section className="mt-12 rounded-2xl border border-slate-200/90 bg-white/80 p-6 dark:border-white/10 dark:bg-white/[0.02] sm:p-8">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Dockerfile optimization checklist
        </h2>
        <ul className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2 dark:text-slate-400">
          <li className="flex gap-2">
            <span className="text-emerald-600 dark:text-emerald-400">✓</span>
            <span>
              <strong className="text-slate-800 dark:text-slate-200">Order COPY lines</strong> from
              least to most frequently changed so layer cache hits stay high.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-600 dark:text-emerald-400">✓</span>
            <span>
              <strong className="text-slate-800 dark:text-slate-200">Use npm ci</strong> in CI-style
              images (not <code className="text-slate-800 dark:text-slate-300">npm install</code>)
              when <code className="text-slate-800 dark:text-slate-300">package-lock.json</code> is
              committed.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-600 dark:text-emerald-400">✓</span>
            <span>
              <strong className="text-slate-800 dark:text-slate-200">Slim base images</strong>{" "}
              (<code className="text-slate-800 dark:text-slate-300">bookworm-slim</code>,{" "}
              <code className="text-slate-800 dark:text-slate-300">alpine</code> on export) shrink
              attack surface and pull time.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-600 dark:text-emerald-400">✓</span>
            <span>
              <strong className="text-slate-800 dark:text-slate-200">BuildKit cache mounts</strong>{" "}
              (optional) for <code className="text-slate-800 dark:text-slate-300">npm ci</code> on
              large monorepos — enable on the Jenkins Docker daemon when ready.
            </span>
          </li>
        </ul>
      </section>
    </PageShell>
  );
}
