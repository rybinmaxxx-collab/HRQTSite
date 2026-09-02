import Link from "next/link";
import { Reveal, Spotlight, Stagger } from "@/components/motion";
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
 * Движение: сетка открывается волной от левого верхнего угла (шаг 60 мс,
 * восемь карточек укладываются в полсекунды), под курсором по карточке ходит
 * мягкое пятно света. Пятно — единственное, что здесь реагирует на наведение
 * помимо зума иллюстрации, и оно же связывает карточку с заголовком: оба
 * приёма про «контур, в который заглядывают».
 */
export function Services() {
  return (
    <Section id="services">
      <SectionTitle lead={services.title} className="mb-6 max-w-[60rem]" />
      <Reveal
        as="p"
        variant="rise"
        delay={120}
        className="mb-12 max-w-[52rem] text-lead leading-[1.68] tracking-[-0.01em] text-ink-2"
      >
        {services.lead}
      </Reveal>

      <Stagger className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {services.items.map((item) => (
          <Spotlight
            key={item.href}
            as="article"
            className="group relative flex flex-col rounded-[var(--radius-card)]"
          >
            <div className="mb-6 w-full overflow-hidden rounded-[var(--radius-card)] bg-soft">
              <div className="relative h-0 w-full pb-[62%]">
                <div className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]">
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
            <span className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-[var(--radius-pill)] bg-accent-soft px-4 py-2 text-sm leading-5 font-medium text-accent-strong transition-colors duration-300 ease-in-out group-hover:bg-line">
              Подробнее
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
