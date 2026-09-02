import Link from "next/link";
import { Reveal, Spotlight, Stagger } from "@/components/motion";
import { Button, HeadingRow, Section, SectionTitle } from "@/components/ui";
import { projectsData } from "@/content/projects";
import { projectsSection } from "@/content/site";

/**
 * Раздел «Проекты, реализованные специалистами HRQT» на главной.
 *
 * Название зафиксировано заказчиком целиком и не сокращается.
 *
 * Раздел ужат до двух работ и одной кнопки. Раньше здесь стояли фильтры по
 * пяти категориям, четыре карточки и раскрытие каждой в три абзаца — то есть
 * витрина, каталог и читалка одновременно. Заказчик описал это точно: «как
 * будто мы базу знаний хуйнули в лендинг», «блок не для продажи, а для душных
 * заказчиков».
 *
 * Разница между двумя режимами чтения тут и правда есть. Тому, кто скроллит
 * главную впервые, нужно доказательство, что работы существуют и они
 * взрослые, — для этого хватает двух карточек. Тому, кто уже выбирает
 * подрядчика, нужен разбор по всем восемнадцати, и он идёт на /projects, где
 * ничего не свёрнуто и ничего не надо нажимать.
 *
 * Две карточки, а не три: заказчик сам свёл к двум («выше я про этот же блок
 * писал три — две пусть будет»). На широком экране они встают в два столбца
 * и занимают ровно половину высоты прежнего раздела.
 */
export function Projects() {
  const items = projectsData.slice(0, projectsSection.landingCount);

  return (
    <Section id="projects" tone="soft">
      <HeadingRow
        action={
          <Button href={projectsSection.action.href} variant="tertiary">
            {projectsSection.action.label}
          </Button>
        }
      >
        <SectionTitle lead={projectsSection.title} className="max-w-[60rem]" />
      </HeadingRow>
      <Reveal
        as="p"
        variant="rise"
        delay={120}
        className="mb-10 max-w-[52rem] text-lead leading-[1.68] tracking-[-0.01em] text-ink-2"
      >
        {projectsSection.lead}
      </Reveal>

      <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        {items.map((p) => (
          <Spotlight
            key={p.id}
            as="article"
            className="group relative flex flex-col rounded-[var(--radius-card)] bg-surface p-6 md:p-8"
          >
            <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-strong">
                {p.category}
              </span>
              {p.tags.slice(0, 2).map((t) => (
                <span key={t} className="text-xs text-muted">
                  {t}
                </span>
              ))}
            </div>

            <h3 className="mb-4 font-display text-[1.1875rem] leading-[1.25] font-bold tracking-[-0.02em] md:text-[1.375rem]">
              <Link
                prefetch={false}
                href={`/projects#project-${p.id}`}
                className="block after:absolute after:inset-0 after:z-[1] after:content-['']"
              >
                {p.title}
              </Link>
            </h3>

            <p className="grow text-base leading-[1.625] tracking-[-0.01em] text-ink-2">
              {p.after}
            </p>

            <span className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-[var(--radius-pill)] bg-accent-soft px-4 py-2 text-sm leading-5 font-medium text-accent-strong transition-colors duration-300 ease-in-out group-hover:bg-line">
              Как это было
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
