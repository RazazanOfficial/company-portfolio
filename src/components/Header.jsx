import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("Header")
  return (
    <header className="flex mt-6">
      <ThemeToggle />
      <nav className="w-fit mx-auto bg-transparent rounded-4xl border-2 border-brand-800">
      <ul className="flex justify-center items-center gap-2 py-2 px-2">
        <li className="border-[1px] border-brand-500 py-2 px-4 rounded-4xl">{t("HomePage")}</li>
        <li className="border-[1px] border-brand-500 py-2 px-4 rounded-4xl">{t("Gallery")}</li>
        <li className="border-[1px] border-brand-500 py-2 px-4 rounded-4xl">{t("AboutUs")}</li>
        <li className="border-[1px] border-brand-500 py-2 px-4 rounded-4xl">{t("ContactUs")}</li>
      </ul>
      </nav>
      <LanguageToggle />
    </header>
  );
}
