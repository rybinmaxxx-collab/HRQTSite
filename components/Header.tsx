"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { ScrollProgress } from "@/components/motion";
import { Button, Container } from "@/components/ui";
import { nav } from "@/content/site";

/**
 * Section 1 of the reference: the fixed header.
 *
 * Geometry from SECTION_MAP.md (репозиторий aura): 5rem tall, white, z-index 9000.
 * Mega-menu triggers sit centre; a quiet text link and a filled pill sit right.
 * The panel is full width and drops beneath the bar as three columns.
 *
 * Link hover is the reference's own recipe — a pill drawn behind the label
 * via ::after with z-index -1, so the label never moves. It appears 213 times
 * in the served markup and is the reason a nav this dense feels calm.
 *
 * Что добавлено системой движения:
 *   • шапка уезжает вверх при прокрутке вниз и возвращается при малейшем
 *     движении вверх — на мобильном это отдаёт контенту 5rem экрана, но
 *     оставляет меню в одном движении пальца;
 *   • полоса прогресса чтения по нижней кромке — она же служит индикатором
 *     того, что страница длинная;
 *   • панель мега-меню раскрывается апертурой, той же, что и блоки страницы.
 *
 * Порог в 6px перед реакцией на направление — не придирка: без него инерционная
 * прокрутка на трекпаде и в iOS дёргает шапку туда-сюда на каждом кадре.
 */
export function Header() {
  const [open, setOpen] = useState<number | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      setScrolled(y > 8);

      if (Math.abs(delta) > 6) {
        // Меню и открытая панель держат шапку на месте: убрать из-под пальца
        // то, чем он прямо сейчас пользуется, — худшее, что может сделать
        // «умная» шапка.
        setHidden(delta > 0 && y > 240 && !mobile && open === null);
        lastY.current = y;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobile, open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Фон под открытым ящиком меню не должен прокручиваться: иначе палец,
  // промахнувшийся мимо ссылки, уезжает по странице под меню.
  useEffect(() => {
    if (!mobile) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobile]);

  const panel = open === null ? null : nav.menus[open];

  return (
    <header
      data-hidden={hidden}
      className={`m-header fixed top-0 z-[9000] w-full transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-surface/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
      onMouseLeave={() => setOpen(null)}
    >
      <Container>
        <div className="flex h-[var(--h-nav)] items-center justify-between gap-6">
          <Logo />

          <nav className="hidden items-center gap-8 lg:flex">
            {nav.menus.map((menu, i) => (
              <button
                key={menu.label}
                type="button"
                aria-expanded={open === i}
                onMouseEnter={() => setOpen(i)}
                onClick={() => setOpen((v) => (v === i ? null : i))}
                className="nav-pill cursor-pointer text-base font-medium hover:text-accent-strong"
              >
                {menu.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <Link
              prefetch={false}
              href={nav.quiet.href}
              className="nav-pill text-base font-medium hover:text-accent-strong"
            >
              {nav.quiet.label}
            </Link>
            <Button href={nav.cta.href}>{nav.cta.label}</Button>
          </div>

          <button
            type="button"
            aria-expanded={mobile}
            aria-controls="mobile-nav"
            aria-label={mobile ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setMobile((v) => !v)}
            className="nav-pill -mr-1 flex h-11 w-11 cursor-pointer items-center justify-center text-2xl leading-none lg:hidden"
          >
            {mobile ? "✕" : "☰"}
          </button>
        </div>
      </Container>

      {panel ? (
        <div className="m-menu hidden border-y border-line bg-surface lg:block">
          <Container>
            <div className="grid grid-cols-3 gap-x-8 gap-y-8 py-10">
              {panel.columns.map((col) => (
                <div key={col.title} className="m-menu-item flex flex-col gap-3">
                  <p className="text-[0.8125rem] font-semibold tracking-[0.08em] text-muted uppercase">
                    {col.title}
                  </p>
                  {col.links.map((link) => (
                    <Link
                      prefetch={false}
                      key={col.title + link.label}
                      href={link.href}
                      onClick={() => setOpen(null)}
                      className="nav-pill w-fit text-base hover:text-accent-strong"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </Container>
        </div>
      ) : null}

      {/* Mobile drawer. The reference collapses the same menus into a list. */}
      {mobile ? (
        <div
          id="mobile-nav"
          className="m-menu max-h-[calc(100dvh-var(--h-nav))] overflow-y-auto overscroll-contain border-y border-line bg-surface lg:hidden"
        >
          <Container>
            <div className="flex flex-col gap-7 py-6 pb-10">
              {nav.menus.map((menu) => (
                <div key={menu.label} className="m-menu-item flex flex-col gap-1">
                  <p className="mb-1 text-[0.8125rem] font-semibold tracking-[0.08em] text-muted uppercase">
                    {menu.label}
                  </p>
                  {menu.columns.map((col) =>
                    col.links.map((link) => (
                      <Link
                        prefetch={false}
                        key={menu.label + col.title + link.label}
                        href={link.href}
                        onClick={() => setMobile(false)}
                        className="flex min-h-[2.75rem] items-center text-base"
                      >
                        {link.label}
                      </Link>
                    )),
                  )}
                </div>
              ))}
              <Button href={nav.cta.href} className="mt-1">
                {nav.cta.label}
              </Button>
            </div>
          </Container>
        </div>
      ) : null}

      <ScrollProgress />
    </header>
  );
}
