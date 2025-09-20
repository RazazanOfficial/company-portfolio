// components/Header.jsx
import ThemeToggle from "@/components/ThemeToggle";

/** Minimal header with theme-aware styling and a toggle */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        {/* Brand (Tailwind token colors) */}
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-brand-800" aria-hidden="true" />
          <span className="font-semibold text-text">Digital Age Store</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden sm:inline-flex items-center px-3 py-2 rounded-xl border border-border bg-surface text-text hover:opacity-80 transition"
          >
            Docs
          </a>

          {/* Theme switcher (client component) */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
