"use client";

import React from "react";
import {useLocale} from "next-intl";
import {usePathname, useRouter} from "next/navigation";
import "@/styles/language-toggle.css";

/**
 * LanguageToggle
 * - با کلیک، مسیر /[locale]/... را بین en/fa عوض می‌کند (بدون اسکرول به بالا).
 * - اگه propهای کنترل‌شده (value/onChange) بدی، همچنان کار می‌کند؛
 *   اما در نهایت مسیر رو هم عوض می‌کنه تا next-intl واقعاً locale رو تغییر بده.
 */
export default function LanguageToggle({
  value,
  defaultValue = "en",
  onChange,
  className = "",
}) {
  const router = useRouter();
  const pathname = usePathname(); // مثل /en/products/123
  const activeLocale = useLocale(); // en | fa (از next-intl)
  const isControlled = value === "en" || value === "fa";

  const [inner, setInner] = React.useState(defaultValue);
  const current = isControlled ? value : inner;

  // sync اولیه با locale واقعی صفحه
  React.useEffect(() => {
    if (!isControlled) setInner(activeLocale);
  }, [activeLocale, isControlled]);

  const checked = (isControlled ? current : activeLocale) === "fa";

  const swapLocaleInPath = (path, nextLocale) => {
    // اگر path با /en یا /fa شروع شد، جایگزین می‌کنیم؛ وگرنه prepend می‌کنیم.
    const withLeading = path.startsWith("/") ? path : `/${path}`;
    const replaced = withLeading.replace(/^\/(en|fa)(?=\/|$)/, `/${nextLocale}`);
    if (replaced === withLeading) {
      return `/${nextLocale}${withLeading === "/" ? "" : withLeading}`;
    }
    return replaced;
  };

const navigateToLocale = (nextLocale) => {
  const target = swapLocaleInPath(pathname || "/", nextLocale);

  // اگر View Transitions پشتیبانی شد، ناوبری را داخلش انجام بده
  if (typeof document !== "undefined" && document.startViewTransition) {
    document.startViewTransition(() => {
      router.replace(target, { scroll: false });
    });
  } else {
    // فالبک
    router.replace(target, { scroll: false });
  }
};


  const handleToggle = (e) => {
    const next = e.target.checked ? "fa" : "en";
    if (!isControlled) setInner(next);
    onChange?.(next);
    navigateToLocale(next);
  };

  return (
    <label
      className={`ls-switch relative inline-block w-[5em] h-[2.5em] select-none ${className}`}
      aria-label="Toggle language between English and Persian"
    >
      {/* Accessible checkbox */}
      <input
        type="checkbox"
        className="ls-cb peer absolute h-px w-px -m-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]"
        checked={checked}
        onChange={handleToggle}
        aria-checked={checked}
        role="switch"
      />

      {/* Track */}
      <span className="ls-toggle absolute inset-0 cursor-pointer rounded-[0.1em] uppercase font-bold overflow-hidden bg-neutral-800 transition-[background,box-shadow] duration-400 shadow-[_-0.3em_0_0_0_#373737,_-0.3em_0.3em_0_0_#373737,_0.3em_0_0_0_#373737,_0.3em_0.3em_0_0_#373737,_0_0.3em_0_0_#373737]">
        {/* Left (EN) - active وقتی چک نشده */}
        <span className="ls-left absolute left-0 bottom-0 flex w-1/2 h-[88%] items-center justify-center bg-neutral-100 text-neutral-800 [transform-origin:right] [transform:rotateX(10deg)] [transform-style:preserve-3d] transition-all duration-200 ease-out will-change-transform">
          <img src="/svgs/en.svg" alt="English" className="h-4 w-4" />
        </span>

        {/* Right (FA) - active وقتی چک شده */}
        <span className="ls-right absolute right-[1px] bottom-0 flex w-1/2 h-[88%] items-center justify-center bg-neutral-100 text-neutral-300 [transform-origin:left] [transform:rotateX(10deg)_rotateY(-45deg)] [transform-style:preserve-3d] transition-all duration-200 ease-out will-change-transform">
          <img src="/svgs/fa.svg" alt="فارسی" className="h-4 w-4" />
        </span>
      </span>
    </label>
  );
}
