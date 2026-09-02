"use client";

import { useState } from "react";
import { Counter, Reveal, Stagger } from "@/components/motion";
import { Section, SectionTitle } from "@/components/ui";
import { team } from "@/content/site";

/**
 * Раздел «О команде HRQT».
 *
 * ТЗ просит переключатель на короткую версию для мобильных. Реализовано без
 * подмены контента по ширине экрана: полный текст всегда в разметке — важно
 * для поисковиков и скринридеров, — а на узких экранах он свёрнут до короткой
 * версии и раскрывается кнопкой. На десктопе показан целиком сразу.
 *
 * Колонка с цифрами прижата к верху (self-start) и на планшете уезжала под
 * текст пустой белой плитой во всю ширину. Теперь до lg это горизонтальный
 * ряд из трёх фактов, а не столбец: те же данные занимают одну строку вместо
 * трети экрана.
 */
export function Team() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Section id="team" tone="tint">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div>
          <SectionTitle lead={team.title} className="mb-8" />

          {/* Короткая версия — только на узких экранах и только пока свёрнуто. */}
          <p
            className={`text-base leading-[1.68] tracking-[-0.01em] text-ink-2 md:text-lg lg:hidden ${
              expanded ? "hidden" : ""
            }`}
          >
            {team.short}
          </p>

          <div className={`flex-col gap-5 lg:flex ${expanded ? "flex" : "hidden"}`}>
            {team.full.map((para) => (
              <p
                key={para.slice(0, 32)}
                className="text-base leading-[1.68] tracking-[-0.01em] text-ink-2 md:text-lg"
              >
                {para}
              </p>
            ))}
          </div>

          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
            className="mt-6 inline-flex min-h-[2.75rem] w-fit cursor-pointer items-center rounded-[var(--radius-pill)] bg-surface px-5 text-sm leading-5 font-medium text-accent-strong transition-all duration-300 ease-in-out hover:bg-line lg:hidden"
          >
            {expanded ? "Свернуть" : "Читать полностью"}
          </button>
        </div>

        <Reveal variant="aperture" delay={120} className="self-start">
          <Stagger
            as="dl"
            variant="rise"
            className="grid grid-cols-3 gap-4 rounded-[var(--radius-card)] bg-surface p-6 sm:gap-6 lg:grid-cols-1 lg:gap-6 lg:p-8"
          >
            {team.stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-[clamp(1.75rem,5vw,2.5rem)] leading-none font-bold tracking-[-0.04em] text-accent-strong">
                  <Counter value={s.value} />
                </dt>
                <dd className="mt-2 text-sm leading-[1.45] text-ink-2 sm:text-base sm:leading-[1.5]">
                  {s.label}
                </dd>
              </div>
            ))}
          </Stagger>
        </Reveal>
      </div>
    </Section>
  );
}
