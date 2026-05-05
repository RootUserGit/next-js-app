import type { ReactNode } from "react";

type StackItem = {
  name: string;
  hint: string;
  icon: ReactNode;
};

function NextJsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <circle cx="12" cy="12" r="10.5" fill="#fff" />
      <path
        d="M14.7 17.4L8.2 8.9v8.5h-1.8V6.6h2.1l6.5 8.5V6.6h1.8v10.8z"
        fill="#000"
      />
    </svg>
  );
}

function ReactIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="1.9" fill="#61dafb" />
      <ellipse cx="12" cy="12" rx="8.2" ry="3.2" stroke="#61dafb" strokeWidth="1.4" />
      <ellipse
        cx="12"
        cy="12"
        rx="8.2"
        ry="3.2"
        stroke="#61dafb"
        strokeWidth="1.4"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="8.2"
        ry="3.2"
        stroke="#61dafb"
        strokeWidth="1.4"
        transform="rotate(120 12 12)"
      />
    </svg>
  );
}

function TypeScriptIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="2.8" fill="#3178c6" />
      <path d="M8.4 9.2h7.2v1.6h-2.8V18h-1.7v-7.2H8.4z" fill="#fff" />
    </svg>
  );
}

function TailwindIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <path
        d="M6.2 9.5c1-2.1 2.5-3.2 4.4-3.2 3.1 0 3.5 2.4 5.1 2.9 1 .3 2.3-.1 3.9-1.3-1 2.1-2.5 3.2-4.4 3.2-3.1 0-3.5-2.4-5.1-2.9-1-.3-2.3.1-3.9 1.3zm-3 5.1c1-2.1 2.5-3.2 4.4-3.2 3.1 0 3.5 2.4 5.1 2.9 1 .3 2.3-.1 3.9-1.3-1 2.1-2.5 3.2-4.4 3.2-3.1 0-3.5-2.4-5.1-2.9-1-.3-2.3.1-3.9 1.3z"
        fill="#38bdf8"
      />
    </svg>
  );
}

function GithubActionsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="4" fill="#2088ff" />
      <path d="M8.2 13.9l2-3.9h1.5l2.1 3.9h-1.6l-.4-.9h-2.2l-.4.9zm2-2h1.5l-.7-1.6z" fill="#fff" />
      <circle cx="15.8" cy="10.1" r="1.1" fill="#fff" />
    </svg>
  );
}

const STACKS: StackItem[] = [
  { name: "Next.js", hint: "App Router", icon: <NextJsIcon /> },
  { name: "React 19", hint: "UI runtime", icon: <ReactIcon /> },
  { name: "TypeScript", hint: "Typed app", icon: <TypeScriptIcon /> },
  { name: "Tailwind CSS", hint: "Styling", icon: <TailwindIcon /> },
  { name: "GitHub Actions", hint: "Workflow", icon: <GithubActionsIcon /> },
];

export function StackLogoGrid() {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
      {STACKS.map((item) => (
        <div
          key={item.name}
          className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5"
        >
          <div className="flex items-center gap-2">
            {item.icon}
            <span className="text-xs font-semibold text-slate-200">{item.name}</span>
          </div>
          <p className="mt-1 text-[10px] uppercase tracking-wide text-slate-500">
            {item.hint}
          </p>
        </div>
      ))}
    </div>
  );
}
