export type StageTone =
  | "sky"
  | "violet"
  | "emerald"
  | "amber"
  | "orange"
  | "cyan"
  | "rose"
  | "lime";

export type PipelineStage = {
  id: string;
  title: string;
  summary: string;
  hints: string[];
  tone: StageTone;
  /** Short label for compact pipeline UI */
  short: string;
};

/**
 * Typical Jenkins declarative-style stages for an application
 * that builds, tests, packages, and deploys.
 */
export const jenkinsPipelineStages: PipelineStage[] = [
  {
    id: "checkout",
    short: "Checkout",
    title: "Checkout (SCM)",
    summary:
      "Pull the exact commit that triggered the job so every later stage runs on reproducible source.",
    hints: ["checkout scm", "git fetch", "sparse checkout"],
    tone: "sky",
  },
  {
    id: "lint",
    short: "Lint",
    title: "Lint & static analysis",
    summary:
      "Catch style and obvious defects early with formatters, linters, and language servers in CI.",
    hints: ["eslint", "ruff", "SonarQube"],
    tone: "violet",
  },
  {
    id: "unit",
    short: "Unit tests",
    title: "Unit & contract tests",
    summary:
      "Fast, isolated tests prove core logic and API contracts before heavier suites run.",
    hints: ["jest", "pytest", "Pact"],
    tone: "emerald",
  },
  {
    id: "build",
    short: "Build",
    title: "Compile / build artifact",
    summary:
      "Produce the deployable bundle: binaries, container images, or static sites from this repo.",
    hints: ["npm run build", "mvn package", "docker build"],
    tone: "amber",
  },
  {
    id: "security",
    short: "Security",
    title: "Security scan (SAST / deps)",
    summary:
      "Shift-left scanning for vulnerable dependencies, secrets in code, and known CVEs in images.",
    hints: ["Trivy", "Snyk", "gitleaks"],
    tone: "rose",
  },
  {
    id: "publish",
    short: "Publish",
    title: "Publish artifact",
    summary:
      "Push immutable artifacts to a registry or storage so deploy stages always promote the same bits.",
    hints: ["ECR push", "Artifactory", "S3 sync"],
    tone: "orange",
  },
  {
    id: "deploy",
    short: "Deploy",
    title: "Deploy to environment",
    summary:
      "Roll out to staging or production with blue/green, canary, or versioned releases behind automation.",
    hints: ["kubectl apply", "Terraform", "CodeDeploy"],
    tone: "cyan",
  },
  {
    id: "verify",
    short: "Verify",
    title: "Smoke & health checks",
    summary:
      "Post-deploy probes and synthetic checks confirm the release is actually serving traffic correctly.",
    hints: ["curl /health", "k6 smoke", "PagerDuty"],
    tone: "lime",
  },
];

export const toneRing: Record<StageTone, string> = {
  sky: "ring-sky-400/50 shadow-sky-500/15",
  violet: "ring-violet-400/50 shadow-violet-500/15",
  emerald: "ring-emerald-400/50 shadow-emerald-500/15",
  amber: "ring-amber-400/50 shadow-amber-500/15",
  orange: "ring-orange-400/50 shadow-orange-500/15",
  cyan: "ring-cyan-400/50 shadow-cyan-500/15",
  rose: "ring-rose-400/50 shadow-rose-500/15",
  lime: "ring-lime-400/50 shadow-lime-500/15",
};

export const toneDot: Record<StageTone, string> = {
  sky: "bg-sky-400",
  violet: "bg-violet-400",
  emerald: "bg-emerald-400",
  amber: "bg-amber-400",
  orange: "bg-orange-400",
  cyan: "bg-cyan-400",
  rose: "bg-rose-400",
  lime: "bg-lime-400",
};

export const toneIconBg: Record<StageTone, string> = {
  sky: "bg-sky-400",
  violet: "bg-violet-400",
  emerald: "bg-emerald-400",
  amber: "bg-amber-400",
  orange: "bg-orange-400",
  cyan: "bg-cyan-400",
  rose: "bg-rose-400",
  lime: "bg-lime-400",
};
