import { Footer } from "@/components/Footer";
import { Hero, Marquee } from "@/components/Hero";
import { PackageCarousel } from "@/components/PackageCarousel";
import { Projects } from "@/components/Projects";
import { Reveal } from "@/components/Reveal";
import { Services } from "@/components/Services";
import { Team } from "@/components/Team";
import { Audiences, Faq, Process, Proof, Security, Statement } from "@/components/sections";

/**
 * Главная.
 *
 * Композиция снята с beamery.com посекционно (SECTION_MAP.md, репозиторий
 * aura), контент — HRQT. По ТЗ добавлены разделы команды и проектов, а сетка
 * услуг расширена с пяти до восьми направлений.
 *
 * Порядок выстроен по воронке: чем занимаемся → кто мы → чем докажем →
 * с кем говорим → как работаем → сколько стоит → что осталось спросить.
 *
 * Герой намеренно без Reveal: он виден сразу, анимировать первый экран —
 * значит задержать то, ради чего пришли.
 */
export default function Home() {
  return (
    <>
      <div className="brand-glow">
        <Hero />
        <Marquee />
      </div>

      <Reveal>
        <Services />
      </Reveal>
      <Reveal>
        <Statement />
      </Reveal>
      <Reveal>
        <Team />
      </Reveal>
      <Reveal>
        <Projects />
      </Reveal>
      <Reveal>
        <Audiences />
      </Reveal>
      <Reveal>
        <Proof />
      </Reveal>
      <Reveal>
        <PackageCarousel />
      </Reveal>
      <Reveal>
        <Security />
      </Reveal>
      <Reveal>
        <Process />
      </Reveal>
      <Reveal>
        <Faq />
      </Reveal>
      <Footer />
    </>
  );
}
