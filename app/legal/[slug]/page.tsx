import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { DemoBadge, PageHero } from "@/components/PageShell";
import { Reveal } from "@/components/motion";
import { Section } from "@/components/ui";
import { DEMO_NOTICE, findLegal, legalPages } from "@/content/pages";
import { typo } from "@/lib/typo";

/**
 * Правовые страницы: политика, согласие, cookie.
 *
 * Шаблон намеренно скучный — здесь ничего не должно отвлекать от текста.
 * Единственное движение — проявление абзацев; ни пятен света, ни волн по
 * сетке. Документ, который анимируется, читается как реклама.
 *
 * Ссылка на политику обязана быть на каждой странице сайта (ст. 18.1
 * 152-ФЗ), поэтому она стоит в подвале, а не на отдельной служебной странице.
 */
export function generateStaticParams() {
  return legalPages.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = findLegal(slug);
  if (!page) return { title: "Документ не найден" };
  return { title: page.title, description: page.lead };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = findLegal(slug);
  if (!page) notFound();

  const others = legalPages.filter((l) => l.slug !== slug);

  return (
    <>
      <PageHero
        eyebrow={page.updated}
        titleLead={page.title}
        lead={page.lead}
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Правовое", href: `/legal/${slug}` },
        ]}
      />

      <Section>
        <div className="max-w-[44rem]">
          {page.sections.map((section, i) => (
            <Reveal key={section.h} variant="rise" className={i === 0 ? "" : "mt-10"}>
              <h2 className="mb-4 font-display text-[clamp(1.125rem,2.2vw,1.5rem)] leading-[1.3] font-bold tracking-[-0.03em]">
                {typo(section.h)}
              </h2>
              <div className="flex flex-col gap-4">
                {section.p.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-base leading-[1.72] text-ink-2"
                  >
                    {typo(paragraph)}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}

          <DemoBadge text={DEMO_NOTICE} />

          <div className="mt-10 flex flex-wrap gap-3">
            {others.map((other) => (
              <Link
                prefetch={false}
                key={other.slug}
                href={`/legal/${other.slug}`}
                className="inline-flex min-h-[2.75rem] items-center rounded-[var(--radius-pill)] border border-line px-4 text-sm text-ink-2 transition-colors duration-300 hover:border-accent hover:text-accent-strong"
              >
                {other.title}
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Footer />
    </>
  );
}
