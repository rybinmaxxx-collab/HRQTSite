import { Footer } from "@/components/Footer";
import { Button, Container } from "@/components/ui";

/**
 * Only the homepage is built in this pass, so every inner route lands here.
 * It says so plainly rather than pretending the page is missing by accident.
 */
export default function NotFound() {
  return (
    <>
      <div className="brand-glow mt-[var(--h-nav)]">
        <Container className="flex flex-col items-start py-24 md:py-32">
          <p className="mb-4 text-[0.8125rem] font-semibold tracking-[0.08em] text-accent-strong uppercase">
            404
          </p>
          <h1 className="mb-6 max-w-[42rem] font-display text-[2rem] leading-[2.25rem] font-bold tracking-[-1px] md:text-[3.25rem] md:leading-[3.5rem] md:tracking-[-2px]">
            Этой страницы <strong>пока нет</strong>
          </h1>
          <p className="mb-8 max-w-[38rem] text-xl leading-[1.68] tracking-[-0.01em] text-ink-2">
            Собрана главная. Страницы услуг, «О нас» и контакты — следующий шаг:
            тексты для них уже готовы, шаблон один на все пять услуг.
          </p>
          <Button href="/">На главную</Button>
        </Container>
      </div>
      <Footer />
    </>
  );
}
