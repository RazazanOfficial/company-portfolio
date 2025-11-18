"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import LanguageToggle from "@/components/LanguageToggle";

export default function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const pathname = usePathname() || "/";

  const current = pathname.replace(/^\/(fa|en)(?=\/|$)/, "") || "/";

  const links = [
    { label: t("HomePage"), slug: "/" },
    { label: t("Gallery"), slug: "/gallery" },
    { label: t("AboutUs"), slug: "/about" },
    { label: t("ContactUs"), slug: "/contact" },
  ];

  const isActive = (slug) => {
    if (slug === "/") return current === "/" || current === "";
    return current.startsWith(slug);
  };

  return (
    <>
      {/* نسخه‌ی دسکتاپ و تبلت */}
      <header className="hidden sm:flex relative items-center sm:justify-evenly justify-center md:px-4 gap-5 sm:gap-0 md:gap-3">
        <LanguageToggle />
        <nav className="rounded-full border border-brand-800/50 glass">
          <ul className="flex gap-1.5 py-1.5 px-1.5">
            {links.map(({ label, slug }) => {
              const active = isActive(slug);
              const href = slug === "/" ? `/${locale}` : `/${locale}${slug}`;
              return (
                <li key={slug}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "block rounded-3xl px-2 md:px-4 py-1 md:py-2 sm:text-sm leading-6 transition-all border",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60",
                      active
                        ? "bg-surface/100 border-brand-500/40 shadow-sm"
                        : "border-0 hover:border hover:border-brand-500/40 hover:bg-surface/80",
                    ].join(" ")}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <img
          src="/pics/full_text_logo.png"
          className="py-1 px-1 rounded-md 2xl:w-[100px] xl:w-[90px] md:w-[80px] sm:w-[65px]"
        />
      </header>

      {/* نسخه‌ی موبایل (کمتر از sm) */}
      <header className="flex flex-col items-center justify-center sm:hidden gap-3">
        {/* بالا: LanguageToggle و لوگو */}
        <div className="flex items-center justify-center gap-10 w-full px-6">
          <LanguageToggle />
          <img
            src="/pics/full_text_logo.png"
            className="px-1 rounded-md w-[50px]"
          />
        </div>

        {/* پایین: منو */}
        <nav className="rounded-full border border-brand-800/50 glass">
          <ul className="flex gap-1.5 py-1.5 px-1.5">
            {links.map(({ label, slug }) => {
              const active = isActive(slug);
              const href = slug === "/" ? `/${locale}` : `/${locale}${slug}`;
              return (
                <li key={slug}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "block rounded-3xl px-2 md:px-4 py-1 md:py-2 text-xs sm:text-sm leading-6 transition-all border",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60",
                      active
                        ? "bg-surface/100 border-brand-500/40 shadow-sm"
                        : "border-0 hover:border hover:border-brand-500/40 hover:bg-surface/80",
                    ].join(" ")}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
    </>
  );
}
