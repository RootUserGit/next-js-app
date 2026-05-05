"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CursorPreparedBadge } from "./CursorPreparedBadge";

const links = [
  { href: "/", label: "Home" },
  { href: "/playbook", label: "Playbook" },
  { href: "/concepts", label: "CI/CD basics" },
  { href: "/jenkins", label: "Jenkins stages" },
  { href: "/pipeline", label: "Live pipeline" },
  { href: "/deploy-s3", label: "S3 deploy" },
] as const;

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#0d121a]/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-8">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-slate-100 transition hover:text-cyan-300"
          >
            Pipeline<span className="text-cyan-400">Lab</span>
          </Link>
          <CursorPreparedBadge compact />
        </div>

        <nav
          className="flex max-w-full flex-wrap items-center justify-end gap-1 sm:gap-2"
          aria-label="Primary"
        >
          {links.map(({ href, label }) => {
            const active =
              href === "/"
                ? pathname === "/"
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
                  active
                    ? "bg-cyan-500/15 text-cyan-100 ring-1 ring-cyan-400/35"
                    : "text-slate-400 hover:bg-white/[0.06] hover:text-slate-100"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
