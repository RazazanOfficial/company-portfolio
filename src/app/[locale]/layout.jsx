// app/[locale]/layout.jsx
import "@/styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { sora, vazir } from "./fonts";

// اگر SSG لازم داری می‌تونی این رو نگه داری؛ در غیراینصورت می‌تونی حذفش کنی
const LOCALES = ["en", "fa"];
export function generateStaticParams() {
  return LOCALES.map((l) => ({ locale: l }));
}

// متادیتا دلخواه
export const metadata = {
  title: "فروشگاه عصر دیجیتال",
  description: "سایت رسمی فروشگاه عصر دیجیتال",
  keywords: "فروشگاه, عصر دیجیتال, فروشگاه عصر دیجیتال"
};

// جلوگیری از فلاش تم قبل از هیدریشن
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
  // خیلی مهم: قبل از getMessages، locale جاری را به next-intl ست کن
  unstable_setRequestLocale(locale);

  // صریحاً با locale بگیر تا اخطار نگیری
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
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
