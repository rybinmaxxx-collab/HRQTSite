import { Reveal, Stagger } from "@/components/motion";
import { Button, Section, SectionTitle } from "@/components/ui";
import { team } from "@/content/site";

/**
 * Раздел «О команде HRQT».
 *
 * Что здесь было и почему ушло. Слева стояли четыре абзаца с кнопкой «читать
 * полностью», справа — белая плита с тремя счётчиками: «8+», «8», «1».
 * Заказчик снял обе половины разом: «перегруз по тексту и недосказанность в
 * цифрах».
 *
 * Цифры действительно не работали. Счётчик набирает вес тем, что измеряет
 * результат, а «8 направлений консалтинга» — это оглавление соседнего
 * раздела, набранное сорок вторым кеглем. Крупный шрифт обещал факт, а
 * сообщал лозунг, и читатель справедливо не понимал, что с этим делать.
 *
 * Замена — деления. Четыре дисциплины, разделённые волосяными линиями:
 * состав команды виден так же быстро, как читалась колонка цифр, но каждая
 * строка что-то сообщает. Линия здесь несёт ту же работу, что рамка карточки,
 * и не добавляет ни фона, ни тени — раздел и без того стоит на цветной
 * подложке.
 *
 * Кнопки «читать полностью» нет: она разворачивала текст прямо в разделе, то
 * есть требовала клика ради того, что и так можно прочесть на /about. Полная
 * версия там, ссылка ведёт туда же.
 */
export function Team() {
  return (
    <Section id="team" tone="tint">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-[calc(var(--h-nav)+2rem)] lg:self-start">
          <SectionTitle lead={team.title} className="mb-6" />

          <div className="flex flex-col gap-4">
            {team.lead.map((para, i) => (
              <Reveal
                key={para.slice(0, 24)}
                as="p"
                variant="rise"
                delay={80 + i * 80}
                className="max-w-[34rem] text-base leading-[1.68] tracking-[-0.01em] text-ink-2 md:text-lg"
              >
                {para}
              </Reveal>
            ))}
          </div>

          <Reveal variant="rise" delay={240} className="mt-8">
            <Button href={team.action.href} variant="secondary">
              {team.action.label}
            </Button>
          </Reveal>
        </div>

        {/* Деления вместо плиты со счётчиками: первая строка без верхней
            линии, дальше каждая отделена сверху — так список читается как
            перечень, а не как таблица. */}
        <Stagger as="dl" variant="rise" className="flex flex-col lg:pt-2">
          {team.disciplines.map((d) => (
            <div
              key={d.title}
              className="border-t border-ink/10 py-5 first:border-t-0 first:pt-0 md:py-6"
            >
              <dt className="font-display text-lg font-bold tracking-[-0.02em] md:text-[1.375rem]">
                {d.title}
              </dt>
              <dd className="mt-1.5 text-base leading-[1.6] tracking-[-0.01em] text-ink-2">
                {d.body}
              </dd>
            </div>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
