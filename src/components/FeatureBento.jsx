'use client';

import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { useLocale, useTranslations } from "next-intl";
import { Search, Compass, Type, Badge, FileText, Code2, Rocket, ArrowRight, ArrowLeft } from "lucide-react";
import "@/styles/backgroundTailwindConfig.css"
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation";
import Link from "next/link";
// ✅ 7-step Bento (icon + title side-by-side with gap, h5 body centered)
//    - lucide-react icons
//    - Gradient animation (class های animate-* از globals.css می‌آیند)
//    - i18n namespace: "HomePage.BentoSteps"

export default function FeatureBento() {
  const locale = useLocale();
  const t = useTranslations("HomePage.BentoSteps");

  const headerPills = t.raw("headerPills");
  const steps = t.raw("steps"); // [{ key, label, body } x7]

  const iconMap = {
    discovery: Search,
    strategy: Compass,
    namingVoice: Type,
    identity: Badge,
    collateral: FileText,
    web: Code2,
    launch: Rocket,
  };

  // Layout برای ۷ کاشی (۱۲ ستون در md+)
  const spans = [6, 6, 4, 4, 4, 8, 4];

  return (
    <section
      aria-label={t("aria")}
      data-locale={locale}
      className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8"
    >
      <div className="mb-8 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
          {t("sectionTitle")}
        </h2>
        <Link href="#" className="flex gap-2 text-blue-500 underline hover:text-blue-300 cursor-pointer">
          <h5>{t("headerPills")}</h5>
          <ArrowLeft/>
        </Link>
      </div>

<BentoGrid>
  {steps?.slice(0, 7).map((s, idx) => {
    const Icon = iconMap[s.key] ?? FileText;
    const span = spans[idx] || 4;
    const spanClass =
      span === 8 ? "md:col-span-8" : span === 6 ? "md:col-span-6" : "md:col-span-4";

    return (
      <BentoGridItem
        key={s.key || idx}
        className={`${spanClass} bg-surface border-border overflow-hidden`}
        title={
          <div className="flex items-center gap-2 text-sm font-medium">
            <Icon className="h-4 w-4" aria-hidden />
            <span>{s.label}</span>
          </div>
        }
        description=""
        header={
          <BackgroundGradientAnimation
            // با !h-40 و !w-full اندازه‌ی باکس رو enforce می‌کنیم
            containerClassName="!h-40 !w-full rounded-lg overflow-hidden relative"
            className="relative"
            interactive={false} // اگر نمی‌خوای اثر موس داشته باشه
          >
            <div className="absolute inset-0 grid place-items-center p-4 pointer-events-none">
              <h5 className="relative z-10 text-balance mt-8 md:text-lg text-center">
                {s.body}
              </h5>
            </div>
          </BackgroundGradientAnimation>
        }
      />
    );
  })}
</BentoGrid>
    </section>
  );
}
