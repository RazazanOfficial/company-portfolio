import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Supported locales
const LOCALES = ["en", "fa"];

export default getRequestConfig(async ({ locale }) => {
  // Validate locale
  if (!LOCALES.includes(locale)) notFound();

  return {
    // نکته‌ی مهم: حتماً locale را هم برگردان
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
