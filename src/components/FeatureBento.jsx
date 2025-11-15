"use client";

import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { useLocale, useTranslations } from "next-intl";
import {
  Search,
  Compass,
  Type,
  Badge,
  FileText,
  Code2,
  Rocket,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import "@/styles/backgroundTailwindConfig.css";

export default function FeatureBento() {
  const locale = useLocale();
  const t = useTranslations("HomePage.sections.grids");

  const headerPills = t("headerPills");
  const steps = t.raw("steps"); // آرایه‌ی استپ‌ها
  const count = t.raw("count"); // تعداد موردنظر

  const iconMap = {
    discovery: Search,
    strategy: Compass,
    namingVoice: Type,
    identity: Badge,
    collateral: FileText,
    web: Code2,
    launch: Rocket
  };

  const safeSteps = Array.isArray(steps) ? steps : [];
  const maxCount =
    typeof count === "number" ? count : safeSteps.length || 0;
  const visibleSteps = safeSteps.slice(0, maxCount);

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

        <Link
          href="/gallery"
          className="flex items-center gap-2 text-sm font-medium text-blue-500 underline underline-offset-4 hover:text-blue-300"
        >
          <span>{headerPills}</span>
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>

      {/* ۲ تا در هر ردیف روی md+ */}
      <BentoGrid className="md:grid-cols-2 md:auto-rows-[20rem]">
        {visibleSteps.map((s, idx) => {
          const Icon = iconMap[s.key] ?? FileText;

          // این رو هرطور دوست داری customize کن
          const href = `/${locale}/gallery/${s.key}`;

          return (
            <Link
              key={s.key || idx}
              href={href}
              className="group block h-full focus:outline-none rounded-2xl hover:scale-[0.98] active:scale-[0.95] bg-slate-700"
            >
              <BentoGridItem
                className="bg-surface/60 border-border/60 h-full"
                header={
                  <div className="relative w-full overflow-hidden rounded-xl">
                    {s.img && (
                      <img
                        src={s.img}
                        alt={s.title}
                        className=""
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  </div>
                }
                title={
                  <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    <Icon
                      className="h-4 w-4 opacity-80"
                      aria-hidden="true"
                    />
                    <span>{s.title}</span>
                  </div>
                }
                description={s.desc}
              />
            </Link>
          );
        })}
      </BentoGrid>
    </section>
  );
}
