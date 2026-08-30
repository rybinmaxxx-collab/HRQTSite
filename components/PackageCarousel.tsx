"use client";

import { useState } from "react";
import { Button, HeadingRow, Section, SectionTitle } from "@/components/ui";
import { packages } from "@/content/site";

/**
 * Section 8 of the reference: the case-study carousel.
 *
 * Geometry from SECTION_MAP.md (репозиторий aura): heading left with two buttons
 * right; a slide of two panels — a gradient-filled dark panel carrying three
 * stat columns, a light-weight pull quote and an attribution, beside a white
 * panel with an uppercase tag row, a 22px→1.875rem heading, body and a quiet
 * CTA; a selector strip beneath, the active item underlined in the accent.
 *
 * The reference fills it with customer case studies. HRQT has none it may
 * publish under the Фаза 1 NDA framing, so the same component carries the
 * three work formats — which is what a visitor is actually choosing between.
 */
export function PackageCarousel() {
  const [active, setActive] = useState(1);
  const item = packages.items[active];

  return (
    <Section id="packages">
      <HeadingRow
        action={
          <div className="flex flex-wrap gap-3">
            {packages.actions.map((a) => (
              <Button key={a.href + a.label} href={a.href} variant={a.variant}>
                {a.label}
              </Button>
            ))}
          </div>
        }
      >
        <SectionTitle
          lead={packages.titleLead}
          accent={packages.titleAccent}
          className="max-w-[42.875rem]"
        />
      </HeadingRow>

      <div className="mt-12 grid grid-cols-1 overflow-hidden rounded-[var(--radius-card)] lg:grid-cols-2">
        {/* Left: the dark gradient panel. */}
        <div className="flex flex-col justify-between gap-10 bg-gradient-to-br from-accent to-accent-far p-8 text-white md:p-12">
          <dl className="grid grid-cols-3 gap-4">
            {item.stats.map((s) => (
              <div key={s.label}>
                <dt className="text-[0.8125rem] font-semibold tracking-[0.08em] text-white/70 uppercase">
                  {s.label}
                </dt>
                <dd className="mt-2 font-display text-base font-bold tracking-[-0.02em]">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="text-[1.375rem] leading-[1.4] font-light tracking-[-0.02em]">
            {item.pull}
          </p>
        </div>

        {/* Right: the story panel. */}
        <div className="flex flex-col bg-soft p-8 md:p-12">
          <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2">
            {item.tags.map((t) => (
              <span
                key={t}
                className="text-[0.8125rem] font-semibold tracking-[0.08em] text-accent-strong uppercase"
              >
                {t}
              </span>
            ))}
          </div>
          <h3 className="mb-4 font-display text-[22px] leading-[1.25] font-bold tracking-[-0.033em] md:text-3xl">
            {item.title}
          </h3>
          <p className="mb-8 grow text-base leading-[1.625] tracking-[-0.01em] text-ink-2">
            {item.body}
          </p>
          <Button href={item.cta.href} variant="secondary">
            {item.cta.label}
          </Button>
        </div>
      </div>

      {/* Selector strip. The reference uses customer logos; these are names. */}
      <div className="mt-8 flex flex-wrap justify-center gap-x-10 gap-y-4">
        {packages.items.map((p, i) => (
          <button
            key={p.tab}
            type="button"
            aria-pressed={i === active}
            onClick={() => setActive(i)}
            className={`cursor-pointer border-b-2 pb-2 font-display text-base font-medium tracking-[-0.02em] transition-colors duration-300 ease-in-out ${
              i === active
                ? "border-accent text-ink"
                : "border-transparent text-muted hover:text-ink-2"
            }`}
          >
            {p.tab}
          </button>
        ))}
      </div>
    </Section>
  );
}
