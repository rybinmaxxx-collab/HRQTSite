"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { Button, Container } from "@/components/ui";
import { nav } from "@/content/site";

/**
 * Section 1 of the reference: the fixed header.
 *
 * Geometry from SECTION_MAP.md (репозиторий aura): 5rem tall, white, z-index 9000,
 * transition-[top] duration-700. Mega-menu triggers sit centre; a quiet text
 * link and a filled pill sit right. The panel is full width and drops beneath
 * the bar as three columns of plain links under small uppercase headers.
 *
 * Link hover is the reference's own recipe — a pill drawn behind the label
 * via ::after with z-index -1, so the label never moves. It appears 213 times
 * in the served markup and is the reason a nav this dense feels calm.
 */
export function Header() {
  const [open, setOpen] = useState<number | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const panel = open === null ? null : nav.menus[open];

  return (
    <header
      className={`fixed top-0 z-[9000] w-full bg-surface transition-all duration-700 ease-in ${
        scrolled ? "border-b border-line" : "border-b border-transparent"
      }`}
      onMouseLeave={() => setOpen(null)}
    >
      <Container>
        <div className="flex h-[var(--h-nav)] items-center justify-between gap-8">
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
            aria-label="Меню"
            onClick={() => setMobile((v) => !v)}
            className="nav-pill cursor-pointer text-2xl leading-none lg:hidden"
          >
            {mobile ? "✕" : "☰"}
          </button>
        </div>
      </Container>

      {panel ? (
        <div className="hidden border-y border-line bg-surface lg:block">
          <Container>
            <div className="grid grid-cols-3 gap-x-8 gap-y-8 py-10">
              {panel.columns.map((col) => (
                <div key={col.title} className="flex flex-col gap-3">
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
        <div className="max-h-[calc(100vh-var(--h-nav))] overflow-y-auto border-y border-line bg-surface lg:hidden">
          <Container>
            <div className="flex flex-col gap-6 py-6">
              {nav.menus.map((menu) => (
                <div key={menu.label} className="flex flex-col gap-3">
                  <p className="text-[0.8125rem] font-semibold tracking-[0.08em] text-muted uppercase">
                    {menu.label}
                  </p>
                  {menu.columns.map((col) =>
                    col.links.map((link) => (
                      <Link
                        prefetch={false}
                        key={menu.label + col.title + link.label}
                        href={link.href}
                        onClick={() => setMobile(false)}
                        className="text-base"
                      >
                        {link.label}
                      </Link>
                    )),
                  )}
                </div>
              ))}
              <Button href={nav.cta.href} className="mt-2">
                {nav.cta.label}
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
