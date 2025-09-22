import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

const LOCALES = ["en", "fa"];

export default getRequestConfig(async ({ locale }) => {
  if (!LOCALES.includes(locale)) notFound();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
