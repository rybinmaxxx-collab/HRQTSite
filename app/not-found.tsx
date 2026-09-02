import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Reveal, SplitTitle } from "@/components/motion";
import { Button, Container } from "@/components/ui";
import { services } from "@/content/site";

/**
 * 404.
 *
 * Раньше страница честно сообщала, что собрана только главная. Это перестало
 * быть правдой: услуги, блог, «о компании», контакты и правовые документы
 * теперь есть. Поэтому вместо объяснения — навигация: пустая страница должна
 * быть приглашением к действию, а не сообщением об ошибке.
 */
export default function NotFound() {
  return (
    <>
      <div className="brand-glow pt-[var(--h-nav)]">
        <Container className="flex flex-col items-start py-20 md:py-28">
          <Reveal
            as="p"
            variant="fade"
            className="mb-4 text-[0.8125rem] font-semibold tracking-[0.08em] text-accent-strong uppercase"
          >
            404
          </Reveal>
          <SplitTitle
            as="h1"
            lead="Такой страницы "
            accent="здесь нет"
            className="mb-6 max-w-[42rem] font-display text-display leading-[1.06] font-bold tracking-[-0.035em]"
          />
          <Reveal
            as="p"
            variant="rise"
            delay={200}
            className="mb-8 max-w-[38rem] text-lead leading-[1.68] text-ink-2"
          >
            Возможно, адрес изменился. Ниже — направления, ради которых сюда обычно
            приходят.
          </Reveal>

          <Reveal variant="rise" delay={280} className="mb-12">
            <Button href="/">На главную</Button>
          </Reveal>

          <ul className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {services.items.slice(0, 4).map((item) => (
              <li key={item.href}>
                <Link
                  prefetch={false}
                  href={item.href}
                  className="group flex h-full min-h-[5.5rem] flex-col justify-between rounded-[var(--radius-card)] border border-line bg-surface p-5 transition-colors duration-300 hover:border-accent"
                >
                  <span className="font-display text-base leading-[1.3] font-bold tracking-[-0.02em]">
                    {item.title}
                  </span>
                  <span
                    aria-hidden
                    className="mt-4 text-accent-strong transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
      <Footer />
    </>
  );
}
