import Studio from './components/Studio'
import FAQ from './components/FAQ'

const COPYRIGHT_YEAR = new Date().getFullYear()

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 bg-black/30 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <a href="/" className="flex items-center gap-2 font-display text-lg text-marigold">
            <span aria-hidden>☠</span> Catrina AI
          </a>
          <nav className="flex gap-4 text-sm text-cream/70">
            <a href="#studio" className="hover:text-marigold">
              Studio
            </a>
            <a href="#faq" className="hover:text-marigold">
              FAQ
            </a>
            <a
              href="https://hukxmike.gumroad.com/l/catrina-prompts"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-marigold"
            >
              Prompt pack
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-white/5">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                'radial-gradient(circle at 20% 20%, rgba(244,163,0,0.25), transparent 40%), radial-gradient(circle at 80% 10%, rgba(232,93,138,0.18), transparent 35%)',
            }}
          />
          <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:py-20">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-marigold/80">
              Día de Muertos 2026 · Free browser tool
            </p>
            <h1 className="font-display text-5xl leading-tight text-cream sm:text-6xl">
              Catrina AI
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-cream/75">
              Free Día de Muertos sugar-skull look studio — try Classic Black Marigold, Pink Rose, or
              Golden Skull on your selfie, then copy Nano Banana &amp; Gemini prompts.
            </p>
            <p className="mt-3 text-sm text-rose/90">Estudio gratis de look Catrina</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#studio"
                className="rounded-full bg-marigold px-6 py-3 text-sm font-semibold text-ink hover:bg-marigold-deep"
              >
                Open the studio
              </a>
              <a
                href="#faq"
                className="rounded-full border border-white/20 px-6 py-3 text-sm text-cream/80 hover:border-marigold/40"
              >
                Read the FAQ
              </a>
            </div>
          </div>
        </section>

        <Studio />
        <FAQ />

        <section className="mx-auto max-w-3xl px-4 pb-16">
          <div className="rounded-2xl border border-marigold/25 bg-gradient-to-br from-marigold/15 to-transparent p-6 text-center sm:p-8">
            <h2 className="font-display text-2xl text-marigold">50 Catrina prompts + CapCut tips</h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-cream/70">
              Marigold crowns, ofrenda scenes, duo poses, and short video directions — ready to paste.
              Soft upsell while the holiday window is open.
            </p>
            <a
              href="https://hukxmike.gumroad.com/l/catrina-prompts"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block rounded-full bg-rose px-6 py-3 text-sm font-semibold text-white hover:bg-rose-deep"
            >
              Buy the $9 pack on Gumroad
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/40 px-4 py-8 text-center text-xs leading-relaxed text-cream/45">
        <p>
          Unofficial fan tool for Día de Muertos / Day of the Dead. Not affiliated with Google, Gemini,
          Nano Banana, CapCut, or any AI vendor. Treat La Catrina and Día de Muertos respectfully —
          celebration and remembrance, never mockery.
        </p>
        <p className="mt-2">
          Photos processed locally in your browser. © {COPYRIGHT_YEAR} Catrina AI Look Studio
        </p>
      </footer>
    </div>
  )
}
