import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import Link from "next/link"
import GalleryCategoryGrid from "@/components/GalleryCategoryGrid"

export default async function GalleryCategoryPage({ params }) {
  const { locale, category } = params

  // اطلاعات متای کتگوری (از grids)
  const tGrids = await getTranslations({
    locale,
    namespace: "HomePage.sections.grids"
  })

  // اطلاعات محصولات کتگوری (از Gallery)
  const tGallery = await getTranslations({
    locale,
    namespace: "Gallery"
  })

  // دیتاهای مربوط به کتگوری از Gallery (fa/en.json)
  const categoryData = tGallery.raw(`categories.${category}`)

  if (!categoryData) {
    notFound()
  }

  const { label, description, products } = categoryData

  // اگر خواستی از grids هم title/desc اضافه بگیری:
  const gridsSteps = tGrids.raw("steps") || []
  const metaFromGrids = gridsSteps.find(s => s.key === category)

  const pageTitle = metaFromGrids?.title || label
  const pageDesc = metaFromGrids?.desc || description

  return (
    <main className="gallery-shell gallery-shell--detail">
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 md:px-8">
        {/* برگشت به همه کتگوری‌ها */}
        <div className="mb-6 text-sm text-neutral-500">
          <Link
            href={`/${locale}/gallery`}
            className="hover:text-neutral-100"
          >
            ← بازگشت به همه دسته‌بندی‌ها
          </Link>
        </div>

        {/* هدر کتگوری */}
        <header className="mb-8 space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {pageTitle}
          </h1>
          {pageDesc && (
            <p className="max-w-2xl text-sm text-text-muted">
              {pageDesc}
            </p>
          )}
        </header>

        {/* گرید محصولات (کامپوننت کلاینت) */}
        <GalleryCategoryGrid products={products} />
      </div>
    </main>
  )
}
