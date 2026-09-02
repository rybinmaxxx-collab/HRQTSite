import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { DemoBadge, PageHero } from "@/components/PageShell";
import { Reveal, Spotlight, Stagger } from "@/components/motion";
import { Section, SectionTitle } from "@/components/ui";
import { DEMO_NOTICE, contactsPage } from "@/content/pages";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Почта, телефон, офис и реквизиты HRQT. Отвечаем в течение рабочего дня.",
};

/**
 * Контакты.
 *
 * Страница собрана из четырёх блоков, и порядок в ней не случайный: сначала
 * способ связаться, потом форма, потом адрес, и только затем реквизиты.
 * Реквизиты нужны на этапе договора — то есть последнему по счёту читателю, —
 * но именно на них ведёт ссылка «Реквизиты» из меню, поэтому у блока свой
 * якорь #requisites, и переход из меню приводит сразу к нему.
 *
 * Таблица реквизитов — тот случай, когда на узком экране таблица не нужна:
 * ниже md каждая строка становится парой «подпись / значение» в столбик.
 * Настоящая таблица на 375px даёт горизонтальную прокрутку и нечитаемый
 * восьмипиксельный текст.
 */
export default function ContactsPage() {
  const { channels, offices, requisites, form } = contactsPage;

  return (
    <>
      <PageHero
        eyebrow={contactsPage.eyebrow}
        titleLead={contactsPage.titleLead}
        titleAccent={contactsPage.titleAccent}
        lead={contactsPage.lead}
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Контакты", href: "/contacts" },
        ]}
      />

      <Section>
        <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c) => (
            <Spotlight
              key={c.value}
              className="flex flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6"
            >
              <p className="mb-3 text-[0.75rem] font-semibold tracking-[0.08em] text-muted uppercase">
                {c.label}
              </p>
              <a
                href={c.href}
                className="font-display text-lg font-bold tracking-[-0.02em] break-words transition-colors duration-300 hover:text-accent-strong"
              >
                {c.value}
              </a>
              <p className="mt-3 text-sm leading-[1.6] text-muted">{c.note}</p>
            </Spotlight>
          ))}
        </Stagger>
      </Section>

      <Section tone="soft">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionTitle lead={form.title} className="mb-4" />
            <Reveal
              as="p"
              variant="rise"
              delay={120}
              className="mb-8 max-w-[34rem] text-base leading-[1.68] text-ink-2"
            >
              {form.lead}
            </Reveal>

            <Stagger variant="rise" className="flex flex-col gap-4">
              {form.fields.map((field) => (
                <label key={field.name} className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-ink-2">{field.label}</span>
                  {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      rows={4}
                      placeholder={field.placeholder}
                      className="rounded-[var(--radius-card)] border border-line bg-surface px-4 py-3 text-base text-ink transition-colors duration-300 placeholder:text-muted focus:border-accent focus:outline-none"
                    />
                  ) : (
                    <input
                      type="text"
                      name={field.name}
                      placeholder={field.placeholder}
                      className="min-h-[2.75rem] rounded-[var(--radius-card)] border border-line bg-surface px-4 py-3 text-base text-ink transition-colors duration-300 placeholder:text-muted focus:border-accent focus:outline-none"
                    />
                  )}
                </label>
              ))}

              <button
                type="button"
                className="mt-2 inline-flex min-h-[2.75rem] w-full cursor-pointer items-center justify-center rounded-[var(--radius-pill)] bg-accent px-5 text-base font-medium text-white transition-colors duration-300 hover:bg-accent-strong sm:w-fit"
              >
                {form.submit}
              </button>

              <p className="text-sm leading-[1.55] text-muted">{form.consent}</p>
              <p className="text-sm leading-[1.55] text-muted">{form.stub}</p>
            </Stagger>
          </div>

          <Stagger className="flex flex-col gap-6 self-start">
            {offices.map((o) => (
              <div
                key={o.city}
                className="rounded-[var(--radius-card)] bg-surface p-6 md:p-8"
              >
                <p className="mb-2 font-display text-lg font-bold tracking-[-0.02em]">
                  {o.city}
                </p>
                <p className="text-base leading-[1.6] text-ink-2">{o.address}</p>
                <p className="mt-3 text-sm leading-[1.6] text-muted">{o.note}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </Section>

      <Section id="requisites">
        <SectionTitle lead={requisites.title} className="mb-4" />
        <Reveal
          as="p"
          variant="rise"
          delay={120}
          className="mb-8 max-w-[46rem] text-base leading-[1.68] text-ink-2"
        >
          {requisites.note}
        </Reveal>

        <Reveal
          variant="aperture"
          className="overflow-hidden rounded-[var(--radius-card)] border border-line"
        >
          <dl className="divide-y divide-line">
            {requisites.rows.map((row) => (
              <div
                key={row.label}
                className="flex flex-col gap-1 px-5 py-4 md:flex-row md:gap-8 md:px-6"
              >
                <dt className="text-sm text-muted md:w-[16rem] md:shrink-0">{row.label}</dt>
                <dd className="text-base leading-[1.5] break-words text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <DemoBadge text={DEMO_NOTICE} />
      </Section>

      <Footer />
    </>
  );
}
