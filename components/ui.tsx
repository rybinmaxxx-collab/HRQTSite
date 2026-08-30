import Link from "next/link";
import type { ReactNode } from "react";

/**
 * The primitives, all lifted from Beamery's served markup and re-coloured
 * to HRQT's palette. See SECTION_MAP.md (репозиторий aura) for the originals.
 */

const TONE = {
  /* bg-white */
  plain: "bg-surface",
  /* the alternating band, HRQT --soft */
  soft: "bg-soft",
  /* the tint band that stands in for elevation, HRQT --accent-s */
  tint: "bg-accent-soft",
  /* the dark section HRQT's spec reserves for security/control blocks */
  ink: "bg-ink text-white",
} as const;

/**
 * The section shell. Reproduce this and the page rhythm falls out for free:
 * 4rem of vertical padding below md, 5rem above, and nothing else.
 */
export function Section({
  id,
  tone = "plain",
  className = "",
  children,
}: {
  id?: string;
  tone?: keyof typeof TONE;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`relative z-[5] flex py-[var(--min-spacing-section)] first:pt-0 md:py-[var(--max-spacing-section)] ${TONE[tone]} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

/** 76rem wide, gutter as a percentage until the max-width binds at xl. */
export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[var(--max-w-content)] px-[var(--spacing-content)] xl:px-0 ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Uppercase eyebrow. HRQT's spec: 13px, 600, 0.08em, accent — and the
 * accessible accent, since this is small text on white.
 */
export function Eyebrow({
  children,
  onInk = false,
}: {
  children: ReactNode;
  onInk?: boolean;
}) {
  return (
    <p
      className={`mb-4 text-[0.8125rem] font-semibold tracking-[0.08em] uppercase ${
        onInk ? "text-accent-soft" : "text-accent-strong"
      }`}
    >
      {children}
    </p>
  );
}

/**
 * Section heading. Sentence case, 700, heavy negative tracking that scales
 * with size — the single most characteristic thing about the reference.
 */
export function SectionTitle({
  lead,
  accent,
  tail,
  className = "",
}: {
  lead: string;
  accent?: string;
  tail?: string;
  className?: string;
}) {
  return (
    <h2
      className={`font-display text-[2rem] leading-[2.25rem] font-bold tracking-[-1px] md:text-[3.25rem] md:leading-[3.5rem] md:tracking-[-2px] ${className}`}
    >
      {lead}
      {accent ? <strong>{accent}</strong> : null}
      {tail}
    </h2>
  );
}

/**
 * Heading row: title left, action right, stacking below md. Repeats in three
 * sections of the reference homepage.
 */
export function HeadingRow({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-6 md:mb-0 md:flex-row md:items-end">
      <div>{children}</div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

const VARIANTS = {
  /* accent fill, white label — permitted for bold 15px+ per HRQT's spec */
  primary:
    "bg-accent text-white hover:bg-accent-strong focus:bg-accent-strong active:bg-accent-strong",
  /* Beamery's secondary is a white fill, which works there because its hero
     sits on a photograph. On this near-white glow it reads as plain text, so
     it takes HRQT's own Ghost button instead: hairline border, darkening on
     hover. */
  secondary:
    "bg-surface text-ink border border-line hover:border-ink active:border-ink",
  /* the third variant, used where a heading row needs a quiet action */
  tertiary: "bg-accent-soft text-accent-strong hover:bg-line active:bg-line",
  /* on the dark section */
  onInk: "bg-white text-ink hover:bg-line active:bg-line",
} as const;

/**
 * Pill button: 24px radius, 2.75rem min height, medium weight, no shadow,
 * no transform on hover — it darkens and nothing else moves.
 */
export function Button({
  href,
  variant = "primary",
  className = "",
  children,
}: {
  href: string;
  variant?: keyof typeof VARIANTS;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link prefetch={false}
      href={href}
      className={`relative inline-flex w-fit cursor-pointer items-center gap-2 overflow-hidden rounded-[var(--radius-pill)] px-4 text-base leading-5 font-medium transition-all duration-300 ease-in-out min-h-[2.75rem] ${VARIANTS[variant]} ${className}`}
    >
      <span className="mx-1 text-center">{children}</span>
    </Link>
  );
}

/** Badge. HRQT spec: accent-soft ground, accent-strong text, pill, 12px/600. */
export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-strong">
      {children}
    </span>
  );
}

/**
 * The icon mark from HRQT's logo spec, reused as the card and list glyph:
 * a rounded outline square with a solid dot inside. It is the brand's only
 * graphic motif, and it means the site needs no icon library at all.
 */
export function ContourMark({
  size = 46,
  onInk = false,
}: {
  size?: number;
  onInk?: boolean;
}) {
  const inner = Math.round(size * 0.2);
  return (
    <span
      aria-hidden
      className="inline-flex shrink-0 items-center justify-center rounded-[11px] border-[3px] border-accent"
      style={{ width: size, height: size }}
    >
      <span
        className={`block rounded-[2px] ${onInk ? "bg-white" : "bg-ink"}`}
        style={{ width: inner, height: inner }}
      />
    </span>
  );
}
