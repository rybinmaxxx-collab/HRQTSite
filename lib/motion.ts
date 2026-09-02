/**
 * Ядро системы движения «Контур».
 *
 * Одна идея на весь сайт: у HRQT единственный графический мотив — обведённый
 * контур с точкой внутри. Поэтому блоки не «выезжают снизу», как в прошлых
 * проектах, а раскрываются апертурой: контур сначала прочерчивается, затем
 * содержимое проступает изнутри маски. Ниже — только механика; сами кадры
 * описаны в app/globals.css, в секции MOTION SYSTEM.
 *
 * Почему без библиотеки. GSAP + ScrollTrigger — это ~50 КБ рантайма и вторая
 * система координат поверх CSS. Здесь всё движение выражается двумя
 * свойствами (transform, opacity) и одним clip-path, а роль JS сведена к
 * одному: поставить элементу data-in="true", когда он вошёл в кадр. Такой
 * рантайм — три десятка строк и один общий IntersectionObserver на всю
 * страницу вместо наблюдателя на каждый блок.
 *
 * Доступность и SEO. Правила, которые прячут элемент до появления, живут под
 * селектором html.js-motion. Класс ставится инлайновым скриптом в <head> и
 * только если пользователь не просил убрать анимации. Значит: без JS,
 * при ошибке загрузки и при prefers-reduced-motion страница отдаётся в
 * финальном состоянии, а не пустой — краулер и скринридер видят текст всегда.
 */

/** Ключ реестра: у наблюдателей с одинаковыми параметрами общий экземпляр. */
type Key = string;

const observers = new Map<Key, IntersectionObserver>();

export interface WatchOptions {
  /** Доля элемента в кадре, после которой он считается показанным. */
  threshold?: number;
  /** Насколько раньше нижней кромки экрана срабатывать. */
  rootMargin?: string;
  /** Повторять ли анимацию при обратном скролле. По умолчанию — нет. */
  repeat?: boolean;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getObserver(threshold: number, rootMargin: string, repeat: boolean) {
  const key: Key = `${threshold}|${rootMargin}|${repeat}`;
  const existing = observers.get(key);
  if (existing) return existing;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          el.dataset.in = "true";
          if (!repeat) observer.unobserve(el);
        } else if (repeat) {
          el.dataset.in = "false";
        }
      }
    },
    { threshold, rootMargin },
  );

  observers.set(key, observer);
  return observer;
}

/**
 * Поставить элемент под наблюдение. Возвращает функцию отписки.
 *
 * Если движение отключено или окружение без IntersectionObserver — элемент
 * сразу помечается показанным, наблюдатель не создаётся вовсе.
 */
export function watch(node: HTMLElement, options: WatchOptions = {}): () => void {
  const { threshold = 0.12, rootMargin = "0px 0px -10% 0px", repeat = false } = options;

  if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
    node.dataset.in = "true";
    return () => {};
  }

  const observer = getObserver(threshold, rootMargin, repeat);
  observer.observe(node);
  return () => observer.unobserve(node);
}

/**
 * Разбивка строки на слова для маскированного появления заголовка.
 *
 * Возвращает слова без пробелов — пробел компонент вставляет отдельным
 * текстовым узлом. Иначе он оказывается внутри inline-block и браузеру негде
 * перенести строку.
 *
 * Режем строго по обычному пробелу. Неразрывные, которые расставляет
 * lib/typo.ts, границей слова не считаются: «в контуре» должно ехать одним
 * куском — ради этого их туда и поставили.
 */
export function splitWords(text: string): string[] {
  return text.split(" ").filter((w) => w.length > 0);
}

/**
 * Плавность для счётчиков: быстрый старт, длинный докат. Число должно
 * «долетать» до конечного значения, а не подползать к нему.
 */
export function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}
