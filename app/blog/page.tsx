import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { DemoBadge, PageHero } from "@/components/PageShell";
import { Spotlight, Stagger } from "@/components/motion";
import { Section } from "@/components/ui";
import { DEMO_NOTICE, blogPage, blogPosts } from "@/content/pages";

export const metadata: Metadata = {
  title: "Блог",
  description:
    "Разборы по WebSoft HCM, 1С ЗУП, интеграциям, локальному ИИ и архитектурному надзору.",
};

/**
 * Список материалов.
 *
 * Первая статья идёт крупной карточкой, остальные — сеткой по три. Это не
 * декоративный приём: в списке из шести одинаковых карточек читателю не за
 * что зацепиться, а редакция всегда знает, что показать первым.
 *
 * Дата в <time> с машинным datetime — раздел с материалами без этого
 * не понимают ни агрегаторы, ни поиск.
 */
export default function BlogPage() {
  const [lead, ...rest] = blogPosts;

  return (
    <>
      <PageHero
        eyebrow={blogPage.eyebrow}
        titleLead={blogPage.titleLead}
        titleAccent={blogPage.titleAccent}
        lead={blogPage.lead}
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Блог", href: "/blog" },
        ]}
      />

      <Section>
        <Stagger className="grid grid-cols-1 gap-8">
          <Spotlight
            as="article"
            className="group relative flex flex-col rounded-[var(--radius-card)] bg-soft p-6 sm:p-10 md:p-12"
          >
            <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
              <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-strong">
                {lead.tag}
              </span>
              <time dateTime={lead.date}>{lead.dateLabel}</time>
              <span>{lead.reading}</span>
            </div>
            <h2 className="max-w-[44rem] font-display text-[clamp(1.5rem,3.4vw,2.25rem)] leading-[1.15] font-bold tracking-[-0.03em]">
              <Link
                prefetch={false}
                href={`/blog/${lead.slug}`}
                className="after:absolute after:inset-0 after:content-['']"
              >
                {lead.title}
              </Link>
            </h2>
            <p className="mt-4 max-w-[44rem] text-lead leading-[1.68] text-ink-2">
              {lead.excerpt}
            </p>
            <span className="mt-8 inline-flex w-fit items-center gap-1.5 rounded-[var(--radius-pill)] bg-surface px-4 py-2.5 text-sm font-medium text-accent-strong">
              Читать разбор
              <span
                aria-hidden
                className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </Spotlight>
        </Stagger>

        <Stagger className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Spotlight
              key={post.slug}
              as="article"
              className="group relative flex flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 transition-colors duration-300 hover:border-accent"
            >
              <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted">
                <span className="rounded-full bg-accent-soft px-3 py-1 font-semibold text-accent-strong">
                  {post.tag}
                </span>
                <time dateTime={post.date}>{post.dateLabel}</time>
              </div>
              <h3 className="font-display text-h3 leading-[1.25] font-bold tracking-[-0.03em]">
                <Link
                  prefetch={false}
                  href={`/blog/${post.slug}`}
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="mt-3 grow text-base leading-[1.6] text-ink-2">{post.excerpt}</p>
              <p className="mt-5 text-sm text-muted">
                {post.author} · {post.reading}
              </p>
            </Spotlight>
          ))}
        </Stagger>

        <DemoBadge text={DEMO_NOTICE} />
      </Section>

      <Footer />
    </>
  );
}
