import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "../components/PageShell";
import { jenkinsPipelineStages, toneDot } from "../lib/pipeline-stages";

export const metadata: Metadata = {
  title: "Jenkins pipeline stages",
  description:
    "Typical declarative Jenkins stages from checkout through deploy and verification, with a sample Jenkinsfile.",
};

const jenkinsfileExample = `pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Lint') {
      steps { sh 'npm run lint' }
    }
    stage('Unit tests') {
      steps { sh 'npm test' }
    }
    stage('Build') {
      steps { sh 'npm run build' }
    }
    stage('Security scan') {
      steps { sh 'trivy fs .' }
    }
    stage('Publish') {
      steps {
        sh 'aws s3 sync out/ s3://my-bucket --delete'
      }
    }
    stage('Deploy') {
      when { branch 'main' }
      steps { sh './scripts/rollout.sh' }
    }
    stage('Verify') {
      steps { sh 'curl -fsS https://app.example/health' }
    }
  }

  post {
    success { slackSend channel: '#releases', message: "OK: \${env.BUILD_URL}" }
    failure { slackSend channel: '#releases', message: "FAILED: \${env.BUILD_URL}" }
  }
}`;

export default function JenkinsPage() {
  return (
    <PageShell>
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
          Jenkins
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Stages teams usually model first
        </h1>
        <p className="mt-4 text-lg text-slate-400">
          Declarative pipelines group work inside{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm text-sky-200">
            stage
          </code>{" "}
          blocks. Each stage gets its own log section, can run on different
          agents, and appears as a column in Blue Ocean. The table below mirrors
          the animated flow on the home and pipeline pages.
        </p>
        <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
          <Link href="/pipeline" className="text-sky-400 hover:text-sky-300">
            Open the live animation →
          </Link>
          <Link href="/deploy-s3" className="text-orange-300 hover:text-orange-200">
            S3 hosting + Groovy / Docker →
          </Link>
        </p>
      </header>

      <div className="mt-12 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.04] text-xs uppercase tracking-wider text-slate-500">
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Stage</th>
              <th className="px-4 py-3 font-medium">Typical responsibility</th>
            </tr>
          </thead>
          <tbody>
            {jenkinsPipelineStages.map((s, i) => (
              <tr
                key={s.id}
                className="border-b border-white/5 transition hover:bg-white/[0.02]"
              >
                <td className="px-4 py-4 font-mono text-slate-500">
                  {String(i + 1).padStart(2, "0")}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-block h-2 w-2 rounded-full ${toneDot[s.tone]}`}
                      aria-hidden
                    />
                    <span className="font-medium text-white">{s.title}</span>
                  </div>
                </td>
                <td className="max-w-xl px-4 py-4 text-slate-400">
                  {s.summary}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="mt-14 grid gap-8 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="text-lg font-semibold text-white">
            How this maps to a Jenkinsfile
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            The snippet is intentionally minimal: your org will add Docker
            agents, credentials binding, parallel branches for integration
            tests, and deployment approvals. Notice how{" "}
            <code className="font-mono text-sky-200">when</code> guards the
            deploy stage so only mainline builds reach shared environments.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-slate-400">
            <li>
              <strong className="text-slate-200">Checkout</strong> pins the
              workspace to the triggering commit.
            </li>
            <li>
              <strong className="text-slate-200">Lint &amp; tests</strong> run
              before you spend minutes on packaging.
            </li>
            <li>
              <strong className="text-slate-200">post {"{ }"}</strong> is the
              safety net for notifications and cleanup.
            </li>
          </ul>
        </div>
        <pre className="max-h-[min(70vh,520px)] overflow-auto rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-xs leading-relaxed text-slate-300 shadow-inner sm:text-sm">
          <code>{jenkinsfileExample}</code>
        </pre>
      </section>

      <p className="mt-12 text-center text-sm text-slate-500">
        New to the vocabulary?{" "}
        <Link href="/concepts" className="text-sky-400 hover:text-sky-300">
          Read CI/CD basics
        </Link>{" "}
        first, then revisit this table.
      </p>
    </PageShell>
  );
}
