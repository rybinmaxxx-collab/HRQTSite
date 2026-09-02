import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { DemoBadge, PageHero } from "@/components/PageShell";
import { Counter, Reveal, Spotlight, Stagger } from "@/components/motion";
import { Button, Section, SectionTitle } from "@/components/ui";
import { DEMO_NOTICE, findService, servicePages } from "@/content/pages";
import { services } from "@/content/site";
import { typo } from "@/lib/typo";

/**
 * Страница услуги — один шаблон на все восемь направлений.
 *
 * Порядок блоков повторяет ход разговора на первой встрече: сначала «узнаёте
 * ситуацию?», потом «вот что входит», потом «вот как это идёт», потом «вот
 * что получится», и только затем вопросы. Каталог работ первым абзацем не
 * работает: пока читатель не узнал свою боль, состав работ ему нечем мерить.
 *
 * Шаблон один, а не восемь копий, потому что восемь копий расходятся: правку
 * вносят в ту, что открыта, и через месяц страницы отличаются отступами.
 */
export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return { title: "Услуга не найдена" };
  return {
    title: `${service.titleLead}${service.titleAccent}`.trim(),
    description: service.lead,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();

  const others = services.items.filter((s) => !s.href.endsWith(`/${slug}`)).slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow={service.eyebrow}
        titleLead={service.titleLead}
        titleAccent={service.titleAccent}
        lead={service.lead}
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Услуги", href: "/#services" },
        ]}
        aside={
          <dl className="flex flex-col gap-5 rounded-[var(--radius-card)] border border-line bg-surface p-6 md:p-8">
            {service.facts.map((f) => (
              <div key={f.label} className="flex items-baseline justify-between gap-4">
                <dt className="text-sm text-muted">{f.label}</dt>
                <dd className="text-right font-display text-base font-bold tracking-[-0.02em]">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        }
      />

      <Section tone="soft">
        <SectionTitle lead="Знакомая ситуация?" className="mb-8 max-w-[36rem]" />
        <Stagger
          as="ul"
          variant="rise"
          className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
        >
          {service.pains.map((pain) => (
            <li
              key={pain}
              className="flex gap-4 rounded-[var(--radius-card)] bg-surface p-5 md:p-6"
            >
              <span
                aria-hidden
                className="mt-1 h-2 w-2 shrink-0 rounded-[2px] bg-accent"
              />
              <span className="text-base leading-[1.6] text-ink-2">{typo(pain)}</span>
            </li>
          ))}
        </Stagger>
      </Section>

      <Section>
        <SectionTitle lead="Что входит в работу" className="mb-10 max-w-[36rem]" />
        <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {service.scope.map((item) => (
            <Spotlight
              key={item.title}
              className="flex flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 md:p-8"
            >
              <h3 className="mb-3 font-display text-h3 leading-[1.25] font-bold tracking-[-0.03em]">
                {item.title}
              </h3>
              <p className="text-base leading-[1.625] text-ink-2">{item.body}</p>
            </Spotlight>
          ))}
        </Stagger>
      </Section>

      <Section tone="tint">
        <SectionTitle lead="Как это идёт" className="mb-10 max-w-[36rem]" />
        <Stagger
          as="ol"
          className="m-track grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {service.steps.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-3">
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

      <Section tone="ink">
        <SectionTitle
          lead="Что получается "
          accent="на выходе"
          className="m-on-ink mb-10 max-w-[36rem] text-white"
        />
        <Stagger as="dl" className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {service.results.map((r) => (
            <div key={r.label}>
              <dt className="font-display text-[clamp(2rem,5vw,3rem)] leading-none font-bold tracking-[-0.04em] text-accent-soft">
                <Counter value={r.value} />
              </dt>
              <dd className="mt-3 text-base leading-[1.55] text-on-ink">{r.label}</dd>
            </div>
          ))}
        </Stagger>

        <Reveal variant="rise" delay={200} className="mt-12">
          <p className="mb-4 text-[0.8125rem] font-semibold tracking-[0.08em] text-accent-soft uppercase">
            Работаем в
          </p>
          <ul className="flex flex-wrap gap-2">
            {service.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-[var(--radius-pill)] border border-white/15 px-4 py-2 text-sm text-on-ink"
              >
                {tech}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section>
        <SectionTitle lead="Частые вопросы" className="mb-8 max-w-[36rem]" />
        <Stagger variant="rise" className="flex max-w-[52rem] flex-col gap-3">
          {service.faq.map((item) => (
            <details
              key={item.q}
              className="group rounded-[var(--radius-card)] border border-line bg-surface px-5 py-4 transition-colors duration-300 open:border-accent hover:border-accent md:px-6 md:py-5"
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
              <p className="mt-4 text-base leading-[1.625] text-ink-2">{typo(item.a)}</p>
            </details>
          ))}
        </Stagger>

        <DemoBadge text={DEMO_NOTICE} />
      </Section>

      <Section tone="soft">
        <SectionTitle lead="Другие направления" className="mb-8 max-w-[36rem]" />
        <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((item) => (
            <Link
              prefetch={false}
              key={item.href}
              href={item.href}
              className="group flex min-h-[6rem] flex-col justify-between rounded-[var(--radius-card)] bg-surface p-5 transition-colors duration-300 hover:bg-accent-soft"
            >
              <span className="font-display text-base leading-[1.3] font-bold tracking-[-0.02em]">
                {item.title}
              </span>
              <span
                aria-hidden
                className="mt-4 text-accent-strong transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          ))}
        </Stagger>
      </Section>

      {/* Своего закрывающего CTA здесь нет: тот же призыв — «Начнём с
          экспресс-аудита» — уже стоит первым блоком подвала. Два одинаковых
          предложения подряд не удваивают конверсию, а обесценивают оба. */}
      <Footer />
    </>
  );
}
