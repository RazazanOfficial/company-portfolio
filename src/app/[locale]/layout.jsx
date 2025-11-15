import "@/styles/globals.css";
import "@/styles/hamster.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { sora, vazir } from "./fonts";
import LoadingOverlay from "@/components/LoadingOverlay";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LOCALES = ["en", "fa"];
export function generateStaticParams() {
  return LOCALES.map((l) => ({ locale: l }));
}

export const metadata = {
  title: "فروشگاه عصر دیجیتال",
  description: "سایت رسمی فروشگاه عصر دیجیتال",
  keywords: "فروشگاه, عصر دیجیتال, فروشگاه عصر دیجیتال",
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
  // unstable_setRequestLocale(locale);
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
        <noscript>
          <meta httpEquiv="refresh" content={`0; url=/${locale}/enable-js`} />
        </noscript>
      </head>
      <body className="antialiased min-h-screen">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LoadingOverlay />
          <section className="relative overflow-hidden">
          {/* نکته: container حذف شد تا صفحات خودشان تصمیم بگیرند */}
      <Header />

          <main id="app-root" aria-busy="false" className="relative z-0">
            {children}
          </main>
          <Footer/>
          </section>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
