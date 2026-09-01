import { Button, Container, ContourMark } from "@/components/ui";
import { typo } from "@/lib/typo";
import { hero, marquee } from "@/content/site";

/**
 * Section 2 of the reference: the hero.
 *
 * Geometry from SECTION_MAP.md (репозиторий aura), taken from the served markup:
 * pt-16 pb-12, inner xl:px-26, centre-aligned — the only centred block on the
 * page. H1 at 2.5rem/1 with -1.28px tracking, rising to 5rem with -3.78px at
 * lg (dropped to 4.25rem/-3px here, because Cyrillic at 5rem overflows this
 * headline). Subhead at 1.1875rem/32px with -0.189px over an 800px measure.
 * CTA row gap-6, quiet button first, then the commercial one.
 *
 * The reference then places a product screenshot with xl:-mb-31 so it
 * overlaps the section below. HRQT has no product to photograph, so the same
 * slot holds the «весь контур» panel, overlapping the same way.
 */
export function Hero() {
  return (
    <div className="mt-[var(--h-nav)]">
      <Container className="relative pt-16 pb-12">
        <div className="flex flex-col items-center px-0 xl:px-26">
          <h1 className="mb-6 text-center font-display text-[2.5rem] leading-[1] font-bold tracking-[-1.28px] text-balance lg:text-[4.25rem] lg:tracking-[-3px] xl:leading-[4.5rem]">
            {typo(hero.titleLead)}
            <strong>{typo(hero.titleAccent)}</strong>
            {typo(hero.titleTail)}
          </h1>

          <p className="mb-8 max-w-[800px] text-center text-[1.1875rem] leading-[32px] font-normal tracking-[-0.189px] text-ink-2">
            {typo(hero.lead)}
          </p>

          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:gap-6">
            <Button href={hero.secondary.href} variant="secondary">
              {hero.secondary.label}
            </Button>
            <Button href={hero.primary.href}>{hero.primary.label}</Button>
          </div>

          <p className="text-sm text-muted">{hero.note}</p>
        </div>

        <div className="mx-auto mt-14 w-full rounded-[var(--radius-card)] border border-line bg-surface p-8 md:p-10 xl:-mb-28">
          <p className="mb-8 font-display text-xl font-bold tracking-[-0.02em]">
            {hero.panel.title}
          </p>
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {hero.panel.items.map((item) => (
              <div key={item.name} className="flex flex-col gap-3">
                <ContourMark size={40} />
                <p className="font-display text-base font-bold tracking-[-0.02em]">
                  {item.name}
                </p>
                <p className="text-sm text-muted">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

/**
 * Section 3 of the reference: the marquee.
 *
 * Track holds the list twice so a -50% translate lands on the duplicate and
 * the loop is seamless; tiles are 12.5rem × 4.5rem with 0.625rem of padding;
 * both edges are masked by a 4rem fade.
 *
 * The reference runs client logos here. HRQT has none it may show under the
 * Фаза 1 NDA framing, so the strip carries the systems it works in.
 */
export function Marquee() {
  const track = [...marquee, ...marquee];
  return (
    <div className="relative w-full overflow-hidden pt-4 pb-16 xl:pt-36">
      <div className="marquee-fade" />
      <div className="animate-marquee relative z-0 flex w-fit">
        {track.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="flex h-[4.5rem] w-[12.5rem] shrink-0 items-center justify-center p-[0.625rem]"
            aria-hidden={i >= marquee.length}
          >
            <span className="font-display text-base font-medium tracking-[-0.02em] text-muted">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
