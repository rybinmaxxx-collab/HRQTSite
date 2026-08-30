import Link from "next/link";
import {
  Button,
  ContourMark,
  Eyebrow,
  HeadingRow,
  Section,
  SectionTitle,
} from "@/components/ui";
import { audiences, faq, process, proof, security, statement } from "@/content/site";

/**
 * Section 5 of the reference: the tint band.
 *
 * Geometry from SECTION_MAP.md (репозиторий aura): a 900px figure, a pill chip with a
 * 1px #cdcdd0 border holding a logo, a light-weight quote at 1.375rem with
 * -1px tracking and gradient on the emphasised runs, then avatar, name at
 * 1.25rem/500 and role beneath.
 *
 * The reference carries a client testimonial. HRQT has none it may publish,
 * so this is the founder's own statement of approach (Фаза 7, «Наш подход»),
 * attributed to him by name, and the chip holds HRQT's own mark rather than
 * someone else's logo.
 */
export function Statement() {
  return (
    <Section tone="soft">
      <figure className="relative mx-auto flex w-full max-w-[900px] flex-col justify-center gap-8">
        <div className="flex min-h-14 w-fit items-center gap-3 rounded-full border border-line px-6 py-2 xl:mx-auto">
          <ContourMark size={28} />
          <span className="font-display text-base font-bold tracking-[-0.02em]">HRQT</span>
        </div>

        <blockquote className="quote-text grow text-left xl:text-center">
          <p className="mb-6 text-base leading-7 font-light tracking-[-0.5px] md:text-[1.375rem] md:tracking-[-1px]">
            {statement.leadIn}
            <strong>{statement.accent1}</strong>
            {statement.middle}
            <strong>{statement.accent2}</strong>
            {statement.tail}
          </p>
        </blockquote>

        <figcaption className="flex flex-row leading-8 font-medium xl:justify-center">
          <span
            aria-hidden
            className="mr-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-surface"
          >
            <ContourMark size={32} />
          </span>
          <div>
            <span className="block text-base leading-[26px] font-medium tracking-[-0.19px] xl:text-xl xl:leading-8">
              {statement.author}
            </span>
            <span className="block text-sm font-normal tracking-[-0.02em] text-muted xl:text-base">
              {statement.role}
            </span>
          </div>
        </figcaption>
      </figure>
    </Section>
  );
}

/**
 * Section 6 of the reference: the audience card grid.
 *
 * Card recipe from SECTION_MAP.md (репозиторий aura): borderless, a media well on a
 * cool ground at 12px radius with a 55% aspect box, the image scaling to 1.10
 * on group hover after a 150ms delay, a 1.375rem heading whose link carries a
 * full-card ::after overlay, body at 1rem/1.625, then a quiet pill.
 *
 * Four cards in the reference, three here: HRQT's ЛПР map has three roles.
 */
export function Audiences() {
  return (
    <Section>
      <SectionTitle
        lead={audiences.titleLead}
        accent={audiences.titleAccent}
        className="mb-10 max-w-[76rem]"
      />
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
        {audiences.items.map((item) => (
          <article key={item.title} className="group relative flex flex-col">
            <div className="mb-6 w-full overflow-hidden rounded-[var(--radius-card)] bg-soft">
              <div className="relative h-0 w-full pb-[55%]">
                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-200 ease-in-out group-hover:scale-110 group-hover:delay-[var(--animation-delay-base)]">
                  <ContourMark size={56} />
                </div>
              </div>
            </div>
            <h3 className="font-display text-[1.375rem] leading-[1.25] font-bold tracking-[-0.033em]">
              <Link
                prefetch={false}
                href={item.cta.href}
                className="block after:absolute after:inset-0 after:z-[1] after:content-['']"
              >
                {item.title}
              </Link>
            </h3>
            <p className="mt-[0.55em] grow text-base leading-[1.625] tracking-[-0.01em] text-ink-2">
              {item.body}
            </p>
            <span className="mt-6 w-fit rounded-[var(--radius-pill)] bg-accent-soft px-4 py-2 text-base leading-5 font-medium text-accent-strong transition-all duration-300 ease-in-out group-hover:bg-line">
              {item.cta.label}
            </span>
          </article>
        ))}
      </div>
    </Section>
  );
}

