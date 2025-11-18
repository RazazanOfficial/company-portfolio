import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const Footer = () => {
  const f = useTranslations();
  const t = useTranslations();
    const locale = useLocale();
  
  return (
    <footer className="py-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--color-border)] pt-6">
        <span className="text-sm text-text-muted">
          © {new Date().getFullYear()} — {f("footer.rights")}
        </span>
        <nav className="flex flex-wrap items-center gap-3 text-sm">
          <Link href={`/${locale}`} className="hover:underline">
            {t("Header.HomePage")}
          </Link>
          <Link href={`/${locale}/gallery`} className="hover:underline">
            {t("Header.Gallery")}
          </Link>
          <Link href={`/${locale}/about`} className="hover:underline">
            {t("Header.AboutUs")}
          </Link>
          <Link href={`/${locale}/contact`} className="hover:underline">
            {t("Header.ContactUs")}
          </Link>
        </nav>
      </div>
    </footer>
  );
};
export default Footer;
