"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { easeOutExpo, prefersReducedMotion, splitWords, watch } from "@/lib/motion";
import { typo } from "@/lib/typo";

/**
 * Система движения «Контур» — компонентная часть.
 *
 * Пять приёмов, и все пять про одно: у HRQT единственный графический мотив —
 * обведённый контур с точкой внутри, поэтому и движение везде читается как
 * «контур раскрывается».
 *
 *   Reveal      — апертура: маска clip-path уходит вверх, содержимое проступает.
 *   Stagger     — та же апертура волной по сетке, задержка берётся из --mi.
 *   SplitTitle  — заголовок собирается по словам из-под нижней кромки строки.
 *   Counter     — цифра доезжает до значения, а не появляется готовой.
 *   Spotlight   — под курсором по карточке ходит мягкое пятно света.
 *
 * Кадры и тайминги — в app/globals.css, здесь только состояние. Каждый
 * компонент ставит data-in="true", когда блок вошёл в кадр; всё остальное
 * делает CSS. При prefers-reduced-motion правила движения не подключаются
 * вовсе — см. комментарий к html.js-motion в lib/motion.ts.
 */

type Variant = "aperture" | "rise" | "fade" | "scale";

interface RevealProps {
  children: ReactNode;
  /** Как именно появляется блок. По умолчанию — фирменная апертура. */
  variant?: Variant;
  /** Задержка в миллисекундах поверх собственной. */
  delay?: number;
  /** Тег обёртки. Списки просят ul/ol, сетки — div. */
  as?: ElementType;
  className?: string;
  /** Доля блока в кадре, после которой он считается показанным. */
  threshold?: number;
  style?: CSSProperties;
}

export function Reveal({
  children,
  variant = "aperture",
  delay = 0,
  as: Tag = "div",
  className = "",
  threshold,
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    return watch(node, threshold === undefined ? {} : { threshold });
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      data-motion={variant}
      data-in="false"
      style={{ ...style, "--md": `${delay}ms` } as CSSProperties}
      className={className}
    >
      {children}
    </Tag>
  );
}

/**
 * Волна по сетке: карточки проявляются не разом, а с шагом в 60 мс от левого
 * верхнего угла. Индекс уходит в CSS-переменную --mi, задержку считает CSS —
 * так React не держит в себе ни одного тайминга.
 *
 * Шаг 60 мс и не больше восьми элементов в волне — рекомендация из
 * ui-ux-pro-max (domain gsap, Stagger List / Standard): дальше хвост списка
 * начинает ощущаться подтормаживающим. Девятая и последующие карточки
 * получают задержку восьмой (см. .m-stagger в globals.css).
 */
export function Stagger({
  children,
  as: Tag = "div",
  className = "",
  variant = "aperture",
  delay = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  variant?: Variant;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    return watch(node, { threshold: 0.08 });
  }, []);

  return (
    <Tag
      ref={ref}
      data-motion-stagger={variant}
      data-in="false"
      style={{ "--md": `${delay}ms` } as CSSProperties}
      className={`m-stagger ${className}`}
    >
      {children}
    </Tag>
  );
}

/**
 * Заголовок, собирающийся по словам.
 *
 * Слова едут из-под нижней кромки собственной строки — маска сделана
 * overflow: hidden на обёртке слова. Отсюда padding-bottom в .m-word:
 * без него overflow срезает выносные элементы у «р», «у», «д».
 *
 * Градиент фирменного акцента навешен на внутренний span, а не на <strong>
 * снаружи, и это не стилистика. background-clip: text красит глифы своего
 * элемента; как только внутри появляется потомок с transform, он уезжает в
 * собственный слой, и заливка до него не достаёт — акцентные слова стали бы
 * невидимыми. Поэтому градиент едет вместе со словом.
 */
