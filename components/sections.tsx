import Link from "next/link";
import {
  Button,
  Eyebrow,
  HeadingRow,
  Section,
  SectionTitle,
} from "@/components/ui";
import { FileCheck, Layers, ShieldCheck } from "lucide-react";
import { Reveal, Spotlight, SplitTitle, Stagger } from "@/components/motion";
import { ServiceArt } from "@/components/ServiceArt";
import { typo } from "@/lib/typo";
import { audiences, faq, process, proof, security, statement } from "@/content/site";

/** Иконки блока безопасности — по порядку пунктов в content/site.ts. */
const SECURITY_ICONS = [ShieldCheck, Layers, FileCheck] as const;

/**
 * Section 5 of the reference: the tint band.
 *
 * Geometry from SECTION_MAP.md (репозиторий aura): a 900px figure, a light-weight
 * quote at 1.375rem with -1px tracking and gradient on the emphasised runs,
 * then avatar, name at 1.25rem/500 and role beneath.
 *
 * The reference carries a client testimonial. HRQT has none it may publish,
 * so this is the founder's own statement of approach (Фаза 7, «Наш подход»),
 * attributed to him by name.
 *
 * Цитата — единственное место на странице, где движение по словам работает не
 * на заголовок, а на текст: короткая реплика в четыре строки собирается так
 * же, как заголовки разделов, и читается как произнесённая, а не набранная.
 */
export function Statement() {
  return (
    <Section tone="soft">
      <figure className="relative mx-auto flex w-full max-w-[900px] flex-col justify-center gap-8">
        <blockquote className="quote-text grow text-left xl:text-center">
          <SplitTitle
            as="p"
            lead={statement.leadIn}
            accent={statement.accent1}
            className="text-[1.0625rem] leading-[1.55] font-light tracking-[-0.02em] md:text-[1.375rem] md:leading-[1.5]"
          />
          <SplitTitle
            as="p"
            lead={statement.middle}
            accent={statement.accent2}
            tail={statement.tail}
            className="text-[1.0625rem] leading-[1.55] font-light tracking-[-0.02em] md:text-[1.375rem] md:leading-[1.5]"
          />
        </blockquote>

        <Reveal
          as="figcaption"
          variant="rise"
          delay={160}
          className="flex flex-row leading-8 font-medium xl:justify-center"
        >
          {/* Место под фотографию основателя. Заменить на <Image> — круг и
              размер уже заданы, менять больше ничего не нужно. */}
          <span
            aria-hidden
            className="mr-4 flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent-soft text-lg font-bold text-accent-strong"
          >
            КЭ
          </span>
          <div>
            <span className="block text-base leading-[26px] font-medium tracking-[-0.19px] xl:text-xl xl:leading-8">
              {statement.author}
            </span>
            <span className="block text-sm font-normal tracking-[-0.02em] text-muted xl:text-base">
              {statement.role}
            </span>
          </div>
        </Reveal>
      </figure>
    </Section>
  );
}

