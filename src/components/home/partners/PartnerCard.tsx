type LogoVariant = "molecule" | "stack" | "grid" | "cell" | "spark" | "wave";

type PartnerCardProps = {
  name: string;
  category: string;
  variant: LogoVariant;
};

function LogoMark({ variant }: { variant: LogoVariant }) {
  if (variant === "molecule") {
    return (
      <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden="true">
        <circle cx="19" cy="22" r="7" fill="currentColor" />
        <circle cx="43" cy="18" r="5" fill="currentColor" opacity="0.72" />
        <circle cx="42" cy="43" r="8" fill="currentColor" opacity="0.9" />
        <path
          d="M25 21 38 19M23 27l14 12"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.58"
        />
      </svg>
    );
  }

  if (variant === "stack") {
    return (
      <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden="true">
        <path
          d="M14 18h36M14 29h36M14 40h36"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M20 51h24"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.58"
        />
      </svg>
    );
  }

  if (variant === "grid") {
    return (
      <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden="true">
        <path
          d="M16 16h32v32H16zM32 16v32M16 32h32"
          stroke="currentColor"
          strokeWidth="5"
          fill="none"
          strokeLinejoin="round"
        />
        <circle cx="32" cy="32" r="5" fill="currentColor" />
      </svg>
    );
  }

  if (variant === "cell") {
    return (
      <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden="true">
        <rect
          x="17"
          y="12"
          width="30"
          height="40"
          rx="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
        />
        <path
          d="M25 25h14M25 34h14"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M32 8v8M32 48v8"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.64"
        />
      </svg>
    );
  }

  if (variant === "spark") {
    return (
      <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden="true">
        <path
          d="m35 6-19 29h16l-3 23 20-32H34z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden="true">
      <path
        d="M9 38c7-16 16 16 23 0s16 16 23 0"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M9 25c7-16 16 16 23 0s16 16 23 0"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity="0.58"
      />
    </svg>
  );
}

export default function PartnerCard({
  name,
  category,
  variant,
}: PartnerCardProps) {
  return (
    <div
      className="partner-card bg-theme-blue/50 p-5 rounded-lg flex flex-col items-center justify-center gap-3 text-center text-font-white w-40 h-40
    xl:w-50 xl:h-50 xl:p-6"
    >
      <div className="text-font-white">
        <LogoMark variant={variant} />
      </div>
      <div>
        <p className="font-spacegrotesk-semibold text-lg leading-none xl:text-xl">
          {name}
        </p>
        <p className="mt-1 text-[11px] uppercase leading-tight tracking-[0.08em] opacity-75 xl:text-xs">
          {category}
        </p>
      </div>
    </div>
  );
}
