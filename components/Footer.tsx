import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Reveal, SplitTitle } from "@/components/motion";
import { Button, Container } from "@/components/ui";
import { brand, footer, footerCta } from "@/content/site";

/**
 * Closing CTA and footer, both on the glow — the reference bookends the page
 * with the same background it opens on.
 *
 * Призыв над подвалом отключается пропом `cta`. Он нужен там, где страница
 * заканчивается текстом, и мешает там, где она заканчивается предложением: на
 * главной последний раздел — пакеты, у каждого своя кнопка заявки, и ещё один
 * призыв следом читается как повтор.
 *
 * The legal strip is not decoration: HRQT_юр-сверка (Фаза 9) requires a link
 * to the privacy policy on every page under 152-ФЗ, so it lives here rather
 * than on a single legal page.
 */
export function Footer({ cta = true }: { cta?: boolean } = {}) {
  return (
    <div className="brand-glow">
      <Container>
        {cta ? (
          <>
            <div className="grid grid-cols-1 items-start gap-8 py-[var(--space-section)] md:grid-cols-2 md:gap-16">
              <SplitTitle
                lead={footerCta.titleLead}
                accent={footerCta.titleAccent}
                className="font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1] font-bold tracking-[-0.035em] text-balance"
              />
              <Reveal variant="rise" delay={140} className="flex flex-col items-start gap-6">
                <p className="text-lead leading-[1.68] tracking-[-0.01em] text-ink-2">
                  {footerCta.lead}
                </p>
                <Button href={footerCta.cta.href}>{footerCta.cta.label}</Button>
              </Reveal>
            </div>

            <hr className="border-line" />
          </>
        ) : null}

        {/* Без призыва сверху исчезает и разделяющая его линейка, поэтому
            подвал в этом случае несёт её сам. */}
        <footer
          className={`grid grid-cols-2 gap-x-8 gap-y-10 py-12 md:grid-cols-4 ${
            cta ? "" : "border-t border-line"
          }`}
        >
          <div className="col-span-2 flex flex-col gap-5 md:col-span-1">
            <Logo />
            <p className="max-w-[22rem] text-sm leading-[1.6] text-muted">
              {footer.blurb}
            </p>
          </div>

          {footer.columns.map((col) => (
            <nav key={col.title} className="flex flex-col gap-3">
              <p className="text-[0.8125rem] font-semibold tracking-[0.08em] text-muted uppercase">
                {col.title}
              </p>
              {col.links.map((link) => (
                <Link prefetch={false}
                  key={link.href}
                  href={link.href}
                  className="w-fit text-sm text-ink-2 transition-colors duration-300 ease-in-out hover:text-accent-strong"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}

          <div className="flex flex-col gap-3">
            <p className="text-[0.8125rem] font-semibold tracking-[0.08em] text-muted uppercase">
              {footer.contacts.title}
            </p>
            <a
              href={`mailto:${footer.contacts.email}`}
              className="w-fit text-sm text-ink-2 transition-colors duration-300 ease-in-out hover:text-accent-strong"
            >
              {footer.contacts.email}
            </a>
            <a
              href={footer.contacts.phoneHref}
              className="w-fit text-sm text-ink-2 transition-colors duration-300 ease-in-out hover:text-accent-strong"
            >
              {footer.contacts.phone}
            </a>
            <p className="text-sm leading-[1.55] text-muted">{footer.contacts.address}</p>
            <p className="text-sm leading-[1.55] text-muted">{footer.contacts.hours}</p>
            {/* Telegram убран по требованию заказчика: блокировки и
                корпоративные политики делают его плохим первым каналом. */}
            <Link
              prefetch={false}
              href={footer.contacts.action.href}
              className="mt-1 inline-flex min-h-[2.75rem] w-fit items-center rounded-[var(--radius-pill)] bg-accent-soft px-4 text-sm leading-5 font-medium text-accent-strong transition-all duration-300 ease-in-out hover:bg-line"
            >
              {footer.contacts.action.label}
            </Link>
          </div>
        </footer>

        <div className="flex flex-col gap-3 border-t border-line py-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>{brand.legal}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {footer.legalLinks.map((link) => (
              <Link prefetch={false}
                key={link.href}
                href={link.href}
                className="transition-colors duration-300 ease-in-out hover:text-accent-strong"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
