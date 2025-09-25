// app/[locale]/page.jsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import HeroBackdrop from "@/components/HeroBackdrop";
import ScrollDown from "@/components/ScrollDown";

// === پیکربندی قابل‌تغییر ===
const CHIP_CONFIG = {
  count: 4, // تعداد چیپ‌ها
  band: { start: 0.78, end: 1.0 }, // بخش پایین نیم‌دایره (0=بالا، 1=پایین)
  fractions: [0.1, 0.38, 0.68, 0.9], // جای هر چیپ روی محور X داخل همان نوار (0 چپ ← 1 راست)
  lift: 8, // فاصله از رینگ به سمت بالا (px)
  offsets: [
    // آفست دستی برای هر چیپ (px)
    { x: 0, y: 0 },
    { x: 6, y: -2 },
    { x: -4, y: 0 },
    { x: 0, y: 2 },
  ],
};

export default function Page() {
  const locale = useLocale();
  const t = useTranslations("HomePage");
  const tags = (t.raw?.("floatingTags") ?? []).slice(0, CHIP_CONFIG.count);

  const [pts, setPts] = useState([]);

  useEffect(() => {
    const svg = document.getElementById("hero-arc-svg");
    const path = document.getElementById("hero-arc-path");
    if (!svg || !path) return;

    const recompute = () => {
      const ctm = svg.getScreenCTM();
      if (!ctm) return;

      const total = path.getTotalLength();
      const pt = svg.createSVGPoint();

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // 1) همهٔ نقاط قابل‌دیدن روی ویوپورت
      const candidates = [];
      const steps = 260;
      for (let i = 0; i <= steps; i++) {
        const len = (total * i) / steps;
        const p = path.getPointAtLength(len);
        pt.x = p.x;
        pt.y = p.y;
        const sp = pt.matrixTransform(ctm); // مختصات صفحه

        const marginX = 12;
        const insideX = sp.x >= -marginX && sp.x <= vw + marginX;
        const insideY = sp.y >= 0 && sp.y <= vh;
        if (insideX && insideY) {
          candidates.push({ left: sp.x, top: sp.y });
        }
      }

      if (candidates.length === 0) {
        // fallback: چند نقطهٔ میانی
        const samples = [0.35, 0.5, 0.65, 0.8].map((r) => {
          const p = path.getPointAtLength(total * r);
          pt.x = p.x;
          pt.y = p.y;
          const sp = pt.matrixTransform(ctm);
          return { left: sp.x, top: sp.y };
        });
        setPts(samples.slice(0, CHIP_CONFIG.count));
        return;
      }

      // 2) فقط «نوار پایینی» نیم‌دایره مطابق تنظیمات
      const ys = candidates.map((c) => c.top);
      const yMin = Math.min(...ys);
      const yMax = Math.max(...ys);

      const start = CHIP_CONFIG.band.start;
      const end = CHIP_CONFIG.band.end;
      const yStart = yMin + (yMax - yMin) * start;
      const yEnd = yMin + (yMax - yMin) * end;

      let bandPts = candidates.filter((c) => c.top >= yStart && c.top <= yEnd);

      // اگر نوار خیلی لاغره، خودکار کمی پهن‌ترش کن
      let widen = 0;
      while (bandPts.length < CHIP_CONFIG.count && start - widen > 0.5) {
        widen += 0.03;
        const yS = yMin + (yMax - yMin) * Math.max(0, start - widen);
        const yE = yMin + (yMax - yMin) * Math.min(1, end + widen);
        bandPts = candidates.filter((c) => c.top >= yS && c.top <= yE);
      }

      bandPts.sort((a, b) => a.left - b.left);
      const base =
        bandPts.length >= CHIP_CONFIG.count
          ? bandPts
          : candidates.slice().sort((a, b) => a.left - b.left);

      // 3) انتخاب دقیق هر چیپ با fractions + offsets + lift
      const picked = [];
      const n = base.length;
      for (let i = 0; i < CHIP_CONFIG.count; i++) {
        const f =
          CHIP_CONFIG.fractions[i] ?? i / Math.max(1, CHIP_CONFIG.count - 1);
        const idx = Math.max(0, Math.min(n - 1, Math.round(f * (n - 1))));
        const off = CHIP_CONFIG.offsets[i] ?? { x: 0, y: 0 };
        picked.push({
          left: base[idx].left + off.x,
          top: base[idx].top - CHIP_CONFIG.lift + off.y,
        });
      }

      setPts(picked);
    };

    const ro = new ResizeObserver(recompute);
    ro.observe(document.documentElement);
    window.addEventListener("resize", recompute);
    window.addEventListener("scroll", recompute, { passive: true });
    recompute();

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recompute);
      window.removeEventListener("scroll", recompute);
    };
  }, []);

  return (
    <>
      {/* بک‌دراپ: SVG نیم‌دایره با idهای hero-arc-svg/hero-arc-path */}
      <HeroBackdrop />

      {/* چیپ‌ها: نسبت به ویوپورت (مثل خود SVG) */}
      <div className="pointer-events-none fixed inset-0 z-[999]">
        {tags.map((txt, i) => {
          const p = pts[i];
          if (!p) return null;
          return (
            <div
              key={i}
              className="pill absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${p.left}px`, top: `${p.top}px` }}
            >
              {txt}
            </div>
          );
        })}
      </div>

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
            <ScrollDown />
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
