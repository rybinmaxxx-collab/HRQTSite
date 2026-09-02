import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { DemoBadge, PageHero } from "@/components/PageShell";
import { Counter, Reveal, Spotlight, Stagger } from "@/components/motion";
import { Button, Section, SectionTitle } from "@/components/ui";
import { DEMO_NOTICE, aboutPage } from "@/content/pages";

export const metadata: Metadata = {
  title: "О компании",
  description:
    "HRQT — команда архитекторов, аналитиков и разработчиков в кадровых технологиях. Принципы работы, история и люди.",
};

/**
 * О компании.
 *
 * Четыре блока: цифры, принципы, история, люди.
 *
 * История — единственное место на сайте, кроме процесса, где нумерация
 * (здесь — годы) несёт смысл: это последовательность, и порядок в ней
 * информативен. В остальных списках сайта номеров нет намеренно.
 *
 * Карточки людей — без фотографий, с инициалами в круге. Это не заглушка на
 * время: пока фотографий нет, шесть одинаковых серых прямоугольников выглядят
 * хуже, чем честные инициалы. Место под <Image> в карточке уже размечено.
 */
export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={aboutPage.eyebrow}
        titleLead={aboutPage.titleLead}
        titleAccent={aboutPage.titleAccent}
        lead={aboutPage.lead}
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "О компании", href: "/about" },
        ]}
        aside={
          <dl className="grid grid-cols-2 gap-6 rounded-[var(--radius-card)] border border-line bg-surface p-6 md:p-8">
            {aboutPage.stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-[clamp(1.75rem,4vw,2.25rem)] leading-none font-bold tracking-[-0.04em] text-accent-strong">
                  <Counter value={s.value} />
                </dt>
                <dd className="mt-2 text-sm leading-[1.45] text-ink-2">{s.label}</dd>
              </div>
            ))}
          </dl>
        }
      />

      <Section>
        <SectionTitle lead="Как мы работаем" className="mb-10 max-w-[40rem]" />
        <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {aboutPage.principles.map((p) => (
            <Spotlight
              key={p.title}
              className="flex flex-col rounded-[var(--radius-card)] bg-accent-soft p-6 sm:p-8"
            >
              <h3 className="mb-3 font-display text-h3 leading-[1.25] font-bold tracking-[-0.03em]">
                {p.title}
              </h3>
              <p className="text-base leading-[1.625] text-ink-2">{p.body}</p>
            </Spotlight>
          ))}
        </Stagger>
      </Section>

      <Section tone="soft">
        <SectionTitle lead="Как мы сюда пришли" className="mb-10 max-w-[40rem]" />
        <Stagger
          as="ol"
          className="m-track grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {aboutPage.timeline.map((t) => (
            <li key={t.year} className="flex flex-col gap-3">
              <span className="relative z-[1] inline-flex w-fit items-center rounded-full bg-accent px-3 py-1 font-display text-sm font-bold text-white">
                {t.year}
              </span>
              <h3 className="font-display text-base font-bold tracking-[-0.02em]">{t.title}</h3>
              <p className="text-sm leading-[1.6] text-ink-2">{t.body}</p>
            </li>
          ))}
        </Stagger>
      </Section>

      <Section>
        <SectionTitle lead="Кто это делает" className="mb-10 max-w-[40rem]" />
        <Stagger className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {aboutPage.people.map((person) => (
            <Spotlight
              key={person.name}
              className="flex flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6"
            >
              {/* Место под фотографию: заменить span на <Image> — размер и
                  форма уже заданы, остальная карточка не меняется. */}
              <span
                aria-hidden
                className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft font-display text-xl font-bold text-accent-strong"
              >
                {person.initials}
              </span>
              <h3 className="font-display text-lg font-bold tracking-[-0.02em]">{person.name}</h3>
              <p className="mt-1 text-sm font-medium text-accent-strong">{person.role}</p>
              <p className="mt-3 text-base leading-[1.6] text-ink-2">{person.body}</p>
            </Spotlight>
          ))}
        </Stagger>

        <DemoBadge text={DEMO_NOTICE} />

        <Reveal variant="rise" delay={120} className="mt-10">
          <Button href="/contacts">Обсудить задачу</Button>
        </Reveal>
      </Section>

      <Footer />
    </>
  );
}
