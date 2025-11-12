"use client";

import Link from "next/link";
import { useLocale, useTranslations, useMessages } from "next-intl";
import HeroBackdrop from "@/components/HeroBackdrop";
import ScrollDown from "@/components/ScrollDown";
import {
  Images,
  MessageSquare,
  Rocket,
  PenTool,
  Layers,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Quote,
  Trophy,
  Users2,
} from "lucide-react";
import FeatureBento from "@/components/FeatureBento";

export default function Page() {
  const locale = useLocale();
  const t = useTranslations("HomePage");
  const messages = useMessages();

  // ---------- TRUST (مارکی) ----------
  const trustItems =
    (typeof t.raw === "function"
      ? t.raw("sections.trust.items")
      : messages?.HomePage?.sections?.trust?.items) || [];

  let trustCount = Array.isArray(trustItems) ? trustItems.length : 0;
  try {
    const raw = t("sections.trust.count");
    const n = Number(raw);
    if (!Number.isNaN(n) && n > 0) trustCount = n;
  } catch {}

  let duplicates = 2;
  try {
    const raw = t("sections.trust.duplicates");
    const n = Number(raw);
    if (!Number.isNaN(n) && n > 0) duplicates = n;
  } catch {}

  const itemsToShow = (Array.isArray(trustItems) ? trustItems : []).slice(
    0,
    trustCount
  );

  // ---------- TESTIMONIALS (داینامیک) ----------
  const testimonialsItems =
    (typeof t.raw === "function"
      ? t.raw("sections.testimonials.items")
      : messages?.HomePage?.sections?.testimonials?.items) || [];

  let testimonialCount = Array.isArray(testimonialsItems)
    ? testimonialsItems.length
    : 0;
  try {
    const raw = t("sections.testimonials.count");
    const n = Number(raw);
    if (!Number.isNaN(n) && n > 0) {
      testimonialCount = Math.min(n, testimonialCount);
    }
  } catch {}

  const testimonialsToShow = (Array.isArray(testimonialsItems)
    ? testimonialsItems
    : []
  ).slice(0, testimonialCount);

  // ---------- FAQ (داینامیک با count + فقط Hover با انیمیشن 1s) ----------
  const faqItemsRaw =
    (typeof t.raw === "function"
      ? t.raw("sections.faq.items")
      : messages?.HomePage?.sections?.faq?.items) || [];

  let faqCount = Array.isArray(faqItemsRaw) ? faqItemsRaw.length : 0;
  try {
    const raw = t("sections.faq.count");
    const n = Number(raw);
    if (!Number.isNaN(n) && n > 0) faqCount = Math.min(n, faqItemsRaw.length);
  } catch {}

  const faqItems = (Array.isArray(faqItemsRaw) ? faqItemsRaw : []).slice(
    0,
    faqCount
  );

  // --- Small building blocks ---
  const GridSlot = ({ children, className = "" }) => {
    return (
      <div
        className={`relative flex flex-1 h-full min-h-[6rem] w-full rounded-xl overflow-hidden ${className}`}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(-45deg, rgba(127,179,255,.18), rgba(140,120,255,.12), transparent)",
          }}
        />
        <div className="relative flex w-full h-full items-center justify-center p-3">
          {children}
        </div>
      </div>
    );
  };

  const onScrollDown = () => {
    const el = document.getElementById("below-hero");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* HERO BACKDROP */}
      <HeroBackdrop />

      {/* HERO CONTENT */}
      <section className="relative z-20">
        <div className="flex flex-col justify-center mx-auto px-4 pt-2 pb-24">
          <div className="text-center max-w-3xl mx-auto mt-30 lg:mt-1 sm:mt-5 text-2xl xl:text-5xl lg:text-4xl md:text-4xl sm:text-3xl">
            <h1 className="font-extrabold tracking-tight">
              <span className="block">{t("headline.l1")}</span>
              <span className="block">{t("headline.l2")}</span>
            </h1>
            <p className="text-text-muted text-sm xl:text-lg lg:text-md md:text-base sm:text-sm lg:mt-3 md:mt-22 sm:mt-14">
              {t("subcopy")}
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <Link href={`/${locale}/contact`} className="btn-primary">
                {t("cta.primary")}
              </Link>
              <Link href={`/${locale}/gallery`} className="btn-secondary">
                {t("cta.secondary")}
              </Link>
            </div>
          </div>

          <div className="w-full flex justify-center mt-6">
            <ScrollDown
              className="cursor-pointer"
              colorClass="text-[var(--color-brand-500)]"
              label={t("scroll")}
              onClick={onScrollDown}
            />
          </div>
        </div>
      </section>

      {/* FEATURE GRID / BENTO */}
      <FeatureBento />

      {/* TRUST MARQUEE */}
      <section className="relative z-10 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="rounded-2xl border  glass p-4">
            <p className="text-center text-sm text-text-muted mb-4">
              {t("sections.trust.text")}
            </p>

            <div className="overflow-hidden relative">
              <div className="flex gap-10 whitespace-nowrap marquee-track">
                {Array.from({ length: duplicates }).map((_, dupIdx) =>
                  itemsToShow.map((name, i) => (
                    <span
                      key={`${dupIdx}-${i}-${name}`}
                      className="border border-white rounded-2xl hover:bg-gray-800/80 text-[13px] px-4 py-2 inline-flex items-center gap-2"
                    >
                      <Users2 className="h-4 w-4 opacity-80" /> {name}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* marquee keyframes */}
        <style jsx>{`
          .marquee-track {
            animation: marquee 28s linear infinite;
          }
          @keyframes marquee {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            } /* برای duplicates=2 بی‌درزه */
          }
        `}</style>
      </section>

      {/* SERVICES */}
      <section className="relative z-10 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold">
              {t("sections.services.title")}
            </h2>
            <span className="pill">{t("sections.services.pill")}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ServiceCard
              icon={<PenTool className="h-5 w-5" />}
              title={t("services.strategy.title")}
              desc={t("services.strategy.desc")}
            />
            <ServiceCard
              icon={<Layers className="h-5 w-5" />}
              title={t("services.identity.title")}
              desc={t("services.identity.desc")}
            />
            <ServiceCard
              icon={<Rocket className="h-5 w-5" />}
              title={t("services.web.title")}
              desc={t("services.web.desc")}
            />
            <ServiceCard
              icon={<Sparkles className="h-5 w-5" />}
              title={t("services.content.title")}
              desc={t("services.content.desc")}
              href={`/${locale}/gallery`}
            />
            <ServiceCard
              icon={<Images className="h-5 w-5" />}
              title={t("services.case.title")}
              desc={t("services.case.desc")}
              href={`/${locale}/about`}
            />
            <ServiceCard
              icon={<MessageSquare className="h-5 w-5" />}
              title={t("services.support.title")}
              desc={t("services.support.desc")}
              href={`/${locale}/contact`}
            />
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative z-10 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold">
              {t("sections.process.title")}
            </h2>
            <span className="text-sm text-text-muted">
              {t("sections.process.time")}
            </span>
          </div>

          <ol className="relative border-s border-[var(--color-border)] ps-6">
            {[
              {
                title: t("process.discovery.title"),
                desc: t("process.discovery.desc"),
              },
              {
                title: t("process.strategy.title"),
                desc: t("process.strategy.desc"),
              },
              {
                title: t("process.design.title"),
                desc: t("process.design.desc"),
              },
              {
                title: t("process.iterate.title"),
                desc: t("process.iterate.desc"),
              },
              {
                title: t("process.launch.title"),
                desc: t("process.launch.desc"),
              },
            ].map((s, i) => (
              <li key={i} className="mb-8 ms-2">
                <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-surface)] border border-[var(--color-border)]">
                  <CheckCircle2 className="h-4 w-4 text-[var(--color-accent-cool)]" />
                </span>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="text-sm text-text-muted mt-1">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* STATS + FEATURED */}
      <section className="relative z-10 py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Stats */}
          <div className="rounded-2xl border glass p-6 flex flex-col justify-center gap-4">
            <div className="flex items-center gap-3">
              <Trophy className="h-6 w-6" />
              <h3 className="font-semibold">{t("sections.stats.title")}</h3>
            </div>
            <dl className="grid grid-cols-3 gap-3">
              <Stat num="120+" label={t("stats.projects")} />
              <Stat num="36%" label={t("stats.cvrs")} />
              <Stat num="14" label={t("stats.sectors")} />
            </dl>
          </div>

          {/* Featured case */}
          <div className="md:col-span-2 rounded-2xl border glass p-6 flex items-center gap-6">
            <div className="grow">
              <p className="pill inline-block mb-3">
                {t("sections.featured.pill")}
              </p>
              <h3 className="text-xl font-semibold mb-2">
                {t("sections.featured.title")}
              </h3>
              <p className="text-sm text-text-muted">
                {t("sections.featured.desc")}
              </p>
              <div className="mt-4 flex gap-2">
                <Link href={`/${locale}/gallery`} className="btn-secondary">
                  {t("sections.featured.view")}
                </Link>
                <Link href={`/${locale}/contact`} className="btn-primary">
                  {t("sections.featured.talk")}
                </Link>
              </div>
            </div>
            <div className="hidden sm:block min-w-[180px] aspect-[4/3] rounded-xl bg-grid" />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative z-10 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold">
              {t("sections.testimonials.title")}
            </h2>
            <span className="text-sm text-text-muted">
              {t("sections.testimonials.hint")}
            </span>
          </div>

          <div className="snap-x snap-mandatory overflow-x-auto flex gap-4 pb-2 -mx-4 px-4">
            {testimonialsToShow.map((tst, i) => (
              <figure
                key={i}
                className="snap-start min-w-[82%] sm:min-w-[520px] rounded-2xl border glass p-6"
              >
                <Quote className="h-6 w-6 opacity-70" />
                <blockquote className="mt-3 text-base leading-7">
                  {tst?.quote ? `“${tst.quote}”` : null}
                </blockquote>
                <figcaption className="mt-3 text-sm text-text-muted">
                  {tst?.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ (Hover-only با انیمیشن 1s) */}
      <section className="relative z-10 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            {t("sections.faq.title")}
          </h2>

          <div className="space-y-3">
            {faqItems.map((f, i) => (
              <div key={i} className="group rounded-2xl border glass p-5">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{f.q}</span>
                  <HelpCircle className="h-5 w-5 opacity-70 transition-transform duration-1000 ease-in-out group-hover:rotate-180" />
                </div>

                {/* انیمیشن نرم با max-height + opacity */}
                <div className="overflow-hidden transition-all duration-1000 ease-in-out max-h-0 group-hover:max-h-[40rem]">
                  <p className="mt-3 text-sm text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out">
                    {f.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative z-10 py-16">
        <div className="max-w-5xl mx-auto px-4 text-center rounded-3xl border glass p-10">
          <p className="pill inline-block mb-3">{t("sections.cta.pill")}</p>
          <h3 className="text-2xl sm:text-3xl font-bold">
            {t("sections.cta.title")}
          </h3>
          <p className="mt-2 text-text-muted">{t("sections.cta.desc")}</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link href={`/${locale}/contact`} className="btn-primary">
              {t("cta.primary")}
            </Link>
            <Link href={`/${locale}/gallery`} className="btn-secondary">
              {t("cta.secondary")}
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--color-border)] pt-6">
          <span className="text-sm text-text-muted">
            © {new Date().getFullYear()} — {t("footer.rights")}
          </span>
          <nav className="flex flex-wrap items-center gap-3 text-sm">
            <Link href={`/${locale}`} className="hover:underline">
              {t("Header.HomePage")}
            </Link>
            <Link href={`/${locale}/gallery`} className="hover:underline">
              {t("Header.Gallery")}
            </Link>
            <Link href={`/${locale}/about`} className="hover:underline">
              {t("Header.AboutUs")}
            </Link>
            <Link href={`/${locale}/contact`} className="hover:underline">
              {t("Header.ContactUs")}
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}

// === Reusable bits ===
function ServiceCard({ icon, title, desc, href }) {
  const t = useTranslations("HomePage");
  const Comp = href ? Link : "div";
  const extra = href ? { href } : {};
  return (
    <Comp
      {...extra}
      className="group rounded-2xl border glass p-5 hover:border-[var(--color-accent-cool)] transition-colors"
    >
      <div className="flex items-center gap-3">
        <span className="rounded-xl border p-2 bg-[color-mix(in_oklab,var(--color-surface)_70%,transparent)]">
          {icon}
        </span>
        <h3 className="font-semibold group-hover:underline underline-offset-4">
          {title}
        </h3>
      </div>
      <p className="text-sm text-text-muted mt-2">{desc}</p>
      {href ? (
        <span className="mt-3 inline-flex items-center gap-1 text-[var(--color-accent-cool)] text-sm">
          <span>{t("services.expelore")}</span>
          <ArrowRight className="h-4 w-4" />
        </span>
      ) : null}
    </Comp>
  );
}

function Stat({ num, label }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-extrabold tracking-tight">{num}</div>
      <div className="text-xs text-text-muted mt-1">{label}</div>
    </div>
  );
}
