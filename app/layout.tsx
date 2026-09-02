import type { Metadata } from "next";
import { Inter, Onest } from "next/font/google";
import { Header } from "@/components/Header";
import { brand } from "@/content/site";
import "./globals.css";

/*
 * Onest for display, Inter for text — both with Cyrillic subsets, which is
 * what ruled out the recon's Space Grotesk suggestion (Latin only).
 */
const onest = Onest({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "700"],
  variable: "--font-onest",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${brand.name} — ${brand.descriptor}`,
    template: `%s — ${brand.name}`,
  },
  description:
    "Дорабатываем WebSoft HCM и 1С под ваши процессы, внедряем локальные ИИ-агенты и держим архитектуру под контролем. Один ответственный за весь контур.",
};

/**
 * Включатель системы движения.
 *
 * Ставит на <html> класс js-motion — и только под ним в globals.css живут
 * правила, прячущие блоки до появления. Порядок здесь важен: скрипт стоит в
 * <head> и выполняется до первой отрисовки, иначе на кадр-другой мелькнёт
 * готовая страница, которая тут же схлопнется в скрытое состояние.
 *
 * Проверка prefers-reduced-motion — здесь же, а не в CSS: у того, кто просил
 * не анимировать, движковых правил не появляется вовсе, вместо того чтобы
 * потом отменять их каскадом.
 */
const MOTION_BOOT = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('js-motion')}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${onest.variable} ${inter.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOT }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          К содержимому
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
