"use client";

import { useState } from "react";
import { Counter, Reveal } from "@/components/motion";
import { Button, HeadingRow, Section, SectionTitle } from "@/components/ui";
import { packages } from "@/content/site";

/**
 * Форматы работы — три пакета.
 *
 * Геометрия панелей — из SECTION_MAP.md (репозиторий aura): градиентная панель
 * с колонками фактов и крупной лёгкой строкой рядом со светлой панелью, где
 * ряд надзаголовков, заголовок, текст и тихая кнопка.
 *
 * Что исправлено в этом проходе — пустоты внутри пары панелей.
 *
 *   1. Левая панель стояла на justify-between: цифры прибивало к верхней
 *      кромке, крупную строку — к нижней, а высоту задавала правая колонка.
 *      Стоило правому тексту стать длиннее, и посередине левой панели
 *      открывалась дыра в полтора десятка сантиметров. Теперь содержимое
 *      левой панели центрировано: свободное место делится поровну сверху и
 *      снизу и перестаёт читаться как пропущенный блок.
 *   2. Абзац в правой панели стоял на grow и отталкивал кнопку в самый низ —
 *      между текстом и кнопкой висела такая же пустота. Кнопка вернулась к
 *      тексту на фиксированный отступ.
 *   3. Ряды фактов на узком экране ломались на три колонки по одному слову.
 *      Ниже sm их два в ряд.
 *
 * Цифры фактов доезжают счётчиком: в блоке про сроки и объёмы это единственное
 * место, где движение несёт смысл, а не украшает.
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
        className="mt-8 mb-8 flex w-full gap-1 overflow-x-auto rounded-[var(--radius-pill)] bg-soft p-1 sm:w-fit"
      >
        {packages.items.map((p, i) => (
          <button
            key={p.tab}
            role="tab"
            type="button"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`shrink-0 grow cursor-pointer rounded-[var(--radius-pill)] px-4 py-2.5 text-sm leading-5 font-medium transition-all duration-300 ease-in-out sm:grow-0 sm:px-5 sm:text-base ${
              i === active ? "bg-surface text-ink shadow-[0_1px_2px_rgba(20,24,31,0.06)]" : "text-muted hover:text-ink-2"
            }`}
          >
            {p.tab}
          </button>
        ))}
      </div>

      <Reveal
        variant="aperture"
        className="overflow-hidden rounded-[var(--radius-card)]"
      >
        <div key={item.tab} role="tabpanel" className="m-swap grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-8 bg-gradient-to-br from-accent to-accent-far p-8 text-white md:p-12">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3">
              {item.stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-[0.75rem] font-semibold tracking-[0.08em] text-white/70 uppercase">
                    {s.label}
                  </dt>
                  <dd className="mt-2 font-display text-base font-bold tracking-[-0.02em]">
                    <Counter value={s.value} />
                  </dd>
                </div>
              ))}
            </dl>
            <p className="text-[1.1875rem] leading-[1.45] font-light tracking-[-0.02em] md:text-[1.375rem]">
              {item.pull}
            </p>
          </div>

          <div className="flex flex-col bg-soft p-8 md:p-12">
            <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2">
              {item.tags.map((t) => (
                <span
                  key={t}
                  className="text-[0.75rem] font-semibold tracking-[0.08em] text-accent-strong uppercase"
                >
                  {t}
                </span>
              ))}
            </div>
            <h3 className="mb-4 font-display text-[1.25rem] leading-[1.25] font-bold tracking-[-0.03em] md:text-[1.75rem]">
              {item.title}
            </h3>
            <p className="mb-8 text-base leading-[1.625] tracking-[-0.01em] text-ink-2">
              {item.body}
            </p>
            <Button href={item.cta.href} variant="secondary" className="w-fit self-start">
              {item.cta.label}
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
