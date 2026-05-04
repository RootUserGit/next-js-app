import type { ReactNode } from "react";
import { SiteNav } from "./SiteNav";

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="relative isolate min-h-screen overflow-hidden">
      <div
        className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-sky-500 glow-orb"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 top-40 h-80 w-80 rounded-full bg-violet-600 glow-orb"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-orange-500 glow-orb"
        aria-hidden
      />

      <SiteNav />
      <div className="relative grid-bg">
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-10 sm:px-8 sm:pt-14">
          {children}
        </div>
      </div>
    </div>
  );
}
