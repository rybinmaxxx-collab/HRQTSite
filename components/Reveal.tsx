"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Появление блока при скролле.
 *
 * Цель ТЗ — «премиальные моушн-эффекты без потери производительности».
 * Подробная спека моушна была в той части файла, которая пришла обрезанной,
 * поэтому здесь сделано сдержанно и без библиотеки: IntersectionObserver плюс
 * два CSS-свойства. Framer Motion не подключён — он потянул бы ~30 КБ рантайма
 * ради эффекта, который делают две строки CSS.
 *
 * Референс, с которого снята композиция, не анимирует при скролле вообще —
 * это было одним из выводов разведки. Поэтому движение здесь минимальное:
 * лёгкий подъём и проявление, один раз, без параллакса и без скраба.
 *
 * prefers-reduced-motion отключает эффект целиком — блок просто виден.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Если анимации не нужны — показываем сразу и наблюдатель не создаём.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-shown={shown}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${className}`}
    >
      {children}
    </div>
  );
}
