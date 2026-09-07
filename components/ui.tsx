import Link from "next/link";
import type { ReactNode } from "react";
import { SplitTitle } from "@/components/motion";
import { typo } from "@/lib/typo";

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
  /* Секция, которую спека отводит под безопасность и контроль. На чёрной
     странице «темнее фона» уже некуда, поэтому панель наоборот чуть светлее
     — иначе её просто не видно. */
  ink: "bg-panel text-white",
} as const;

/**
 * The section shell. Reproduce this and the page rhythm falls out for free:
 * одна плавная вертикальная величина --space-section и больше ничего.
 *
 * Здесь же исправлены две вещи, из-за которых разделы налезали друг на друга.
 *
 * Первая — `first:pt-0`. Задумывалось, что верхний отступ снимается у самого
 * первого раздела страницы, но каждый раздел обёрнут в отдельный контейнер
 * появления и внутри него всегда оказывается первым ребёнком. Селектор
 * срабатывал у всех: верхнего отступа не было ни у одного раздела, и соседние
 * блоки склеивались в один. Убрано.
 *
 * Вторая — `flex` на самой секции. Секция во flex-контексте перестаёт быть
 * блоком, и вертикальные отступы в ней считаются иначе; вместе с первой
 * ошибкой это давало «съехавшие» блоки на планшете. Секция снова блок.
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
      className={`relative z-[5] py-[var(--space-section)] ${TONE[tone]} ${className}`}
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
  as = "h2",
  className = "",
}: {
  lead: string;
  accent?: string;
  tail?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <SplitTitle
      as={as}
      lead={lead}
      accent={accent}
      tail={tail}
      className={`font-display text-h2 leading-[1.08] font-bold tracking-[-0.03em] text-balance ${className}`}
    />
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
    // Отступ снизу был `mb-6 md:mb-0` — на десктопе заголовок вплотную упирался
    // в следующий за ним абзац, и ряд читался как часть текста. Теперь отступ
    // один и не исчезает на широком экране.
    <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
      <div className="min-w-0">{children}</div>
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
      // `w-fit` убран: inline-flex и так сжимается по содержимому, а в
      // колоночном flex-контейнере (мобильный ряд CTA, ящик меню) он мешал
      // кнопке растянуться на ширину экрана — палец получал узкую цель у края.
      className={`relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-[var(--radius-pill)] px-5 text-base leading-5 font-medium transition-all duration-300 ease-in-out min-h-[2.75rem] ${VARIANTS[variant]} ${className}`}
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
