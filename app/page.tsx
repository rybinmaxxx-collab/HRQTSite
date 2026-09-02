import { Footer } from "@/components/Footer";
import { Hero, Marquee } from "@/components/Hero";
import { PackageCarousel } from "@/components/PackageCarousel";
import { Projects } from "@/components/Projects";
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
 * Раньше каждый раздел был обёрнут в общий контейнер появления. Обёртка ушла,
 * и на то две причины. Во-первых, она ломала ритм: секция внутри неё всегда
 * оказывалась первым ребёнком, срабатывал селектор first:pt-0, и верхний
 * отступ пропадал у всех разделов сразу — отсюда и налезающие друг на друга
 * блоки. Во-вторых, целая секция — слишком крупная единица движения: когда
 * экран занимает один блок, «появление» происходит уже после того, как
 * читатель на него посмотрел. Теперь каждый раздел анимирует себя изнутри:
 * заголовок собирается по словам, сетка открывается волной, текст всплывает.
 *
 * Герой намеренно почти без движения: он виден сразу, а анимировать первый
 * экран — значит задержать то, ради чего пришли.
 */
export default function Home() {
  return (
    <>
      <div className="brand-glow">
        <Hero />
        <Marquee />
      </div>

      <Services />
      <Statement />
      <Team />
      <Projects />
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
