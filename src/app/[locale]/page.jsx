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

export default function Page() {
  const locale = useLocale();
  const t = useTranslations("HomePage");

  // --- Small building blocks ---
  const SoftSkeleton = ({ variant = "grid" }) => {
    if (variant === "gradient") {
      return (
        <div
          className="flex flex-1 h-full min-h-[6rem] w-full rounded-xl"
          style={{
            background:
              "linear-gradient(-45deg, rgba(127,179,255,.18), rgba(140,120,255,.12), transparent)",
          }}
        />
      );
    }
    return (
      <div className="flex flex-1 h-full min-h-[6rem] w-full rounded-xl bg-grid [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
    );
  };

  const items = [
    {
      title: t("grid.galleryTitle", { default: "Gallery" }),
      description: t("grid.galleryDesc", {
        default: "See our latest works and case studies.",
      }),
      header: <SoftSkeleton />,
      icon: <Images className="h-4 w-4 text-[var(--color-text-muted)]" />,
      className: "",
      href: `/${locale}/gallery`,
    },
    {
      title: t("grid.contactTitle", { default: "Contact" }),
      description: t("grid.contactDesc", {
        default: "Reach out to us quickly and easily.",
      }),
      header: <SoftSkeleton variant="gradient" />,
      icon: (
        <MessageSquare className="h-4 w-4 text-[var(--color-text-muted)]" />
      ),
      className: "",
      href: `/${locale}/contact`,
    },
    {
      title: t("grid.qualityTitle", { default: "Premium Experience" }),
      description: t("grid.qualityDesc", {
        default: "Quality and satisfaction are our priorities.",
      }),
      header: <SoftSkeleton />,
      icon: <Stars className="h-4 w-4 text-[var(--color-text-muted)]" />,
      className: "",
    },
    {
      title: t("grid.aiTitle", { default: "AI Content Generation" }),
      description: t("grid.aiDesc", {
        default: "Generate unique content powered by AI.",
      }),
      header: <SoftSkeleton variant="gradient" />,
      icon: (
        <ClipboardCopy className="h-4 w-4 text-[var(--color-text-muted)]" />
      ),
      className: "md:col-span-2",
    },
    {
      title: t("grid.proofTitle", { default: "Automated Proofreading" }),
      description: t("grid.proofDesc", {
        default: "Let AI proofread your documents.",
      }),
      header: <SoftSkeleton />,
      icon: <FileWarning className="h-4 w-4 text-[var(--color-text-muted)]" />,
      className: "",
    },
    {
      title: t("grid.designTitle", { default: "Thoughtful Design" }),
      description: t("grid.designDesc", {
        default: "Functional design that looks great.",
      }),
      header: <SoftSkeleton />,
      icon: <Signature className="h-4 w-4 text-[var(--color-text-muted)]" />,
      className: "",
    },
    {
      title: t("grid.commTitle", { default: "Clear Communication" }),
      description: t("grid.commDesc", {
        default: "We keep things transparent and simple.",
      }),
      header: <SoftSkeleton variant="gradient" />,
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
          <header className="text-center max-w-3xl mx-auto">
            <h1 className="text-xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              <span className="block">{t("headline.l1")}</span>
              <span className="block">{t("headline.l2")}</span>
            </h1>
            <p className="mt-2 text-text-muted text-base sm:text-lg">
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
          </header>

          <div className="w-full flex justify-center mt-6">
            <ScrollDown
              colorClass="text-[var(--color-brand-500)]"
              label={t("scroll")}
              onClick={onScrollDown}
            />
          </div>
        </div>
      </section>

      {/* FEATURE GRID / BENTO */}
      <section id="below-hero" className="relative z-10 pt-4 pb-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold">
              {t("sections.features.title", { default: "What we do" })}
            </h2>
            <Link
              href={`/${locale}/about`}
              className="text-sm text-[var(--color-accent-cool)] hover:underline inline-flex items-center gap-1"
            >
              {t("sections.features.link", { default: "About our studio" })}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* If you have BentoGrid, great; if not, replace with a simple grid */}
          <BentoGrid className="grid mt-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {items.map((item, i) => (
              <BentoGridItem key={i} {...item}>
                {/* Ensure the whole card is clickable when href exists */}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="absolute inset-0"
                    aria-label={item.title}
                  />
                ) : null}
              </BentoGridItem>
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* TRUST MARQUEE */}
      <section className="relative z-10 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="rounded-2xl border glass p-4">
            <p className="text-center text-sm text-text-muted mb-4">
              {t("sections.trust.text", {
                default: "Trusted by ambitious startups & bold brands",
              })}
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
          .marquee-track { animation: marquee 28s linear infinite; }
          @keyframes marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* SERVICES */}
      <section className="relative z-10 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold">
              {t("sections.services.title", { default: "Services" })}
            </h2>
            <span className="pill">
              {t("sections.services.pill", { default: "End‑to‑end branding" })}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ServiceCard
              icon={<PenTool className="h-5 w-5" />}
              title={t("services.strategy.title", { default: "Brand Strategy" })}
              desc={t("services.strategy.desc", {
                default:
                  "Positioning, voice, audience research and a crisp narrative for your brand.",
              })}
            />
            <ServiceCard
              icon={<Layers className="h-5 w-5" />}
              title={t("services.identity.title", { default: "Visual Identity" })}
              desc={t("services.identity.desc", {
                default:
                  "Logo, typography, color system, motion & design tokens that scale.",
              })}
            />
            <ServiceCard
              icon={<Rocket className="h-5 w-5" />}
              title={t("services.web.title", { default: "Web Design & Dev" })}
              desc={t("services.web.desc", {
                default:
                  "Next.js websites, landing pages, and high‑performance marketing sites.",
              })}
            />
            <ServiceCard
              icon={<Sparkles className="h-5 w-5" />}
              title={t("services.content.title", { default: "Content & Social" })}
              desc={t("services.content.desc", {
                default:
                  "Art‑direction for social, templates, content calendars and AI‑assisted copy.",
              })}
            />
            <ServiceCard
              icon={<Images className="h-5 w-5" />}
              title={t("services.case.title", { default: "Case Studies" })}
              desc={t("services.case.desc", {
                default:
                  "Story‑driven showcases that highlight outcomes, not just deliverables.",
              })}
              href={`/${locale}/gallery`}
            />
            <ServiceCard
              icon={<MessageSquare className="h-5 w-5" />}
              title={t("services.support.title", { default: "Ongoing Support" })}
              desc={t("services.support.desc", {
                default: "Retainers for growth, iteration and rapid experiments.",
              })}
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
              {t("sections.process.title", { default: "Our process" })}
            </h2>
            <span className="text-sm text-text-muted">
              {t("sections.process.time", { default: "2–6 weeks typical" })}
            </span>
          </div>

          <ol className="relative border-s border-[var(--color-border)] ps-6">
            {[
              {
                title: t("process.discovery.title", { default: "Discovery" }),
                desc: t("process.discovery.desc", {
                  default: "A short workshop to align on goals and constraints.",
                }),
              },
              {
                title: t("process.strategy.title", { default: "Strategy" }),
                desc: t("process.strategy.desc", {
                  default: "Positioning, messaging and creative north‑star.",
                }),
              },
              {
                title: t("process.design.title", { default: "Design" }),
                desc: t("process.design.desc", {
                  default: "Identity, system, key screens and motion samples.",
                }),
              },
              {
                title: t("process.iterate.title", { default: "Iterate" }),
                desc: t("process.iterate.desc", {
                  default: "Tight feedback loops, then polish and QA.",
                }),
              },
              {
                title: t("process.launch.title", { default: "Launch" }),
                desc: t("process.launch.desc", {
                  default: "Handover, docs and a crisp launch plan.",
                }),
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
              <h3 className="font-semibold">
                {t("sections.stats.title", { default: "Impact" })}
              </h3>
            </div>
            <dl className="grid grid-cols-3 gap-3">
              <Stat num="120+" label={t("stats.projects", { default: "Projects" })} />
              <Stat num="36%" label={t("stats.cvrs", { default: "Avg. lift" })} />
              <Stat num="14" label={t("stats.sectors", { default: "Sectors" })} />
            </dl>
          </div>

          {/* Featured case */}
          <div className="md:col-span-2 rounded-2xl border glass p-6 flex items-center gap-6">
            <div className="grow">
              <p className="pill inline-block mb-3">
                {t("sections.featured.pill", { default: "Case study" })}
              </p>
              <h3 className="text-xl font-semibold mb-2">
                {t("sections.featured.title", {
                  default: "From zero to category‑leader in 7 weeks",
                })}
              </h3>
              <p className="text-sm text-text-muted">
                {t("sections.featured.desc", {
                  default:
                    "Brand repositioning, identity and conversion‑first website for a SaaS startup.",
                })}
              </p>
              <div className="mt-4 flex gap-2">
                <Link href={`/${locale}/gallery`} className="btn-secondary">
                  {t("sections.featured.view", { default: "View project" })}
                </Link>
                <Link href={`/${locale}/contact`} className="btn-primary">
                  {t("sections.featured.talk", { default: "Start a project" })}
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
              {t("sections.testimonials.title", { default: "Kind words" })}
            </h2>
            <span className="text-sm text-text-muted">
              {t("sections.testimonials.hint", { default: "Swipe →" })}
            </span>
          </div>

          <div className="snap-x snap-mandatory overflow-x-auto flex gap-4 pb-2 -mx-4 px-4">
            {[
              {
                quote: t("testimonials.1.quote", {
                  default:
                    "They captured our essence fast and shipped a site that converts.",
                }),
                name: t("testimonials.1.name", { default: "Sahar • Nova" }),
              },
              {
                quote: t("testimonials.2.quote", {
                  default:
                    "A rare combo of taste, speed and business understanding.",
                }),
                name: t("testimonials.2.name", { default: "Arman • Vertex" }),
              },
              {
                quote: t("testimonials.3.quote", {
                  default:
                    "The design system made our product UI consistent overnight.",
                }),
                name: t("testimonials.3.name", { default: "Neda • Helix" }),
              },
            ].map((tst, i) => (
              <figure
                key={i}
                className="snap-start min-w-[82%] sm:min-w-[520px] rounded-2xl border glass p-6"
              >
                <Quote className="h-6 w-6 opacity-70" />
                <blockquote className="mt-3 text-base leading-7">
                  “{tst.quote}”
                </blockquote>
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
            {t("sections.faq.title", { default: "FAQ" })}
          </h2>
          <div className="space-y-3">
            {[
              {
                q: t("faq.1.q", { default: "What do projects cost?" }),
                a: t("faq.1.a", {
                  default:
                    "We scope transparently. Most engagements land between $3–12k depending on scope.",
                }),
              },
              {
                q: t("faq.2.q", { default: "Do you work fast?" }),
                a: t("faq.2.a", {
                  default:
                    "Yes. We compress timelines when needed and keep feedback cycles tight.",
                }),
              },
              {
                q: t("faq.3.q", { default: "Can you migrate our old site?" }),
                a: t("faq.3.a", {
                  default:
                    "Absolutely. We handle content migration, redirects and SEO hygiene.",
                }),
              },
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
          <p className="pill inline-block mb-3">
            {t("sections.cta.pill", { default: "Let’s talk" })}
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold">
            {t("sections.cta.title", {
              default: "Ready to grow your brand?",
            })}
          </h3>
          <p className="mt-2 text-text-muted">
            {t("sections.cta.desc", {
              default: "Tell us about your goals — we’ll reply within 24 hours.",
            })}
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link href={`/${locale}/contact`} className="btn-primary">
              {t("cta.primary", { default: "Start a project" })}
            </Link>
            <Link href={`/${locale}/about`} className="btn-secondary">
              {t("cta.secondary", { default: "Learn more" })}
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--color-border)] pt-6">
          <span className="text-sm text-text-muted">
            © {new Date().getFullYear()} — {t("footer.rights", { default: "All rights reserved" })}
          </span>
          <nav className="flex flex-wrap items-center gap-3 text-sm">
            <Link href={`/${locale}`} className="hover:underline">
              {t("Header.HomePage", { default: "Home" })}
            </Link>
            <Link href={`/${locale}/gallery`} className="hover:underline">
              {t("Header.Gallery", { default: "Gallery" })}
            </Link>
            <Link href={`/${locale}/about`} className="hover:underline">
              {t("Header.AboutUs", { default: "About" })}
            </Link>
            <Link href={`/${locale}/contact`} className="hover:underline">
              {t("Header.ContactUs", { default: "Contact" })}
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
