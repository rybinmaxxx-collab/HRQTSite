"use client";

import { useMemo, useState } from "react";
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
 * Фильтры показываются только те, под которые есть проекты. Пустая вкладка
 * выглядит как поломка, а список ещё пополняется.
 */
export function Projects() {
  const [active, setActive] = useState<string>("Все");
  const [openId, setOpenId] = useState<number | null>(null);

  const filters = useMemo(
    () => projectFilters.filter((f) => projectsData.some((p) => matchesFilter(p, f))),
    [],
  );

  const visible = useMemo(
    () => projectsData.filter((p) => matchesFilter(p, active)),
    [active],
  );

  return (
    <Section id="projects" tone="soft">
      <SectionTitle lead={projectsSection.title} className="mb-6 max-w-[60rem]" />
      <p className="mb-8 max-w-[52rem] text-base leading-[1.68] tracking-[-0.01em] text-ink-2 md:text-xl">
        {projectsSection.lead}
      </p>

      <div className="mb-10 flex flex-wrap gap-2">
        {filters.map((f) => {
          const count = projectsData.filter((p) => matchesFilter(p, f)).length;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active === f}
              onClick={() => {
                setActive(f);
                setOpenId(null);
              }}
              className={`cursor-pointer rounded-full px-4 py-2 text-sm leading-5 font-medium transition-all duration-300 ease-in-out ${
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {visible.map((p) => {
          const open = openId === p.id;
          return (
            <article
              key={p.id}
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

              <h3 className="mb-4 font-display text-[1.25rem] leading-[1.25] font-bold tracking-[-0.02em] md:text-[1.375rem]">
                {p.title}
              </h3>

              {open ? (
                <div className="flex flex-col gap-5">
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
                className="mt-6 w-fit cursor-pointer rounded-[var(--radius-pill)] bg-accent-soft px-4 py-2 text-sm leading-5 font-medium text-accent-strong transition-all duration-300 ease-in-out hover:bg-line"
              >
                {open ? "Свернуть" : "Как это было"}
              </button>
            </article>
          );
        })}
      </div>
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
