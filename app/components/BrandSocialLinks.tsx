function GitHubLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const CARD =
  "group flex flex-1 flex-col items-center gap-3 rounded-2xl border border-black/10 px-6 py-5 shadow-md transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.25,1,0.35,1)] dark:border-white/12 sm:flex-row sm:items-center sm:gap-5 sm:px-8 sm:py-6";

export function BrandSocialLinks({
  githubUrl,
  linkedInUrl,
}: {
  githubUrl: string;
  linkedInUrl: string;
}) {
  return (
    <div className="flex w-full max-w-xl flex-col gap-4 sm:flex-row sm:justify-center lg:max-w-2xl">
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer me"
        aria-label="Rahul Singh on GitHub (RootUserGit)"
        className={`${CARD} bg-[#24292f] text-white shadow-black/25 hover:-translate-y-1 hover:bg-[#32383f] hover:shadow-xl dark:bg-[#1f2428] dark:hover:bg-[#2d333b]`}
      >
        <GitHubLogo className="h-12 w-12 shrink-0 opacity-95 sm:h-14 sm:w-14" />
        <div className="text-center sm:text-left">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65">
            @RootUserGit
          </span>
          <span className="mt-0.5 block text-lg font-semibold tracking-tight">
            GitHub
          </span>
          <span className="mt-1 block max-w-[12rem] text-xs text-white/75 group-hover:text-white/95">
            Code & pipelines
          </span>
        </div>
      </a>
      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer me"
        aria-label="Rahul Singh on LinkedIn"
        className={`${CARD} bg-[#0a66c2] text-white shadow-[#063b70]/35 hover:-translate-y-1 hover:bg-[#004182] hover:shadow-xl dark:bg-[#0a66c2] dark:hover:bg-[#0d78d6]`}
      >
        <LinkedInLogo className="h-12 w-12 shrink-0 sm:h-14 sm:w-14" />
        <div className="text-center sm:text-left">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65">
            Professional
          </span>
          <span className="mt-0.5 block text-lg font-semibold tracking-tight">
            LinkedIn
          </span>
          <span className="mt-1 block max-w-[12rem] text-xs text-white/80 group-hover:text-white">
            Rahul Singh
          </span>
        </div>
      </a>
    </div>
  );
}
