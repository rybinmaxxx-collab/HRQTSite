import { Footer } from "@/components/Footer";
import { Hero, Marquee } from "@/components/Hero";
import { PackageCarousel } from "@/components/PackageCarousel";
import { PlatformTabs } from "@/components/PlatformTabs";
import {
  Audiences,
  Faq,
  Process,
  Proof,
  Security,
  Statement,
} from "@/components/sections";

/**
 * Главная.
 *
 * Порядок и геометрия блоков — с beamery.com, секция в секцию
 * (SECTION_MAP.md, репозиторий aura). Контент — HRQT.
 *
 *   1 Шапка с мега-меню          → components/Header.tsx (в layout)
 *   2 Герой + перекрывающая медиа → Hero
 *   3 Бегущая строка              → Marquee
 *   4 Карусель вкладок платформы  → PlatformTabs (5 услуг)
 *   5 Полоса-подложка с цитатой   → Statement (высказывание основателя)
 *   6 Сетка карточек аудиторий    → Audiences (карта ЛПР)
 *   7 Две карточки на подложке    → Proof (дифференциаторы)
 *   8 Карусель с тёмной панелью   → PackageCarousel (три пакета)
 *   9 Подвал с закрывающим CTA    → Footer
 *
 * Между 8 и 9 добавлены два блока, которых у референса нет, но которые
 * требует шаблон главной HRQT (Фаза 3): тёмная секция безопасности и FAQ.
 * Оба свёрстаны в идиоме референса.
 */
export default function Home() {
  return (
    <>
      {/* Hero and the marquee share one glow, exactly as the reference shares
          one background raster across both. */}
      <div className="brand-glow">
        <Hero />
        <Marquee />
      </div>
      <PlatformTabs />
      <Statement />
      <Audiences />
      <Proof />
      <PackageCarousel />
      <Security />
      <Process />
      <Faq />
      <Footer />
    </>
  );
}
