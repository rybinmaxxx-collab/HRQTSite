import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageShell";
import { Reveal, Stagger } from "@/components/motion";
import { Button, Section, SectionTitle } from "@/components/ui";
import { projectFilters, projectsData, type ProjectItem } from "@/content/projects";
import { closing, projectsPage } from "@/content/site";

export const metadata: Metadata = {
  title: "Проекты",
  description:
    "Восемнадцать проектов, реализованных специалистами HRQT: WebSoft HCM, интеграции и 1С, архитектура и ИТ-аудит, информационная безопасность, ИИ и автоматизация. По каждому — что было, что сделали и чем закончилось.",
};

/** Категории в порядке из фильтра, без служебного «Все» и без пустых. */
const groups = projectFilters
  .filter((f) => f !== "Все")
  .map((category) => ({
    category,
    slug: slugify(category),
    items: projectsData.filter((p) => p.category === category),
  }))
  .filter((g) => g.items.length > 0);

function slugify(value: string) {
  return `cat-${projectFilters.indexOf(value as (typeof projectFilters)[number])}`;
}

/**
 * Читалка проектов.
 *
 * Раздел приехал сюда с главной, и по дороге у него поменялся жанр. На
 * лендинге он был витриной с фильтрами, где каждый разбор надо было
 * раскрывать кликом; здесь он — текст, который читают подряд.
 *
 * Отсюда три решения, каждое против клика:
 *
 *   1. Ничего не свёрнуто. Все восемнадцать разборов открыты сразу, «было —
 *      что сделали — стало» видно целиком. Клик, открывающий текст, который
 *      всё равно лежит в разметке, — это плата ни за что.
 *   2. Вкладок нет. Категории стали заголовками внутри страницы, а ряд
 *      ссылок под шапкой прокручивает к нужной. Разница с вкладками
 *      принципиальная: вкладка прячет остальное, ссылка — только переносит
 *      взгляд, и соседнюю категорию по-прежнему можно доскроллить.
 *   3. Три части разбора стоят в ряд, а не друг под другом. Столбцы «было»,
 *      «что сделали», «стало» одинаковой ширины сравниваются по горизонтали,
 *      и восемнадцать проектов не превращаются в пятьдесят четыре абзаца,
 *      идущих сплошной колонкой.
 *
 * Якорь `project-<id>` на каждой работе: карточка на главной ведёт прямо к
 * своему разбору.
 */
export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow={projectsPage.eyebrow}
        titleLead={projectsPage.titleLead}
        titleAccent={projectsPage.titleAccent}
        lead={projectsPage.lead}
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Проекты", href: "/projects" },
        ]}
      >
        {/* Ряд переходов по разделам страницы. Это навигация, а не фильтр:
            ничего не скрывается, меняется только место просмотра. */}
        <Reveal
          as="nav"
          variant="rise"
          delay={280}
          aria-label="Категории проектов"
          className="-mx-[var(--spacing-content)] mt-10 flex gap-2 overflow-x-auto px-[var(--spacing-content)] pb-1 md:mx-0 md:flex-wrap md:px-0"
        >
          {groups.map((g) => (
            <a
              key={g.slug}
              href={`#${g.slug}`}
              className="shrink-0 rounded-full bg-soft px-4 py-2.5 text-sm leading-5 font-medium text-ink-2 transition-colors duration-300 ease-in-out hover:bg-accent-soft hover:text-accent-strong"
            >
              {g.category}
              <span className="ml-2 text-muted">{g.items.length}</span>
            </a>
          ))}
        </Reveal>
      </PageHero>

      {groups.map((group, i) => (
        <Section key={group.slug} id={group.slug} tone={i % 2 === 0 ? "plain" : "soft"}>
          <SectionTitle lead={group.category} className="mb-10 max-w-[46rem]" />
          <Stagger variant="rise" className="flex flex-col gap-6 md:gap-8">
            {group.items.map((p) => (
              <ProjectEntry key={p.id} project={p} />
            ))}
          </Stagger>
        </Section>
      ))}

      <Section tone="tint">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <SectionTitle lead="Похожая задача?" className="max-w-[34rem]" />
          <Button href={closing.cta.href}>{closing.cta.label}</Button>
        </div>
      </Section>

      <Footer />
    </>
  );
}

function ProjectEntry({ project }: { project: ProjectItem }) {
  return (
    <article
      id={`project-${project.id}`}
      className="rounded-[var(--radius-card)] border border-line bg-surface p-6 md:p-8"
    >
      <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
        {project.tags.map((t) => (
          <span key={t} className="text-xs text-muted">
            {t}
          </span>
        ))}
      </div>

      <h3 className="mb-6 max-w-[46rem] font-display text-[1.25rem] leading-[1.25] font-bold tracking-[-0.025em] md:text-[1.5rem]">
        {project.title}
      </h3>

      <div className="grid grid-cols-1 gap-6 border-t border-line pt-6 md:grid-cols-3 md:gap-8">
        <Part label="Было" body={project.before} muted />
        <Part label="Что сделали" body={project.action} />
        <Part label="Стало" body={project.after} accent />
      </div>
    </article>
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
