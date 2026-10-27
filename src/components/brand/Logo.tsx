import Link from "next/link";

type MarkProps = {
  className?: string;
  /** Colour of the two outer strokes. Defaults to currentColor. */
  color?: string;
  /** Colour of the shared centre stem — the "shared core". */
  coreColor?: string;
  strokeWidth?: number;
  title?: string;
};

/**
 * The Shared Stem: two lowercase b's (Lab + Studio) built on one shared stem.
 */
export function LogoMark({
  className,
  color = "currentColor",
  coreColor = "var(--champagne)",
  strokeWidth = 11,
  title,
}: MarkProps) {
  return (
    <svg
      viewBox="6 4 100 96"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <line x1="16" y1="8" x2="16" y2="92" stroke={color} strokeWidth={strokeWidth} />
      <circle cx="36" cy="68" r="20" fill="none" stroke={color} strokeWidth={strokeWidth} />
      <circle cx="76" cy="68" r="20" fill="none" stroke={color} strokeWidth={strokeWidth} />
      <line x1="56" y1="8" x2="56" y2="92" stroke={coreColor} strokeWidth={strokeWidth} />
    </svg>
  );
}

/** Mark + serif wordmark lockup, linking home. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Biibisoft home"
      className={`inline-flex items-center gap-2.5 ${className}`}
    >
      <LogoMark className="h-[26px] w-auto" />
      <span className="font-serif text-[28px] leading-none tracking-[-0.01em]">
        Biibisoft
      </span>
    </Link>
  );
}
