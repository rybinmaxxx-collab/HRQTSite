import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { DemoBadge, PageHero } from "@/components/PageShell";
import { Reveal, Spotlight, Stagger } from "@/components/motion";
import { Button, Section, SectionTitle } from "@/components/ui";
import { DEMO_NOTICE, blogPosts, findPost } from "@/content/pages";
import { typo } from "@/lib/typo";

/**
 * Статья.
 *
 * Ширина текстовой колонки — 40rem, около 75 знаков в строке. Это не
 * стилистическое предпочтение: на более длинной строке глаз теряет начало
 * следующей, и длинный разбор дочитывают хуже.
 *
 * Заголовки внутри статьи — h2, потому что h1 уже занят названием. Уровни
 * идут подряд, без пропусков: навигация по заголовкам в скринридере — это
 * оглавление, и дыра в нумерации ломает его.
 */
export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return { title: "Материал не найден" };
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();

  const others = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={post.tag}
        titleLead={post.title}
        lead={post.lead}
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Блог", href: "/blog" },
          { label: post.tag, href: "/blog" },
        ]}
      >
        <Reveal
          variant="fade"
          delay={280}
          className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted"
        >
          <span className="font-medium text-ink-2">{post.author}</span>
          <time dateTime={post.date}>{post.dateLabel}</time>
          <span>{post.reading}</span>
        </Reveal>
      </PageHero>

      <Section>
        <article className="max-w-[40rem]">
          {post.body.map((block, i) => (
            <Reveal
              key={block.h ?? `block-${i}`}
              variant="rise"
              className={i === 0 ? "" : "mt-10"}
            >
              {block.h ? (
                <h2 className="mb-4 font-display text-[clamp(1.25rem,2.4vw,1.625rem)] leading-[1.25] font-bold tracking-[-0.03em]">
                  {typo(block.h)}
                </h2>
              ) : null}
              <div className="flex flex-col gap-4">
                {block.p.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-[1.0625rem] leading-[1.72] tracking-[-0.005em] text-ink-2"
                  >
                    {typo(paragraph)}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}

          <DemoBadge text={DEMO_NOTICE} />
        </article>
      </Section>

      <Section tone="soft">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle lead="Что ещё почитать" className="max-w-[36rem]" />
          <Button href="/blog" variant="tertiary">
            Все материалы
          </Button>
        </div>
        <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {others.map((other) => (
            <Spotlight
              key={other.slug}
              as="article"
              className="group relative flex flex-col rounded-[var(--radius-card)] bg-surface p-6"
            >
              <span className="mb-4 w-fit rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-strong">
                {other.tag}
              </span>
              <h3 className="font-display text-lg leading-[1.25] font-bold tracking-[-0.02em]">
                <Link
                  prefetch={false}
                  href={`/blog/${other.slug}`}
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  {other.title}
                </Link>
              </h3>
              <p className="mt-3 grow text-base leading-[1.6] text-ink-2">{other.excerpt}</p>
              <p className="mt-5 text-sm text-muted">{other.reading}</p>
            </Spotlight>
          ))}
        </Stagger>
      </Section>

      {/* Закрывающий призыв берёт на себя подвал — он и так стоит сразу
          следом. Второй такой же блок читается как навязчивость. */}
      <Footer />
    </>
  );
}