export function SplitTitle({
  lead,
  accent,
  tail,
  as: Tag = "h2",
  className = "",
}: {
  lead: string;
  accent?: string;
  tail?: string;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    return watch(node, { threshold: 0.2, rootMargin: "0px 0px -5% 0px" });
  }, []);

  const parts: { text: string; accent: boolean }[] = [
    { text: typo(lead), accent: false },
    ...(accent ? [{ text: typo(accent), accent: true }] : []),
    ...(tail ? [{ text: typo(tail), accent: false }] : []),
  ];

  // Счётчик сквозной по всем трём частям, иначе акцент стартует заново
  // и волна ломается ровно посередине заголовка.
  let index = 0;

  return (
    <Tag ref={ref} data-motion-words="" data-in="false" className={className}>
      {parts.map((part, partIndex) =>
        splitWords(part.text).map((word, wordIndex) => {
          const i = index++;
          return (
            // Пробел стоит СНАРУЖИ .m-word: внутри inline-block ему негде
            // сработать переносом, и заголовок перестаёт переноситься совсем.
            <Fragment key={`${partIndex}-${wordIndex}`}>
              <span className="m-word">
                <span
                  className={`m-word-in ${part.accent ? "m-word-accent" : ""}`}
                  style={{ "--mi": i } as CSSProperties}
                >
                  {word}
                </span>
              </span>{" "}
            </Fragment>
          );
        }),
      )}
    </Tag>
  );
}

/**
 * Счётчик.
 *
 * Разбирает строку вида «8+», «707», «95%», «5 рабочих дней»: анимируется
 * число, хвост остаётся текстом.
 *
 * Число обязано стоять в начале строки — иначе компонент не трогает её вовсе.
 * Правило появилось из-за строк вроде «WebSoft · 1С · ИИ»: жадный разбор
 * находил там единицу внутри «1С» и на первом кадре показывал «WebSoft · 0С».
 * Считать имеет смысл только то, что и читается как величина.
 *
 * Кадры считает requestAnimationFrame, а не setInterval: тик, привязанный ко
 * времени, а не к счётчику вызовов, доезжает до конечного значения ровно за
 * заданный срок на любом железе.
 */
export function Counter({ value, className = "" }: { value: string; className?: string }) {
  const match = value.match(/^(\d+(?:[  ]\d{3})*)(\D.*)?$/);
  const target = match ? Number(match[1].replace(/[\s ]/g, "")) : 0;
  const suffix = match?.[2] ?? "";

  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  // Начальное состояние — конечное число. Так серверная разметка совпадает с
  // первым клиентским рендером, и в ней стоит настоящее значение: если скрипт
  // не доедет, читатель увидит «8+», а не «0+».
  const [shown, setShown] = useState(target);

  useEffect(() => {
    const node = ref.current;
    if (!node || !match || started.current || prefersReducedMotion()) return;

    setShown(0);

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || started.current) return;
        started.current = true;
        observer.disconnect();

        const duration = 1100;
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          setShown(Math.round(target * easeOutExpo(t)));
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
    // Зависимость — число, а не результат match: массив от match новый на
    // каждом рендере, из-за чего эффект перезапускался при любой перерисовке,
    // сбрасывал счётчик в ноль, а стартовать заново ему уже не давал флаг
    // started. Так вкладка «Экспресс-аудит» и застревала на «0 рабочих дней».
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  if (!match) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      <span className="tabular-nums">{shown.toLocaleString("ru-RU")}</span>
      {suffix}
    </span>
  );
}

/**
 * Пятно света под курсором.
 *
 * Координаты уезжают в --mx/--my, рисует пятно псевдоэлемент в CSS. React при
 * движении мыши не перерисовывается вовсе: обработчик пишет прямо в style
 * узла, минуя состояние — иначе каждое движение мыши стоило бы рендера
 * поддерева.
 *
 * На тач-устройствах события pointermove не приходит, и это правильно: пятно
 * там ничего не сообщает, а ховера нет. Вся полезная информация карточки
 * доступна без него.
 */
export function Spotlight({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const node = ref.current;
    if (!node || e.pointerType === "touch") return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    node.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <Tag ref={ref} onPointerMove={onMove} className={`m-spot ${className}`}>
      {children}
    </Tag>
  );
}

/**
 * Полоса прогресса чтения в шапке.
 *
 * Считается на scroll и пишется в CSS-переменную. transform: scaleX дешевле
 * width: он не вызывает раскладку, а значит полоса не дёргается на длинной
 * странице даже на слабом устройстве.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      node.style.setProperty("--mp", String(ratio));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return <div ref={ref} aria-hidden className="m-progress" />;
}
