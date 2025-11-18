"use client"

import { useEffect, useState } from "react"
import { X, Download, Link2, ChevronLeft, ChevronRight } from "lucide-react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useTranslations } from "next-intl"

export default function GalleryCategoryGrid({ products }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeProduct, setActiveProduct] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const t = useTranslations("toastify");
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <p className="text-sm text-neutral-500">
        محصولی برای این دسته‌بندی ثبت نشده است.
      </p>
    )
  }

  const openLightbox = (product, index = 0) => {
    setActiveProduct(product)
    setActiveIndex(index)
    setIsOpen(true)
  }

  const closeLightbox = () => {
    setIsOpen(false)
    setActiveProduct(null)
    setActiveIndex(0)
  }

  const goNext = () => {
    if (!activeProduct) return
    setActiveIndex(prev => (prev + 1) % activeProduct.images.length)
  }

  const goPrev = () => {
    if (!activeProduct) return
    const len = activeProduct.images.length
    setActiveIndex(prev => (prev - 1 + len) % len)
  }

  const handleDownload = () => {
    if (!activeProduct) return
    const src = activeProduct.images[activeIndex]
    if (!src) return

    const link = document.createElement("a")
    link.href = src
    link.download = ""
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast.info(t("download"), {
        position: "top-center",
        autoClose: 2200,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
    })
  }

  const handleCopyLink = async () => {
    if (!activeProduct) return
    const src = activeProduct.images[activeIndex]
    if (!src) return

    try {
      await navigator.clipboard?.writeText(src)
      toast.success(t("copy"), {
        position: "top-center",
        autoClose: 2200,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      })
    } catch (e) {
      toast.error(t("copyFiled"), {
        position: "top-center",
        autoClose: 2200,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      })
    }
  }

  // ESC / ArrowLeft / ArrowRight
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = e => {
      if (e.key === "Escape") {
        closeLightbox()
      } else if (e.key === "ArrowRight") {
        goNext()
      } else if (e.key === "ArrowLeft") {
        goPrev()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen, activeProduct])

  // قفل اسکرول پشت لایت‌باکس
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [isOpen])

  return (
    <>
      {/* اگر قبلاً ToastContainer جای دیگری داری، این بلوک را بردار */}
      <ToastContainer />

      {/* گرید محصولات – ۲ تا در هر ردیف */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {products.map(product => {
          const images = product.images || []
          const primary = images[0]
          const hover = images[1]

          return (
            <button
              key={product.id}
              type="button"
              onClick={() => openLightbox(product, 0)}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200/70 bg-white/80 text-left shadow-sm transform scale-[0.98] transition duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:scale-[0.98] focus-visible:-translate-y-1 focus-visible:shadow-xl focus-visible:scale-[0.96] dark:border-neutral-800/70 dark:bg-neutral-900/80"
            >
              <div className="relative h-64 w-full overflow-hidden">
                {/* عکس اصلی */}
                {primary && (
                  <img
                    src={primary}
                    alt={product.label}
                    className="fade-image h-full w-full object-cover group-hover:opacity-0"
                  />
                )}

                {/* عکس hover با fade نرم */}
                {hover && (
                  <img
                    src={hover}
                    alt={product.label}
                    className="fade-image absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
                  />
                )}

                {/* ماسک تیره‌تر + دکمه «نمایش» */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center fade-overlay opacity-0 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-black/65" />
                  <span className="pointer-events-auto relative inline-flex items-center justify-center rounded-full bg-white/95 px-4 py-1 text-xs font-medium text-neutral-900 shadow-sm transition hover:bg-white">
                    نمایش
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {product.label}
                </h2>
              </div>
            </button>
          )
        })}
      </section>

      {/* لایت‌باکس / اسلایدشو */}
      {isOpen && activeProduct && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/70 px-4 py-6 sm:px-6"
          onClick={closeLightbox}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-neutral-950/95 p-4 shadow-2xl ring-1 ring-white/10 transition-all duration-300 ease-out sm:p-6"
            onClick={e => e.stopPropagation()}
          >
            {/* نوار بالایی */}
            <div className="mb-4 flex items-center justify بین gap-4">
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold text-white">
                  {activeProduct.label}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs text-white transition hover:bg-white/20"
                  title="دانلود"
                >
                  <Download className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs text-white transition hover:bg-white/20"
                  title="کپی لینک"
                >
                  <Link2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs text-white transition hover:bg-white/20"
                  title="بستن"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* تصویر اصلی + کنترل‌ها */}
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="relative flex items-center justify-center">
                {/* قبلی */}
                {activeProduct.images.length > 1 && (
                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white shadow-md transition hover:bg-white/25"
                    title="قبلی"
                  >
                    <ChevronLeft className="ه-5 w-5" />
                  </button>
                )}

                {/* ظرف ثابت برای تصویر */}
                <div className="relative flex h-[55vh] w-full items-center justify-center overflow-hidden rounded-xl bg-black/70 md:h-[65vh]">
                  <img
                    src={activeProduct.images[activeIndex]}
                    alt={activeProduct.label}
                    className="fade-image-main max-h-full max-w-full object-contain"
                  />
                </div>

                {/* بعدی */}
                {activeProduct.images.length > 1 && (
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white shadow-md transition hover:bg-white/25"
                    title="بعدی"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* thumbnailها */}
              {activeProduct.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                  {activeProduct.images.map((src, index) => {
                    const isActive = index === activeIndex
                    return (
                      <button
                        key={src + index}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={
                          "relative aspect-square overflow-hidden rounded-lg border transition " +
                          (isActive
                            ? "border-blue-400 ring-2 ring-blue-400/60"
                            : "border-white/10 hover:border-white/40")
                        }
                      >
                        <img
                          src={src}
                          alt={activeProduct.label}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
