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
  title: `${brand.name} — ${brand.descriptor}`,
  description:
    "Дорабатываем WebSoft HCM и 1С под ваши процессы, внедряем локальные ИИ-агенты и держим архитектуру под контролем. Один ответственный за весь контур.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${onest.variable} ${inter.variable}`}>
      <body>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
