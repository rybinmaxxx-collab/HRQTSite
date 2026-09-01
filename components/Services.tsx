import Link from "next/link";
import { Section, SectionTitle } from "@/components/ui";
import { ServiceArt } from "@/components/ServiceArt";
import { services } from "@/content/site";

/**
 * Восемь направлений консалтинга.
 *
 * По ТЗ: 2 ряда по 4 карточки на десктопе, 2 колонки на планшете, стек на
 * мобильном. Карточка — рецепт из разведки: колодец с иллюстрацией на холодной
 * подложке, зум на ховере через 150 мс, заголовок с оверлеем-ссылкой на всю
 * карточку, тело, тихая пилюля.
 *
 * Раньше здесь была карусель вкладок на 5 услуг. Восемь направлений в неё уже
 * не помещаются, а ТЗ прямо просит сетку — карусель уступила ей место.
 */
export function Services() {
  return (
    <Section id="services">
      <SectionTitle lead={services.title} className="mb-6 max-w-[60rem]" />
      <p className="mb-12 max-w-[52rem] text-base leading-[1.68] tracking-[-0.01em] text-ink-2 md:text-xl">
        {services.lead}
      </p>

      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {services.items.map((item) => (
          <article key={item.href} className="group relative flex flex-col">
            <div className="mb-6 w-full overflow-hidden rounded-[var(--radius-card)] bg-soft">
              <div className="relative h-0 w-full pb-[62%]">
                <div className="absolute inset-0 transition-transform duration-200 ease-in-out group-hover:scale-[1.06] group-hover:delay-[var(--animation-delay-base)]">
                  <ServiceArt name={item.art} />
                </div>
              </div>
            </div>

            <h3 className="font-display text-lg leading-[1.25] font-bold tracking-[-0.02em]">
              <Link
                prefetch={false}
                href={item.href}
                className="block after:absolute after:inset-0 after:z-[1] after:content-['']"
              >
                {item.title}
              </Link>
            </h3>
            <p className="mt-[0.55em] grow text-base leading-[1.625] tracking-[-0.01em] text-ink-2">
              {item.body}
            </p>
            <span className="mt-5 w-fit rounded-[var(--radius-pill)] bg-accent-soft px-4 py-2 text-sm leading-5 font-medium text-accent-strong transition-all duration-300 ease-in-out group-hover:bg-line">
              Подробнее
            </span>
          </article>
        ))}
      </div>
    </Section>
  );
}
