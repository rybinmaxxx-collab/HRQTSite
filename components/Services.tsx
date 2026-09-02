import Link from "next/link";
import { Reveal, Spotlight, Stagger } from "@/components/motion";
import { Button, HeadingRow, Section, SectionTitle } from "@/components/ui";
import { ServiceArt } from "@/components/ServiceArt";
import { services } from "@/content/site";

/**
 * Направления консалтинга.
 *
 * Карточка — рецепт из разведки: колодец с иллюстрацией на холодной подложке,
 * зум на ховере, заголовок с оверлеем-ссылкой на всю карточку, тело, тихая
 * пилюля.
 *
 * Сетка вынесена в отдельный компонент, потому что у неё два потребителя:
 * главная показывает первые шесть направлений, страница /services — все
 * восемь. Заказчик снял с главной седьмую и восьмую карточки — «выглядит
 * сочно, но надо остановиться на шести», — и ряды по три вместо четырёх дали
 * карточке ширину, на которой заголовки перестали ломаться в три строки.
 *
 * Движение: сетка открывается волной от левого верхнего угла, под курсором по
 * карточке ходит мягкое пятно света. Пятно — единственное, что здесь
 * реагирует на наведение помимо зума иллюстрации, и оно же связывает карточку
 * с заголовком: оба приёма про «контур, в который заглядывают».
 */
export function ServiceGrid({ items }: { items: readonly (typeof services.items)[number][] }) {
  return (
    <Stagger className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
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
  );
}

/** Раздел услуг на главной: шесть направлений и выход на страницу со всеми. */
export function Services() {
  return (
    <Section id="services">
      <HeadingRow
        action={
          <Button href={services.action.href} variant="tertiary">
            {services.action.label}
          </Button>
        }
      >
        <SectionTitle lead={services.title} className="max-w-[60rem]" />
      </HeadingRow>
      <Reveal
        as="p"
        variant="rise"
        delay={120}
        className="mb-12 max-w-[52rem] text-lead leading-[1.68] tracking-[-0.01em] text-ink-2"
      >
        {services.lead}
      </Reveal>

      <ServiceGrid items={services.items.slice(0, services.landingCount)} />
    </Section>
  );
}
