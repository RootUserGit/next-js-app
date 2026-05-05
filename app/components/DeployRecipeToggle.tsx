"use client";

import { useState } from "react";
import {
  dockerfileMultistageStatic,
  dockerignoreExample,
  jenkinsfileDockerBuildThenS3,
  jenkinsfileS3StaticSync,
} from "../lib/deploy-recipes";

type Mode = "s3" | "docker";

export function DeployRecipeToggle() {
  const [mode, setMode] = useState<Mode>("s3");

  return (
    <div className="space-y-6">
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Choose deploy recipe"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mode === "s3"}
          className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition sm:text-sm ${
            mode === "s3"
              ? "bg-sky-600 text-white shadow-lg shadow-sky-600/20 dark:bg-sky-500 dark:text-slate-950 dark:shadow-sky-500/20"
              : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-white/15 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/25 dark:hover:text-white"
          }`}
          onClick={() => setMode("s3")}
        >
          Jenkins → S3 sync
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "docker"}
          className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition sm:text-sm ${
            mode === "docker"
              ? "bg-violet-600 text-white shadow-lg shadow-violet-600/25 dark:bg-violet-500 dark:shadow-violet-500/25"
              : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-white/15 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/25 dark:hover:text-white"
          }`}
          onClick={() => setMode("docker")}
        >
          Dockerfile → build → S3 (E2E)
        </button>
      </div>

      <div
        role="tabpanel"
        className="rounded-2xl border border-slate-200/90 bg-slate-50 p-4 shadow-inner dark:border-white/10 dark:bg-slate-950/70 sm:p-6"
        aria-live="polite"
      >
        {mode === "s3" ? (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Declarative Jenkinsfile (Node on agent +{" "}
              <code className="text-sky-700 dark:text-sky-300">aws s3 sync</code>)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-500">
              Requires the{" "}
              <a
                className="text-sky-700 underline-offset-2 hover:underline dark:text-sky-400"
                href="https://plugins.jenkins.io/aws-steps/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pipeline: AWS Steps
              </a>{" "}
              plugin ( <code className="text-slate-700 dark:text-slate-400">withAWS</code> ) or
              wire the same commands with an OIDC/IRSA role and the AWS CLI
              already on the agent.
            </p>
            <pre className="max-h-[min(70vh,560px)] overflow-auto rounded-xl border border-slate-200 bg-slate-900 p-4 text-[11px] leading-relaxed text-slate-200 sm:text-xs dark:border-white/10 dark:bg-slate-950">
              <code>{jenkinsfileS3StaticSync}</code>
            </pre>
          </div>
        ) : (
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Multi-stage Dockerfile (build Next export, ship only{" "}
                <code className="text-violet-700 dark:text-violet-300">/site</code>)
              </h3>
              <p className="mt-2 text-xs text-slate-600 sm:text-sm dark:text-slate-400">
                Optimize with a separate <strong className="text-slate-800 dark:text-slate-200">deps</strong>{" "}
                layer so <code className="text-slate-800 dark:text-slate-300">npm ci</code> reuses
                cache when only app sources change; keep{" "}
                <code className="text-slate-800 dark:text-slate-300">NODE_ENV=production</code> and{" "}
                <code className="text-slate-800 dark:text-slate-300">NEXT_TELEMETRY_DISABLED=1</code>{" "}
                on the build stage; use{" "}
                <code className="text-slate-800 dark:text-slate-300">.dockerignore</code> so secrets
                and <code className="text-slate-800 dark:text-slate-300">node_modules</code> never
                hit the daemon context.
              </p>
              <pre className="mt-3 max-h-[min(50vh,420px)] overflow-auto rounded-xl border border-slate-200 bg-slate-900 p-4 text-[11px] leading-relaxed text-slate-200 sm:text-xs dark:border-white/10 dark:bg-slate-950">
                <code>{dockerfileMultistageStatic}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Example <code className="text-violet-700 dark:text-violet-300">.dockerignore</code>
              </h3>
              <pre className="mt-2 max-h-48 overflow-auto rounded-xl border border-slate-200 bg-slate-900 p-4 text-[11px] leading-relaxed text-slate-200 sm:text-xs dark:border-white/10 dark:bg-slate-950">
                <code>{dockerignoreExample}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Jenkinsfile: <code className="text-violet-700 dark:text-violet-300">docker build</code>{" "}
                → extract <code className="text-violet-700 dark:text-violet-300">/site</code> →{" "}
                <code className="text-violet-700 dark:text-violet-300">aws s3 sync</code>
              </h3>
              <p className="mt-2 text-xs text-slate-600 sm:text-sm dark:text-slate-400">
                The Jenkins agent must run Docker (DinD or socket-mounted
                Docker). The flow matches production: the exact artifact baked
                in the image is what you upload—no drift between laptop and CI.
              </p>
              <pre className="mt-3 max-h-[min(70vh,520px)] overflow-auto rounded-xl border border-slate-200 bg-slate-900 p-4 text-[11px] leading-relaxed text-slate-200 sm:text-xs dark:border-white/10 dark:bg-slate-950">
                <code>{jenkinsfileDockerBuildThenS3}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