/**
 * Section 6 of the reference: the audience card grid.
 *
 * Card recipe from SECTION_MAP.md (репозиторий aura): borderless, a media well on a
 * cool ground at 12px radius with a 55% aspect box, the image scaling on group
 * hover, a heading whose link carries a full-card ::after overlay, body, then
 * a quiet pill.
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
      <Stagger className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
        {audiences.items.map((item) => (
          <Spotlight
            key={item.title}
            as="article"
            className="group relative flex flex-col rounded-[var(--radius-card)]"
          >
            <div className="mb-6 w-full overflow-hidden rounded-[var(--radius-card)] bg-soft">
              <div className="relative h-0 w-full pb-[55%]">
                <div className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]">
                  <ServiceArt name={item.art} />
                </div>
              </div>
            </div>
            <h3 className="font-display text-h3 leading-[1.25] font-bold tracking-[-0.03em]">
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
            <span className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-[var(--radius-pill)] bg-accent-soft px-4 py-2 text-base leading-5 font-medium text-accent-strong transition-colors duration-300 ease-in-out group-hover:bg-line">
              {item.cta.label}
              <span
                aria-hidden
                className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </Spotlight>
        ))}
      </Stagger>
    </Section>
  );
}

/**
 * Section 7 of the reference: heading row with a quiet action, an intro
 * paragraph, then two cards on the tint at 12px radius.
 *
 * The reference fills both cards with partner testimonials; these are HRQT's
 * two hardest differentiators, with the Фаза 2 RTB text behind them.
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
      <Reveal
        as="p"
        variant="rise"
        delay={120}
        className="mb-10 max-w-[60rem] text-lead leading-[1.68] tracking-[-0.01em] text-ink-2"
      >
        {typo(proof.lead)}
      </Reveal>
      <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        {proof.cards.map((card) => (
          <Spotlight
            key={card.title}
            className="flex flex-col rounded-[var(--radius-card)] bg-accent-soft p-6 sm:p-8 md:p-10"
          >
            <span className="mb-6 w-fit rounded-full bg-surface px-4 py-2 text-[0.75rem] font-semibold tracking-[0.08em] text-accent-strong uppercase">
              {card.meta}
            </span>
            <h3 className="mb-4 font-display text-h3 leading-[1.25] font-bold tracking-[-0.03em]">
              {card.title}
            </h3>
            <p className="text-base leading-[1.625] tracking-[-0.01em] text-ink-2 md:text-[1.0625rem]">
              {card.body}
            </p>
          </Spotlight>
        ))}
      </Stagger>
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
      <Reveal as="div" variant="fade">
        <Eyebrow onInk>{security.eyebrow}</Eyebrow>
      </Reveal>
      <SectionTitle
        lead={security.titleLead}
        accent={security.titleAccent}
        className="m-on-ink max-w-[50rem] text-white"
      />
      <Reveal
        as="p"
        variant="rise"
        delay={120}
        className="mt-6 mb-12 max-w-[46rem] text-lead leading-[1.68] tracking-[-0.01em] text-on-ink"
      >
        {typo(security.lead)}
      </Reveal>
      <Stagger className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
        {security.items.map((item, i) => {
          const Icon = SECURITY_ICONS[i] ?? ShieldCheck;
          return (
            <div key={item.title} className="flex flex-col gap-3">
              <Icon size={40} strokeWidth={1.6} className="text-accent-soft" aria-hidden />
              <h3 className="mt-2 font-display text-lg font-bold tracking-[-0.02em] text-white">
                {item.title}
              </h3>
              <p className="text-base leading-[1.625] text-on-ink">{item.body}</p>
            </div>
          );
        })}
      </Stagger>
    </Section>
  );
}

/**
 * Пункт 5 шаблона HRQT — процесс. Вне референса, но обязателен по Фазе 3.
 *
 * Нумерация здесь не украшение: это единственный на странице список, где
 * порядок несёт смысл — заявка идёт до аудита, аудит до предложения. Поэтому
 * шаги пронумерованы, а карточки услуг и проектов — нет.
 *
 * Соединяющая шаги линия дорисовывается вместе с появлением ряда — на
 * десктопе она и объясняет, что это последовательность, а не сетка.
 */
export function Process() {
  return (
    <Section tone="soft">
      <SectionTitle lead={process.title} className="mb-10 max-w-[50rem]" />
      <Stagger
        as="ol"
        className="m-track grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-5"
      >
        {process.steps.map((step, i) => (
          <li key={step.title} className="relative flex flex-col gap-3">
            <span className="relative z-[1] flex h-[34px] w-[34px] items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
              {i + 1}
            </span>
            <h3 className="mt-1 font-display text-base font-bold tracking-[-0.02em]">
              {step.title}
            </h3>
            <p className="text-sm leading-[1.6] text-ink-2">{step.body}</p>
          </li>
        ))}
      </Stagger>
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
      <Stagger variant="rise" className="mt-2 flex flex-col gap-3">
        {faq.items.map((item) => (
          <details
            key={item.q}
            className="group rounded-[var(--radius-card)] border border-line bg-surface px-5 py-4 transition-colors duration-300 ease-in-out open:border-accent hover:border-accent md:px-6 md:py-5"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-base font-bold tracking-[-0.02em] md:text-lg [&::-webkit-details-marker]:hidden">
              {typo(item.q)}
              <span
                aria-hidden
                className="shrink-0 text-2xl leading-none font-normal text-accent transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-4 text-base leading-[1.625] tracking-[-0.01em] text-ink-2">
              {typo(item.a)}
            </p>
          </details>
        ))}
      </Stagger>
    </Section>
  );
}
