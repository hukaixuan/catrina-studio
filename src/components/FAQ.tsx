const FAQS: { q: string; a: string }[] = [
  {
    q: 'What is Catrina AI?',
    a: 'Catrina AI is a free browser tool for Día de Muertos (Day of the Dead). Upload a selfie to preview respectful sugar-skull / La Catrina looks with marigold overlays, then copy Nano Banana or Gemini prompts to generate polished AI images or video frames. No account required; photos stay on your device.',
  },
  {
    q: 'How do I make a Catrina AI video?',
    a: 'Start here: pick a look, upload a clear front-facing selfie, download the overlay preview or copy the matching prompt. Paste the prompt into an image model (Nano Banana / Gemini) with your photo as the face reference, then animate the still in CapCut or any image-to-video app using a slow push-in and warm candlelight. For 50 CapCut-ready prompt + tip combos, see the Gumroad pack.',
  },
  {
    q: 'What is a good Catrina AI prompt?',
    a: 'A strong Catrina AI prompt names La Catrina / sugar-skull makeup, marigold (cempasúchil) crown, respectful Día de Muertos tone, photorealistic lighting, and explicitly says to keep the uploaded face identity. Avoid horror or gore language. This studio’s Copy Nano Banana / Copy Gemini buttons insert that structure for you.',
  },
  {
    q: 'Is there a free Día de Muertos AI generator?',
    a: 'Yes — this Catrina AI look studio is free. It gives instant client-side try-on overlays plus copy-paste prompts. Full AI image/video rendering still happens in your chosen free-tier model (Gemini, Nano Banana, etc.). Paid video farms exist, but you do not need them for a solid social post.',
  },
  {
    q: 'Is there a free Catrina filter?',
    a: 'This page works like a free Catrina filter in the browser: Classic Black Marigold, Pink Rose, and Golden Skull presets drawn on your selfie with Canvas. Download a PNG or escalate to AI with the built-in prompts. Nothing is uploaded to our servers.',
  },
  {
    q: 'What does La Catrina mean for Día de Muertos?',
    a: 'La Catrina is an iconic elegant skeleton figure associated with Mexican Día de Muertos celebrations — a reminder that death is part of life, often honored with marigolds, ofrendas, and family remembrance. Use Catrina looks respectfully; this tool is an unofficial fan studio, not a cultural authority.',
  },
  {
    q: 'Does Catrina AI work with Nano Banana and Gemini?',
    a: 'Yes. Each preset includes a “Copy Nano Banana prompt” and “Copy Gemini prompt” button with face-reference instructions. Paste into those tools (or similar) along with your selfie. Results vary by model version; refine with “softer makeup” or “more marigold crown” if needed.',
  },
  {
    q: 'Do you sell my photos or train on them?',
    a: 'No. Overlays run entirely in your browser via HTML Canvas. We do not receive, store, or train on your selfies. Prompt copy uses local clipboard only. The optional Gumroad pack is a separate digital download of text prompts.',
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-14">
      <h2 className="mb-2 font-display text-3xl text-marigold">Catrina AI FAQ</h2>
      <p className="mb-8 text-sm text-cream/60">
        Straight answers for searchers asking about Catrina AI, prompts, filters, and Día de Muertos generators.
      </p>
      <div className="space-y-3">
        {FAQS.map((item) => (
          <details
            key={item.q}
            className="group rounded-xl border border-white/10 bg-white/5 px-4 py-3 open:border-marigold/30"
          >
            <summary className="cursor-pointer list-none font-medium text-cream marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-3">
                {item.q}
                <span className="text-marigold transition group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-cream/70">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
