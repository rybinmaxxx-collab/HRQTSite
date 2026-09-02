"use client";

import { useMemo, useState } from "react";
import { Reveal, Spotlight, Stagger } from "@/components/motion";
import { Section, SectionTitle } from "@/components/ui";
import { projectsData, projectFilters, matchesFilter } from "@/content/projects";
import { projectsSection } from "@/content/site";

/**
 * Раздел «Проекты, реализованные специалистами HRQT».
 *
 * Название зафиксировано заказчиком целиком и не сокращается.
 *
 * Каждый проект — три части: было, что сделали, стало. На карточке видно
 * заголовок и результат, полный разбор раскрывается по клику: 18 проектов по
 * три абзаца иначе превращают страницу в стену текста.
 *
 * Главная правка этого прохода — размер раздела. Раньше вкладка «Все»
 * выводила все восемнадцать проектов сразу: раздел занимал несколько экранов
 * и обрывал страницу пополам — до пакетов и контактов доходили единицы.
 * Теперь в любой вкладке видно ровно четыре проекта, а остальные добираются
 * шагами по четыре кнопкой «Смотреть все». Четыре — это два ряда по два на
 * десктопе, то есть ровно один экран: раздел стал равен по весу соседним.
 *
 * Кнопка не ведёт на отдельную страницу сознательно: список проектов —
 * витрина внутри главной, а увод на /projects терял бы выбранный фильтр и
 * место прокрутки.
 */
const PAGE = 4;

export function Projects() {
  const [active, setActive] = useState<string>("Все");
  const [openId, setOpenId] = useState<number | null>(null);
  const [limit, setLimit] = useState(PAGE);

  const filters = useMemo(
    () => projectFilters.filter((f) => projectsData.some((p) => matchesFilter(p, f))),
    [],
  );

  const matched = useMemo(
    () => projectsData.filter((p) => matchesFilter(p, active)),
    [active],
  );

  const visible = matched.slice(0, limit);
  const rest = matched.length - visible.length;
  const expanded = limit > PAGE;

  const selectFilter = (f: string) => {
    setActive(f);
    setOpenId(null);
    // Счётчик сбрасывается вместе с фильтром: иначе переход с раскрытой
    // вкладки на короткую оставляет кнопку «Смотреть все», которой уже нечего
    // показывать.
    setLimit(PAGE);
  };

  return (
    <Section id="projects" tone="soft">
      <SectionTitle lead={projectsSection.title} className="mb-6 max-w-[60rem]" />
      <Reveal
        as="p"
        variant="rise"
        delay={120}
        className="mb-8 max-w-[52rem] text-lead leading-[1.68] tracking-[-0.01em] text-ink-2"
      >
        {projectsSection.lead}
      </Reveal>

      {/* Фильтры на узком экране едут горизонтально, а не переносятся в четыре
          ряда: перенос уводил первую карточку далеко за нижнюю кромку. */}
      <div
        role="tablist"
        aria-label="Категории проектов"
        className="-mx-[var(--spacing-content)] mb-10 flex gap-2 overflow-x-auto px-[var(--spacing-content)] pb-1 md:mx-0 md:flex-wrap md:px-0"
      >
        {filters.map((f) => {
          const count = projectsData.filter((p) => matchesFilter(p, f)).length;
          return (
            <button
              key={f}
              role="tab"
              type="button"
              aria-selected={active === f}
              onClick={() => selectFilter(f)}
              className={`shrink-0 cursor-pointer rounded-full px-4 py-2.5 text-sm leading-5 font-medium transition-all duration-300 ease-in-out ${
                active === f
                  ? "bg-accent text-white"
                  : "bg-surface text-ink-2 hover:bg-accent-soft hover:text-accent-strong"
              }`}
            >
              {f}
              <span className={active === f ? "ml-2 opacity-70" : "ml-2 text-muted"}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* key на сетке — не косметика: он заставляет React смонтировать список
          заново при смене вкладки, и волна появления проигрывается для новой
          подборки, а не остаётся от прежней. */}
      <Stagger key={active} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {visible.map((p) => {
          const open = openId === p.id;
          return (
            <Spotlight
              key={p.id}
              as="article"
              className="flex flex-col rounded-[var(--radius-card)] bg-surface p-6 md:p-8"
            >
              <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-strong">
                  {p.category}
                </span>
                {p.tags.map((t) => (
                  <span key={t} className="text-xs text-muted">
                    {t}
                  </span>
                ))}
              </div>

              <h3 className="mb-4 font-display text-[1.1875rem] leading-[1.25] font-bold tracking-[-0.02em] md:text-[1.375rem]">
                {p.title}
              </h3>

              {open ? (
                <div className="flex grow flex-col gap-5">
                  <Part label="Было" body={p.before} muted />
                  <Part label="Что сделали" body={p.action} />
                  <Part label="Стало" body={p.after} accent />
                </div>
              ) : (
                <p className="grow text-base leading-[1.625] tracking-[-0.01em] text-ink-2">
                  {p.after}
                </p>
              )}

              <button
                type="button"
                onClick={() => setOpenId(open ? null : p.id)}
                aria-expanded={open}
                className="mt-6 w-fit cursor-pointer rounded-[var(--radius-pill)] bg-accent-soft px-4 py-2.5 text-sm leading-5 font-medium text-accent-strong transition-all duration-300 ease-in-out hover:bg-line"
              >
                {open ? "Свернуть" : "Как это было"}
              </button>
            </Spotlight>
          );
        })}
      </Stagger>

      {(rest > 0 || expanded) && (
        <div className="mt-10 flex flex-wrap items-center gap-4">
          {rest > 0 ? (
            <button
              type="button"
              onClick={() => setLimit((v) => v + PAGE)}
              className="inline-flex min-h-[2.75rem] cursor-pointer items-center gap-2 rounded-[var(--radius-pill)] bg-accent px-5 text-base leading-5 font-medium text-white transition-colors duration-300 ease-in-out hover:bg-accent-strong"
            >
              Смотреть все
              <span className="opacity-70">ещё {rest}</span>
            </button>
          ) : null}

          {expanded ? (
            <button
              type="button"
              onClick={() => {
                setLimit(PAGE);
                setOpenId(null);
              }}
              className="inline-flex min-h-[2.75rem] cursor-pointer items-center rounded-[var(--radius-pill)] border border-line bg-surface px-5 text-base leading-5 font-medium text-ink-2 transition-colors duration-300 ease-in-out hover:border-ink"
            >
              Свернуть до четырёх
            </button>
          ) : null}

          <p className="text-sm text-muted">
            Показано {visible.length} из {matched.length}
          </p>
        </div>
      )}
    </Section>
  );
}

function Part({
  label,
  body,
  muted = false,
  accent = false,
}: {
  label: string;
  body: string;
  muted?: boolean;
  accent?: boolean;
}) {
  return (
    <div>
      <p
        className={`mb-2 text-[0.8125rem] font-semibold tracking-[0.08em] uppercase ${
          accent ? "text-accent-strong" : "text-muted"
        }`}
      >
        {label}
      </p>
      <p
        className={`text-base leading-[1.625] tracking-[-0.01em] ${
          muted ? "text-muted" : "text-ink-2"
        }`}
      >
        {body}
      </p>
    </div>
  );
}
