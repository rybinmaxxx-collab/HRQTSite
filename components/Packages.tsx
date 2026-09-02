import { Reveal, Spotlight, Stagger } from "@/components/motion";
import { Button, Section, SectionTitle } from "@/components/ui";
import { closing, packages } from "@/content/site";

/**
 * Пакеты услуг — и закрывающий призыв страницы.
 *
 * Заменил вкладочную карусель, и вот чем она была плоха. Три кнопки-таба
 * переключали одну панель: в каждый момент читатель видел ровно треть
 * предложения, а чтобы узнать остальное — два клика. Сравнить варианты было
 * нельзя в принципе, потому что рядом никогда не оказывалось двух: панель
 * подменялась на месте. Заказчик поймал это верно — «опять лишние клики для
 * ознакомления с информацией».
 *
 * Здесь три колонки одинаковой структуры: надзаголовок, название, срок,
 * строка сути и три пункта состава. Одинаковая структура и есть механизм
 * сравнения — глаз ходит по строке, а не по вкладкам, и разница между
 * пакетами читается на одной высоте. Ниже lg колонки становятся стопкой, и
 * сравнение превращается в чтение подряд; средний пакет остаётся выделенным
 * заливкой, так что «чаще выбирают» видно и там.
 *
 * Кнопка стоит под каждым пакетом и ведёт на форму с уже выбранным пакетом в
 * параметре: выбор пакета и есть согласие оставить заявку, и разводить эти
 * два действия по разным экранам незачем. По той же причине сюда слит
 * закрывающий CTA страницы — раньше он занимал отдельную секцию во всю
 * высоту и повторял тот же призыв другими словами.
 *
 * Компонент серверный: с уходом вкладок исчезло единственное состояние, а с
 * ним и «use client» — раздел больше не тянет за собой JavaScript.
 */
export function Packages() {
  return (
    <Section id="packages">
      <SectionTitle
        lead={packages.titleLead}
        accent={packages.titleAccent}
        className="mb-6 max-w-[42.875rem]"
      />
      <Reveal
        as="p"
        variant="rise"
        delay={120}
        className="mb-12 max-w-[46rem] text-lead leading-[1.68] tracking-[-0.01em] text-ink-2"
      >
        {packages.lead}
      </Reveal>

      <Stagger className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        {packages.items.map((p) => {
          const featured = "featured" in p && p.featured;
          return (
            <Spotlight
              key={p.title}
              as="article"
              className={`flex flex-col rounded-[var(--radius-card)] p-8 md:p-10 ${
                featured
                  ? "bg-gradient-to-br from-accent to-accent-far text-white"
                  : "bg-soft"
              }`}
            >
              <p
                className={`text-[0.75rem] font-semibold tracking-[0.08em] uppercase ${
                  featured ? "text-white/75" : "text-accent-strong"
                }`}
              >
                {p.eyebrow}
              </p>

              <h3 className="mt-4 font-display text-[1.375rem] leading-[1.2] font-bold tracking-[-0.03em] md:text-[1.75rem]">
                {p.title}
              </h3>

              <p
                className={`mt-2 text-base font-medium ${
                  featured ? "text-white/85" : "text-accent-strong"
                }`}
              >
                {p.price}
              </p>

              <p
                className={`mt-5 text-base leading-[1.625] tracking-[-0.01em] ${
                  featured ? "text-white/90" : "text-ink-2"
                }`}
              >
                {p.body}
              </p>

              {/* Состав пакета — на делениях, той же волосяной линией, что и
                  дисциплины в разделе о команде. Маркеров-галочек нет
                  намеренно: три пункта из трёх «включены», и галочка у каждого
                  не сообщает ничего, кроме шума. */}
              <ul className="mt-6 mb-8 grow">
                {p.points.map((point) => (
                  <li
                    key={point}
                    className={`border-t py-3 text-base leading-[1.5] first:border-t-0 first:pt-0 ${
                      featured ? "border-white/20 text-white/90" : "border-ink/10 text-ink-2"
                    }`}
                  >
                    {point}
                  </li>
                ))}
              </ul>

              <Button
                href={p.cta.href}
                variant={featured ? "onInk" : "primary"}
                className="w-full"
              >
                {p.cta.label}
              </Button>
            </Spotlight>
          );
        })}
      </Stagger>

      {/* Бывшая закрывающая секция — теперь одна строка под карточками, для
          тех, кто не выбрал ни один пакет. */}
      <Reveal
        variant="rise"
        delay={160}
        className="mt-10 flex flex-col items-start justify-between gap-5 rounded-[var(--radius-card)] border border-line px-6 py-6 sm:flex-row sm:items-center md:px-8"
      >
        <p className="max-w-[38rem] text-base leading-[1.6] tracking-[-0.01em] text-ink-2 md:text-lg">
          {closing.text}
        </p>
        <Button href={closing.cta.href} variant="secondary" className="shrink-0">
          {closing.cta.label}
        </Button>
      </Reveal>
    </Section>
  );
}
