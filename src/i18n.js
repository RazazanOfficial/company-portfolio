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

// import { notFound } from "next/navigation"
// import { getRequestConfig } from "next-intl/server"

// const LOCALES = ["en", "fa"]

// const REMOTE_MESSAGE_URLS = {
//   fa: "https://s31.uupload.ir/files/razazanofficial/fa.json",
//   en: "https://s31.uupload.ir/files/razazanofficial/en.json"
// }

// export default getRequestConfig(async ({ locale }) => {
//   if (!LOCALES.includes(locale)) notFound()

//   const url = REMOTE_MESSAGE_URLS[locale]

//   const res = await fetch(url, {
//     // می‌خوای ترجمه‌ها بدون ری‌دیپلوی آپدیت شن:
//     // هر 60 ثانیه یک بار رفرش کنه
//     next: { revalidate: 60 }
//     // اگر می‌خوای همیشه تازه بگیره: cache: "no-store"
//   })

//   if (!res.ok) {
//     throw new Error(
//       `Failed to load messages for locale "${locale}" from ${url}`
//     )
//   }

//   const messages = await res.json()

//   return {
//     locale,
//     messages
//   }
// })
