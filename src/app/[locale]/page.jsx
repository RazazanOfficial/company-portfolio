"use client";

import { useTranslations } from "next-intl";
import Header from "@/components/Header";

export default function Page() {
  const t = useTranslations("HomePage");

  return (
    <>
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        <header className="mb-4">
          <h1 className="text-2xl font-bold text-text">{t("title")}</h1>
        </header>

        <section>
          <h2 className="text-xl font-semibold text-text mb-4">
            Using Tailwind tokens (mapped from @theme)
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-border bg-surface p-5">
              <h3 className="text-lg font-medium text-text">Card (tokens)</h3>
              <p className="mt-2 text-text-muted">
                Colors come from tokens like <code>bg-surface</code>,{" "}
                <code>text-text</code>, <code>border-border</code>.
              </p>

              <div className="mt-4 flex items-center gap-3">
                <button className="px-4 py-2 rounded-xl bg-accent text-accent-contrast hover:opacity-90 transition">
                </button>
                <button className="px-4 py-2 rounded-xl border border-border text-text hover:bg-surface/70 transition">
                </button>
              </div>

              <div className="mt-5 h-2 w-full rounded-full bg-brand-800/20">
                <div className="h-2 w-1/2 rounded-full bg-brand-800" />
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-5">
              <h3 className="text-lg font-medium text-text">State chips</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs bg-brand-800/10 text-brand-800">
                  Neutral
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs bg-accent/15 text-accent">
                  Accent
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs border border-border text-text">
                  Outline
                </span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--text)] mb-4">
            Using raw CSS variables (direct)
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <h3 className="text-lg font-medium text-[var(--text)]">Card (raw vars)</h3>
              <p className="mt-2 text-[var(--text-muted)]">
                Colors use <code>var(--surface)</code>, <code>var(--text)</code>,{" "}
                <code>var(--border)</code>.
              </p>

              <div className="mt-4 flex items-center gap-3">
                <button className="px-4 py-2 rounded-xl bg-[var(--accent)] text-[var(--accent-contrast)] hover:opacity-90 transition">
                </button>
                <button className="px-4 py-2 rounded-xl border border-[var(--border)] text-[var(--text)] hover:bg-[color-mix(in_srgb,var(--surface)_85%,transparent)] transition">
                </button>
              </div>

              <div className="mt-5 h-2 w-full rounded-full bg-[color-mix(in_srgb,var(--brand-800)_20%,transparent)]">
                <div className="h-2 w-2/3 rounded-full bg-[var(--brand-800)]" />
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <h3 className="text-lg font-medium text-[var(--text)]">List</h3>
              <ul className="mt-3 space-y-2">
                <li className="flex items-center justify-between p-3 rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_92%,transparent)]">
                  <span className="text-[var(--text)]">Item A</span>
                  <span className="text-[var(--text-muted)]">Meta</span>
                </li>
                <li className="flex items-center justify-between p-3 rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_92%,transparent)]">
                  <span className="text-[var(--text)]">Item B</span>
                  <span className="text-[var(--text-muted)]">Meta</span>
                </li>
                <li className="flex items-center justify-between p-3 rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_92%,transparent)]">
                  <span className="text-[var(--text)]">Item C</span>
                  <span className="text-[var(--text-muted)]">Meta</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
