/**
 * Indicates this site was authored with Cursor (https://cursor.com).
 * Attribution — not an official Cursor product mark.
 */
export function CursorPreparedBadge({
  compact,
  prominent,
}: {
  compact?: boolean;
  prominent?: boolean;
}) {
  return (
    <a
      href="https://cursor.com"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full border border-violet-500/25 shadow-sm transition hover:border-violet-400/40 hover:bg-violet-500/10 ${
        prominent
          ? "bg-gradient-to-r from-violet-950/65 to-sky-950/50 px-4 py-2 text-sm font-medium text-slate-100"
          : `bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white ${compact ? "py-1" : ""}`
      }`}
    >
      <span
        className={`flex items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 font-bold text-white shadow-inner ${prominent ? "h-8 w-8 text-sm" : "h-5 w-5 text-[10px]"}`}
        aria-hidden
      >
        C
      </span>
      <span className="tracking-tight">
        {compact ? "Cursor" : "Prepared with Cursor"}
      </span>
    </a>
  );
}
