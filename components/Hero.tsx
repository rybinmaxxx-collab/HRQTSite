import { Reveal, SplitTitle, Stagger } from "@/components/motion";
import { Button, Container, ContourMark } from "@/components/ui";
import { typo } from "@/lib/typo";
import { hero, marquee } from "@/content/site";

/**
 * Section 2 of the reference: the hero.
 *
 * Geometry from SECTION_MAP.md (репозиторий aura), taken from the served markup:
 * pt-16 pb-12, inner xl:px-26, centre-aligned — the only centred block on the
 * page. Размер H1 переехал на плавную шкалу --text-display: раньше он прыгал
 * с 2.5rem сразу на 4.25rem, и в промежутке между планшетом и ноутбуком
 * заголовок оказывался либо мелким, либо распирал колонку.
 *
 * Референс кладёт под герой скриншот продукта с отрицательным нижним отступом,
 * чтобы тот наезжал на следующий блок. Здесь этот приём убран, и он же был
 * источником главной поломки вёрстки: панель уезжала вверх на -7rem, а бегущая
 * строка компенсировала это своим pt-36. Стоило измениться высоте панели —
 * на любом промежуточном разрешении, где перестраивалась её сетка, — и два
 * числа переставали сходиться, блоки наезжали друг на друга. Наложения по
 * договорённости больше нет: панель просто стоит в потоке.
 */
export function Hero() {
  return (
    <div className="mt-[var(--h-nav)]">
      <Container className="relative pt-14 pb-12 md:pt-16">
        <div className="flex flex-col items-center px-0 xl:px-26">
          <SplitTitle
            as="h1"
            lead={hero.titleLead}
            accent={hero.titleAccent}
            tail={hero.titleTail}
            className="mb-6 text-center font-display text-display leading-[1.04] font-bold tracking-[-0.035em] text-balance"
          />

          <Reveal
            as="p"
            variant="rise"
            delay={240}
            className="mb-8 max-w-[800px] text-center text-lead leading-[1.7] font-normal tracking-[-0.01em] text-ink-2"
          >
            {typo(hero.lead)}
          </Reveal>

          <Reveal
            variant="rise"
            delay={340}
            className="mb-5 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4"
          >
            <Button href={hero.secondary.href} variant="secondary" className="justify-center">
              {hero.secondary.label}
            </Button>
            <Button href={hero.primary.href} className="justify-center">
              {hero.primary.label}
            </Button>
          </Reveal>

          <Reveal as="p" variant="fade" delay={460} className="text-sm text-muted">
            {hero.note}
          </Reveal>
        </div>

        <Reveal
          variant="aperture"
          delay={420}
          className="mx-auto mt-12 w-full rounded-[var(--radius-card)] border border-line bg-surface p-6 sm:p-8 md:mt-14 md:p-10"
        >
          <p className="mb-8 font-display text-lg font-bold tracking-[-0.02em] md:text-xl">
            {hero.panel.title}
          </p>
          <Stagger
            variant="rise"
            delay={520}
            className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {hero.panel.items.map((item) => (
              <div key={item.name} className="flex flex-col gap-3">
                <ContourMark size={40} />
                <p className="font-display text-base font-bold tracking-[-0.02em]">
                  {item.name}
                </p>
                <p className="text-sm leading-[1.6] text-muted">{item.note}</p>
              </div>
            ))}
          </Stagger>
        </Reveal>
      </Container>
    </div>
  );
}

/**
 * Section 3 of the reference: the marquee.
 *
 * Track holds the list twice so a -50% translate lands on the duplicate and
 * the loop is seamless; tiles are 12.5rem × 4.5rem with 0.625rem of padding;
 * both edges are masked by a 4rem fade.
 *
 * Компенсирующий pt-36 убран вместе с наложением панели — см. комментарий к
 * Hero. Добавлена остановка по наведению и по фокусу: непрерывное движение
 * должно уметь замирать, иначе прочитать бегущую строку с клавиатуры нельзя.
 * Дубль списка помечен aria-hidden, чтобы скринридер не читал его дважды.
 */
export function Marquee() {
  const track = [...marquee, ...marquee];
  return (
    <div className="marquee relative w-full overflow-hidden pt-6 pb-14 md:pb-16">
      <div className="marquee-fade" />
      <div className="animate-marquee relative z-0 flex w-fit">
        {track.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="flex h-[4.5rem] w-[9.5rem] shrink-0 items-center justify-center p-[0.625rem] sm:w-[12.5rem]"
            aria-hidden={i >= marquee.length}
          >
            <span className="font-display text-sm font-medium tracking-[-0.02em] whitespace-nowrap text-muted sm:text-base">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
