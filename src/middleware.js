import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "fa"],
  defaultLocale: "en"
});

export const config = {
  // همه مسیرها به‌جز فایل‌های استاتیک/سیستمی
  matcher: ["/((?!_next|.*\\..*).*)"]
  // اگر /api داری و نمی‌خوای اینترنشنالایز شه، می‌تونی اینو بذاری:
  // matcher: ["/((?!_next|api|.*\\..*).*)"]
};
