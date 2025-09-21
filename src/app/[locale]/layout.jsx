// app/[locale]/layout.jsx
import "@/styles/globals.css";
import "@/styles/hamster.css"; // CSS فقط اینجا ایمپورت می‌شود تا دوباره‌کاری نشود
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { sora, vazir } from "./fonts";
import LoadingOverlay from "@/components/LoadingOverlay";

const LOCALES = ["en", "fa"];
export function generateStaticParams() {
  return LOCALES.map((l) => ({ locale: l }));
}

export const metadata = {
  title: "فروشگاه عصر دیجیتال",
  description: "سایت رسمی فروشگاه عصر دیجیتال",
  keywords: "فروشگاه, عصر دیجیتال, فروشگاه عصر دیجیتال"
};

const themeScript = `
(function () {
  try {
    var t = localStorage.getItem('theme');
    if (!t) {
      t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {}
})();
`;

export default async function LocaleLayout({ children, params: { locale } }) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      dir={locale === "fa" ? "rtl" : "ltr"}
      className={`${vazir.variable} ${sora.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* اوورلی لودینگ سراسری */}
          <LoadingOverlay />
          {/* ریشه‌ی محتوا؛ LoadingOverlay روی این عنصر aria-busy را مدیریت می‌کند */}
          <main id="app-root" aria-busy="false">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