/**
 * Section 7 of the reference: heading row with a quiet action, an intro
 * paragraph at 1.1875rem/1.68, then two cards on the warm tint at 12px radius
 * with 3rem padding.
 *
 * The reference fills both cards with partner testimonials; these are HRQT's
 * two hardest differentiators, with the Фаза 2 RTB text behind them.
 *
 * The reference alternates a lilac and a warm peach tint between these two
 * bands. HRQT's palette is entirely cool and has no warm tone, so the pair is
 * separated with its own two greys instead of importing a hue it does not own.
 */
export function Proof() {
  return (
    <Section>
      <HeadingRow
        action={
          <Button href={proof.action.href} variant="tertiary">
            {proof.action.label}
          </Button>
        }
      >
        <SectionTitle lead={proof.title} className="max-w-[76rem]" />
      </HeadingRow>
      <p className="mt-6 mb-12 text-base leading-[1.68] tracking-[-0.01em] text-ink-2 md:text-xl">
        {proof.lead}
      </p>
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
        {proof.cards.map((card) => (
          <div
            key={card.title}
            className="flex flex-col rounded-[var(--radius-card)] bg-accent-soft p-8 md:p-12"
          >
            <div className="mb-6 flex min-h-14 w-fit items-center gap-3 rounded-full border border-line px-6 py-2">
              <ContourMark size={28} />
              <span className="text-[0.8125rem] font-semibold tracking-[0.08em] text-muted uppercase">
                {card.meta}
              </span>
            </div>
            <h3 className="mb-4 font-display text-[1.375rem] leading-[1.25] font-bold tracking-[-0.033em]">
              {card.title}
            </h3>
            <p className="text-base leading-[1.625] tracking-[-0.01em] text-ink-2 md:text-[1.0625rem]">
              {card.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/**
 * Not in the reference homepage. HRQT's own design spec (Фаза 6) reserves a
 * dark section for security and control, and the homepage template (Фаза 3)
 * requires the block, so it is kept — rendered in the reference's idiom.
 */
export function Security() {
  return (
    <Section id="security" tone="ink">
      <Eyebrow onInk>{security.eyebrow}</Eyebrow>
      <h2 className="max-w-[50rem] font-display text-[2rem] leading-[2.25rem] font-bold tracking-[-1px] text-white md:text-[3.25rem] md:leading-[3.5rem] md:tracking-[-2px]">
        {security.titleLead}
        <strong>{security.titleAccent}</strong>
      </h2>
      <p className="mt-6 mb-12 max-w-[46rem] text-xl leading-[1.68] tracking-[-0.01em] text-on-ink">
        {security.lead}
      </p>
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
        {security.items.map((item) => (
          <div key={item.title} className="flex flex-col gap-3">
            <ContourMark size={40} onInk />
            <h3 className="mt-2 font-display text-lg font-bold tracking-[-0.02em] text-white">
              {item.title}
            </h3>
            <p className="text-base leading-[1.625] text-on-ink">{item.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/** Пункт 5 шаблона HRQT — процесс. Вне референса, но обязателен по Фазе 3. */
export function Process() {
  return (
    <Section tone="soft">
      <SectionTitle lead={process.title} className="mb-10 max-w-[50rem]" />
      <ol className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
        {process.steps.map((step, i) => (
          <li key={step.title} className="flex flex-col gap-3">
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
              {i + 1}
            </span>
            <h3 className="mt-1 font-display text-base font-bold tracking-[-0.02em]">
              {step.title}
            </h3>
            <p className="text-sm leading-[1.6] text-ink-2">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/**
 * Пункт 9 шаблона HRQT — FAQ. Native <details>, so it works with JavaScript
 * off. The marker rotates from + to × on open, per HRQT's spec §5.
 */
export function Faq() {
  return (
    <Section>
      <HeadingRow
        action={
          <Button href={faq.action.href} variant="tertiary">
            {faq.action.label}
          </Button>
        }
      >
        <SectionTitle lead={faq.title} />
      </HeadingRow>
      <div className="mt-10 flex flex-col gap-3">
        {faq.items.map((item) => (
          <details
            key={item.q}
            className="group rounded-[var(--radius-card)] border border-line bg-surface px-6 py-5 transition-colors duration-300 ease-in-out open:border-accent hover:border-accent"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg font-bold tracking-[-0.02em] [&::-webkit-details-marker]:hidden">
              {item.q}
              <span
                aria-hidden
                className="shrink-0 text-2xl leading-none font-normal text-accent transition-transform duration-300 ease-in-out group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-4 text-base leading-[1.625] tracking-[-0.01em] text-ink-2">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
