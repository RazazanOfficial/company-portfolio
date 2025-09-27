// app/[locale]/page.jsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import HeroBackdrop from "@/components/HeroBackdrop";
import ScrollDown from "@/components/ScrollDown";

// === پیکربندی قابل‌تغییر ===


export default function Page() {
  const locale = useLocale();
  const t = useTranslations("HomePage");

  return (
    <>
      {/* بک‌دراپ: SVG نیم‌دایره با idهای hero-arc-svg/hero-arc-path */}
      <HeroBackdrop />

      {/* محتوای هیرو روی بک‌گراند */}
      <section className="relative z-20">
        <div className="flex flex-col justify-center mx-auto container px-4 pt-2 pb-24">
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
            <ScrollDown  colorClass="text-[var(--color-brand-500)]" label={t("scroll")}  />
          </div>
          {/* Mockup */}
          <div id="below-hero" className="relative mt-16">
            <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-surface/70 glass shadow-2xl">
              <div
                className="aspect-[16/9] w-full rounded-3xl"
                aria-label={t("mock.alt")}
              ></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
