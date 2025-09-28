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
} from "lucide-react";

export default function Page() {
  const locale = useLocale();
  const t = useTranslations("HomePage");

  // Skeletonهای سبک که با بک‌گراند یکی به‌نظر میان
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

  // آیتم‌ها: فقط همین آرایه رو ویرایش/گسترش کن
  const items = [
    {
      title: t("grid.galleryTitle", { default: "Gallery" }),
      description: t("grid.galleryDesc", {
        default: "See our latest works and case studies.",
      }),
      header: <SoftSkeleton />,
      icon: <Images className="h-4 w-4 text-[var(--color-text-muted)]" />,
      className: "",
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

  return (
    <>
      <HeroBackdrop />

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
            />
          </div>

          {/* بخش اصلی: پهن‌تر، یک‌دست با بک‌گراند */}
          <div id="below-hero" className="relative mt-[20vh]">
            <div className="mx-auto w-full max-w-[90vw]">
              <BentoGrid className="md:auto-rows-[22rem] max-w-none">
                {items.map((item, i) => (
                  <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    icon={item.icon}
                    className={
                      // این کلاس‌ها در انتهای کلاس‌های پیشفرض BentoGridItem میاد و اونا رو override می‌کنه
                      `${item.className} glass bg-[color:color-mix(in_oklab,var(--surface)_72%,transparent)] 
                      border-[color:var(--border)] hover:border-[color:color-mix(in_oklab,var(--accent-cool)_38%,var(--border))] 
                      shadow-none hover:shadow-xl/0`
                    }
                  />
                ))}
              </BentoGrid>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
