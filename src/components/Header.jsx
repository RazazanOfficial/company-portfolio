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
    <header className="relative z-20 px-4 pt-6 flex items-center justify-around gap-3">
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
                    "block rounded-3xl px-4 py-2 text-sm leading-6 transition-all border",
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
        width="12%"
        src="/pics/full_text_logo.png"
        className="bg-[#ffbdbd17] py-1 px-1 rounded-md"
      />
    </header>
  );
}
