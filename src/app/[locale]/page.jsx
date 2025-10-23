"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import HeroBackdrop from "@/components/HeroBackdrop";
import ScrollDown from "@/components/ScrollDown";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import {
  Images,
  MessageSquare,
  Stars,
  ClipboardCopy,
  FileWarning,
  Signature,
  Columns3,
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
import GlobeSection from "@/components/GlobeSection";
import FeatureBento from "@/components/FeatureBento";

export default function Page() {
  const locale = useLocale();
  const t = useTranslations("HomePage");

  // --- Small building blocks ---
  // GridSlot: همان باکس گرادیان قبلی، ولی حالا می‌توانید هر نوع محتوایی داخلش رندر کنید
  const GridSlot = ({ children, className = "" }) => {
    return (
      <div className={`relative flex flex-1 h-full min-h-[6rem] w-full rounded-xl overflow-hidden ${className}`}>
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

  const items = [
    {
      title: t("grid.gridTitle1"),
      description: t("grid.gridDesc1"),
      // نمونه: تصویر داخل اسلات
      header: (
        <GridSlot>
          <img
            src="/images/sample-1.jpg"
            alt="sample"
            className="h-28 w-full object-cover rounded-md"
          />
        </GridSlot>
      ),
      icon: <Images className="h-4 w-4 text-[var(--color-text-muted)]" />,
      className: "",
      href: `/${locale}/gallery`,
    },
    {
      title: t("grid.gridTitle2"),
      description: t("grid.gridDesc2"),
      // نمونه: متن سفارشی
      header: (
        <GridSlot>
          <p className="text-sm text-center leading-6">
            سلام
          </p>
        </GridSlot>
      ),
      icon: (
        <MessageSquare className="h-4 w-4 text-[var(--color-text-muted)]" />
      ),
      className: "",
      href: `/${locale}/contact`,
    },
    {
      title: t("grid.gridTitle3"),
      description: t("grid.gridDesc3"),
      // نمونه: اینپوت / فرم کوچک
      header: (
        <GridSlot>
          <GlobeSection/>
        </GridSlot>
      ),
      icon: <Stars className="h-4 w-4 text-[var(--color-text-muted)]" />,
      className: "",
    },
    {
      title: t("grid.gridTitle4"),
      description: t("grid.gridDesc4"),
      // نمونه: حالت پیش‌فرض بدون محتوای خاص
      header: <GridSlot />,
      icon: (
        <ClipboardCopy className="h-4 w-4 text-[var(--color-text-muted)]" />
      ),
      className: "md:col-span-2",
    },
    {
      title: t("grid.gridTitle5"),
      description: t("grid.gridDesc5"),
      header: <GridSlot />,
      icon: <FileWarning className="h-4 w-4 text-[var(--color-text-muted)]" />,
      className: "",
    },
    {
      title: t("grid.gridTitle6"),
      description: t("grid.gridDesc6"),
      header: <GridSlot />,
      icon: <Signature className="h-4 w-4 text-[var(--color-text-muted)]" />,
      className: "",
    },
    {
      title: t("grid.gridTitle7"),
      description: t("grid.gridDesc7"),
      header: <GridSlot />,
      icon: <Columns3 className="h-4 w-4 text-[var(--color-text-muted)]" />,
      className: "md:col-span-2",
    },
  ];

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
            <ScrollDown className="cursor-pointer"
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
          <div className="rounded-2xl border glass p-4">
            <p className="text-center text-sm text-text-muted mb-4">
              {t("sections.trust.text")}
            </p>
            <div className="overflow-hidden relative">
              <div className="flex gap-10 whitespace-nowrap marquee-track">
                {[
                  "Artemis",
                  "Nova",
                  "Helix",
                  "Vertex",
                  "Zephyr",
                  "Orbit",
                  "Nimbus",
                  "Pulse",
                ].map((name, i) => (
                  <span
                    key={i}
                    className="pill text-[13px] px-4 py-2 inline-flex items-center gap-2"
                  >
                    <Users2 className="h-4 w-4 opacity-80" /> {name}
                  </span>
                ))}
                {/* duplicate group for seamless loop */}
                {[
                  "Artemis",
                  "Nova",
                  "Helix",
                  "Vertex",
                  "Zephyr",
                  "Orbit",
                  "Nimbus",
                  "Pulse",
                ].map((name, i) => (
                  <span
                    key={`dup-${i}`}
                    className="pill text-[13px] px-4 py-2 inline-flex items-center gap-2"
                  >
                    <Users2 className="h-4 w-4 opacity-80" /> {name}
                  </span>
                ))}
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
            }
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
            />
            <ServiceCard
              icon={<Images className="h-5 w-5" />}
              title={t("services.case.title")}
              desc={t("services.case.desc")}
              href={`/${locale}/gallery`}
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
              <p className="pill inline-block mb-3">{t("sections.featured.pill")}</p>
              <h3 className="text-xl font-semibold mb-2">{t("sections.featured.title")}</h3>
              <p className="text-sm text-text-muted">{t("sections.featured.desc")}</p>
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
            {[
              {
                quote: t("testimonials.1.quote"),
                name: t("testimonials.1.name"),
              },
              {
                quote: t("testimonials.2.quote"),
                name: t("testimonials.2.name"),
              },
              {
                quote: t("testimonials.3.quote"),
                name: t("testimonials.3.name"),
              },
            ].map((tst, i) => (
              <figure
                key={i}
                className="snap-start min-w-[82%] sm:min-w-[520px] rounded-2xl border glass p-6"
              >
                <Quote className="h-6 w-6 opacity-70" />
                <blockquote className="mt-3 text-base leading-7">“{tst.quote}”</blockquote>
                <figcaption className="mt-3 text-sm text-text-muted">
                  {tst.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            {t("sections.faq.title")}
          </h2>
          <div className="space-y-3">
            {[
              { q: t("faq.1.q"), a: t("faq.1.a") },
              { q: t("faq.2.q"), a: t("faq.2.a") },
              { q: t("faq.3.q"), a: t("faq.3.a") },
            ].map((f, i) => (
              <details key={i} className="group rounded-2xl border glass p-5">
                <summary className="flex cursor-pointer items-center justify-between list-none">
                  <span className="font-medium">{f.q}</span>
                  <HelpCircle className="h-5 w-5 opacity-70 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm text-text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative z-10 py-16">
        <div className="max-w-5xl mx-auto px-4 text-center rounded-3xl border glass p-10">
          <p className="pill inline-block mb-3">{t("sections.cta.pill")}</p>
          <h3 className="text-2xl sm:text-3xl font-bold">{t("sections.cta.title")}</h3>
          <p className="mt-2 text-text-muted">{t("sections.cta.desc")}</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link href={`/${locale}/contact`} className="btn-primary">
              {t("cta.primary")}
            </Link>
            <Link href={`/${locale}/about`} className="btn-secondary">
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
          <span>Explore</span>
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
