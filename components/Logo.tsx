import Link from "next/link";
import { brand } from "@/content/site";

/**
 * Logo lockup, concept B ("Контур") from HRQT_дизайн-спека §6:
 * a 9px-radius outline square with a 4px accent border and an ink dot inside,
 * then the wordmark at 700/22px, then the descriptor at 9px with 0.22em
 * tracking in --muted.
 *
 * On ink, the dot and the text go white and the border stays accent.
 */
export function Logo({ onInk = false }: { onInk?: boolean }) {
  return (
    <Link prefetch={false} href="/" className="inline-flex items-center gap-3" aria-label={brand.name}>
      <span
        aria-hidden
        className="inline-flex h-8 w-8 items-center justify-center rounded-[9px] border-4 border-accent"
      >
        <span
          className={`block h-[9px] w-[9px] rounded-[2px] ${onInk ? "bg-white" : "bg-ink"}`}
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[22px] font-bold tracking-[-0.02em] ${
            onInk ? "text-white" : "text-ink"
          }`}
        >
          {brand.name}
        </span>
        <span
          className={`mt-1 text-[9px] tracking-[0.22em] uppercase ${
            onInk ? "text-on-ink" : "text-muted"
          }`}
        >
          {brand.descriptor}
        </span>
      </span>
    </Link>
  );
}
