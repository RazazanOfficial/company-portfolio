// src/app/[locale]/gallery/page.tsx
import FeatureBento from "@/components/FeatureBento"
import { getTranslations } from "next-intl/server"

export default async function page({ params }) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "HomePage.sections.grids"
  })

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:px-8 gallery-shell">
      <header className="mb-8 space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {t("sectionTitle")}
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          {/* اگر خواستی می‌تونی یه متن توضیحی جدا برای گالری در json بذاری */}
          {/* فعلاً یه توضیح کوتاه ثابت گذاشتم */}
          Explore all categories and see highlighted work across our services.
        </p>
      </header>

      {/* همون گرید کتگوری‌ها */}
      <FeatureBento />
    </main>
  )
}
