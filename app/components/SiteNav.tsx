"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/concepts", label: "CI/CD basics" },
  { href: "/jenkins", label: "Jenkins stages" },
  { href: "/pipeline", label: "Live pipeline" },
  { href: "/deploy-s3", label: "S3 deploy" },
] as const;

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--bg-deep)]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-8">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-white transition hover:text-sky-300"
        >
          Pipeline<span className="text-sky-400">Lab</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-1 sm:gap-2" aria-label="Primary">
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
                    ? "bg-sky-500/20 text-sky-200 ring-1 ring-sky-400/40"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
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
