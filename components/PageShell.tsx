import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal, SplitTitle } from "@/components/motion";
import { Container } from "@/components/ui";
import { typo } from "@/lib/typo";

/**
 * Шапка внутренней страницы.
 *
 * Одна на все внутренние разделы — услуги, блог, «о компании», контакты,
 * правовые документы. Смысл в единственности: пока каждая страница рисует
 * себе заголовок сама, отступы расходятся, и на четвёртой странице ритм уже
 * другой. Здесь он задан один раз.
 *
 * Хлебные крошки заданы разметкой, а не выведены из URL: путь в меню и путь в
 * адресной строке совпадают не всегда, а читателю нужен первый.
 */
export function PageHero({
  eyebrow,
  titleLead,
  titleAccent,
  lead,
  breadcrumbs,
  aside,
  children,
}: {
  eyebrow?: string;
  titleLead: string;
  titleAccent?: string;
  lead?: string;
  breadcrumbs?: { label: string; href: string }[];
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="brand-glow pt-[var(--h-nav)]">
      <Container className="pt-10 pb-12 md:pt-16 md:pb-16">
        {breadcrumbs?.length ? (
          <Reveal as="nav" variant="fade" aria-label="Хлебные крошки" className="mb-6">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  {i > 0 ? <span aria-hidden>/</span> : null}
                  <Link
                    prefetch={false}
                    href={crumb.href}
                    className="transition-colors duration-300 hover:text-accent-strong"
                  >
                    {crumb.label}
                  </Link>
                </li>
              ))}
            </ol>
          </Reveal>
        ) : null}

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.55fr_1fr] lg:items-end lg:gap-16">
          <div>
            {eyebrow ? (
              <Reveal
                as="p"
                variant="fade"
                className="mb-4 text-[0.8125rem] font-semibold tracking-[0.08em] text-accent-strong uppercase"
              >
                {eyebrow}
              </Reveal>
            ) : null}

            <SplitTitle
              as="h1"
              lead={titleLead}
              accent={titleAccent}
              className="max-w-[46rem] font-display text-display leading-[1.06] font-bold tracking-[-0.035em] text-balance"
            />

            {lead ? (
              <Reveal
                as="p"
                variant="rise"
                delay={200}
                className="mt-6 max-w-[46rem] text-lead leading-[1.68] tracking-[-0.01em] text-ink-2"
              >
                {typo(lead)}
              </Reveal>
            ) : null}
          </div>

          {aside ? (
            <Reveal variant="aperture" delay={260}>
              {aside}
            </Reveal>
          ) : null}
        </div>

        {children}
      </Container>
    </div>
  );
}

/**
 * Плашка «здесь демонстрационные данные».
 *
 * Стоит на страницах, где вымысел можно принять за факт: реквизиты, статьи,
 * цифры результатов. Тон намеренно тихий — это служебная пометка, а не
 * предупреждение об опасности, — но она видима, потому что реквизиты в
 * договоре из демо-данных стоят дороже, чем некрасивая плашка.
 */
export function DemoBadge({ text }: { text: string }) {
  return (
    <p className="mt-6 flex items-start gap-2 rounded-[var(--radius-card)] border border-dashed border-line bg-soft px-4 py-3 text-sm leading-[1.55] text-muted">
      <span aria-hidden className="mt-[2px] shrink-0 font-semibold text-accent-strong">
        demo
      </span>
      {text}
    </p>
  );
}
