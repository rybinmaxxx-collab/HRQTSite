"use client";

import { useState } from "react";
import { Button, ContourMark, Section } from "@/components/ui";
import { platform } from "@/content/site";

/**
 * Section 4 of the reference: the platform tab carousel.
 *
 * Geometry from SECTION_MAP.md (репозиторий aura): centred h2 at 2rem → 3rem with
 * -1px → -2px tracking and a 60rem measure; a pill tab rail beneath it; then
 * a two-column panel, copy left and visual right, with 5rem side padding.
 *
 * The reference removes inactive panels from flow entirely rather than
 * fading them — the recon measured them at y=0 h=0 at all three widths — so
 * only the active panel is rendered here too.
 */
export function PlatformTabs() {
  const [active, setActive] = useState(0);
  const panel = platform.tabs[active];

  return (
    <Section id="services">
      <h2 className="mx-auto mb-8 max-w-[60rem] text-center font-display text-[2rem] leading-[2.25rem] font-bold tracking-[-1px] text-balance lg:text-[3rem] lg:leading-[3.5rem] lg:tracking-[-2px]">
        {platform.title}
      </h2>

      {/* Pill tab rail, centred, scrolling sideways rather than wrapping. */}
      <div
        role="tablist"
        aria-label="Услуги"
        className="mb-12 flex justify-start gap-2 overflow-x-auto pb-2 lg:justify-center"
      >
        {platform.tabs.map((t, i) => (
          <button
            key={t.tab}
            role="tab"
            type="button"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`shrink-0 cursor-pointer rounded-full px-4 py-2 text-base leading-5 font-medium transition-all duration-300 ease-in-out ${
              i === active
                ? "bg-accent-soft text-accent-strong"
                : "text-ink-2 hover:bg-soft"
            }`}
          >
            {t.tab}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16 lg:px-20"
      >
        <div>
          <p className="mb-4 text-[0.8125rem] font-semibold tracking-[0.08em] text-accent-strong uppercase">
            {panel.eyebrow}
          </p>
          <h3 className="mb-4 font-display text-[2rem] leading-[1.09] font-bold tracking-[-1.4px] lg:text-[2.5rem]">
            {panel.title}
          </h3>
          <p className="mb-6 text-base leading-[1.625] tracking-[-0.01em] text-ink-2">
            {panel.body}
          </p>
          <ul className="mb-8 flex flex-col gap-2">
            {panel.points.map((p) => (
              <li key={p} className="flex gap-3 text-base leading-[1.625] text-ink-2">
                <span
                  aria-hidden
                  className="mt-[0.6em] block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                />
                {p}
              </li>
            ))}
          </ul>
          <Button href={panel.cta.href}>{panel.cta.label}</Button>
        </div>

        {/* Product visual in the reference. HRQT has no screenshot yet, so the
            well holds the brand mark; the frame and proportions are the same. */}
        <div className="w-full overflow-hidden rounded-[var(--radius-card)] bg-soft">
          <div className="relative h-0 w-full pb-[70%]">
            <div className="absolute inset-0 flex items-center justify-center">
              <ContourMark size={72} />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
