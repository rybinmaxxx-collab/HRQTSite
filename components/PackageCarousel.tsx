"use client";

import { useState } from "react";
import { Button, HeadingRow, Section, SectionTitle } from "@/components/ui";
import { packages } from "@/content/site";

/**
 * Форматы работы — три пакета.
 *
 * Геометрия панелей — из SECTION_MAP.md (репозиторий aura): градиентная панель
 * с тремя колонками фактов и крупной лёгкой строкой рядом со светлой панелью,
 * где ряд надзаголовков, заголовок 22px→1.875rem, текст и тихая кнопка.
 *
 * По ТЗ переключатель переехал наверх блока, над карточками, и стал
 * сегментированным контролом: под панелью он читался как подпись, а не как
 * управление. Точки-маркеры в составе пакета убраны.
 */
export function PackageCarousel() {
  const [active, setActive] = useState(1);
  const item = packages.items[active];

  return (
    <Section id="packages">
      <HeadingRow
        action={
          <div className="flex flex-wrap gap-3">
            {packages.actions.map((a) => (
              <Button key={a.href + a.label} href={a.href} variant={a.variant}>
                {a.label}
              </Button>
            ))}
          </div>
        }
      >
        <SectionTitle
          lead={packages.titleLead}
          accent={packages.titleAccent}
          className="max-w-[42.875rem]"
        />
      </HeadingRow>

      <div
        role="tablist"
        aria-label="Форматы работы"
        className="mt-10 mb-8 flex w-full gap-1 overflow-x-auto rounded-[var(--radius-pill)] bg-soft p-1 sm:w-fit"
      >
        {packages.items.map((p, i) => (
          <button
            key={p.tab}
            role="tab"
            type="button"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`shrink-0 grow cursor-pointer rounded-[var(--radius-pill)] px-5 py-2.5 text-base leading-5 font-medium transition-all duration-300 ease-in-out sm:grow-0 ${
              i === active ? "bg-surface text-ink" : "text-muted hover:text-ink-2"
            }`}
          >
            {p.tab}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        className="grid grid-cols-1 overflow-hidden rounded-[var(--radius-card)] lg:grid-cols-2"
      >
        <div className="flex flex-col justify-between gap-10 bg-gradient-to-br from-accent to-accent-far p-8 text-white md:p-12">
          <dl className="grid grid-cols-3 gap-4">
            {item.stats.map((s) => (
              <div key={s.label}>
                <dt className="text-[0.8125rem] font-semibold tracking-[0.08em] text-white/70 uppercase">
                  {s.label}
                </dt>
                <dd className="mt-2 font-display text-base font-bold tracking-[-0.02em]">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="text-[1.375rem] leading-[1.4] font-light tracking-[-0.02em]">
            {item.pull}
          </p>
        </div>

        <div className="flex flex-col bg-soft p-8 md:p-12">
          <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2">
            {item.tags.map((t) => (
              <span
                key={t}
                className="text-[0.8125rem] font-semibold tracking-[0.08em] text-accent-strong uppercase"
              >
                {t}
              </span>
            ))}
          </div>
          <h3 className="mb-4 font-display text-[22px] leading-[1.25] font-bold tracking-[-0.033em] md:text-3xl">
            {item.title}
          </h3>
          <p className="mb-8 grow text-base leading-[1.625] tracking-[-0.01em] text-ink-2">
            {item.body}
          </p>
          <Button href={item.cta.href} variant="secondary">
            {item.cta.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
