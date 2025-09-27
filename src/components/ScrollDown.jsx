// File: components/ScrollDown.tsx
"use client";
import React from "react";
import "@/styles/scrollDown.css";

export default function ScrollDown({
  // لینک‌ها/هوور: آبی نرم
  colorClass = "text-[var(--color-accent-cool)]",

  label = "scroll",
  className = "",
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={[
        // سایز و فرم
        "relative inline-flex h-[50px] w-[30px] items-center justify-center rounded-[30px]",
        // مرز از روی رنگ جاری
        "bg-transparent outline outline-2 outline-current",
        // حرکت هم‌زمان کل موس + متن
        "mouse-float",
        // رنگ پذیرفته‌شده از بیرون
        colorClass,
        className,
      ].join(" ")}
    >
      {/* لایه‌ی glow پشت موس (نرم و قابل‌تنظیم) */}
      <span
        aria-hidden
        className={[
          "pointer-events-none absolute -inset-4 -z-10 rounded-[36px]",
          // هاله با رنگ جاری:
          // لایه‌ی نیمه‌شفاف + بلر = gelow
          "bg-current/15 blur-lg",
        ].join(" ")}
      />

      {/* نَب داخل موس (غلتک) */}
      <div
        className={[
          "h-[10px] w-[5px] rounded-[10px] bg-[currentColor]",
          "scroll-nub-anim",
          // drop-shadow سبُک‌تر از box-shadow روی المان متحرک
          "[filter:drop-shadow(0_0_10px_currentColor)]",
        ].join(" ")}
      />

      {/* متن زیر موس؛ با خود دکمه حرکت می‌کنه */}
      <span
        aria-hidden
        className="w-[102px] pointer-events-none absolute top-[140%] select-none text-xs uppercase tracking-wider text-[currentColor]"
      >
        {label}
      </span>
    </button>
  );
}
