import { useCallback, useEffect, useRef, useState } from 'react'
import { PRESETS, getPreset, type PresetId } from '../presets'
import { drawCatrinaOverlay } from '../drawOverlay'

export default function Studio() {
  const [presetId, setPresetId] = useState<PresetId>('classic')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)

  const preset = getPreset(presetId)

  const redraw = useCallback(() => {
    const canvas = canvasRef.current
    const img = imgRef.current
    if (!canvas || !img) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const max = 900
    const scale = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight))
    const w = Math.round(img.naturalWidth * scale)
    const h = Math.round(img.naturalHeight * scale)
    canvas.width = w
    canvas.height = h
    ctx.clearRect(0, 0, w, h)
    ctx.drawImage(img, 0, 0, w, h)
    drawCatrinaOverlay(ctx, w, h, getPreset(presetId))
  }, [presetId])

  useEffect(() => {
    if (imageUrl) redraw()
  }, [imageUrl, redraw])

  const onFile = (file: File | null) => {
    if (!file || !file.type.startsWith('image/')) return
    if (imageUrl) URL.revokeObjectURL(imageUrl)
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      imgRef.current = img
      setImageUrl(url)
    }
    img.src = url
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    onFile(e.dataTransfer.files?.[0] ?? null)
  }

  const copyText = async (label: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(label)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      // fallback
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(label)
      setTimeout(() => setCopied(null), 2000)
    }
  }

  const download = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const a = document.createElement('a')
    a.download = `catrina-ai-${presetId}.png`
    a.href = canvas.toDataURL('image/png')
    a.click()
  }

  return (
    <section id="studio" className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPresetId(p.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              presetId === p.id
                ? 'border-marigold bg-marigold/20 text-marigold'
                : 'border-white/15 bg-white/5 text-cream/80 hover:border-marigold/40'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>
      <p className="mb-6 text-sm text-cream/70">{preset.blurb}</p>

      <div className="grid gap-6 lg:grid-cols-2">
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          className="relative flex min-h-[360px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/40"
        >
          {!imageUrl ? (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex flex-col items-center gap-3 px-6 py-16 text-center"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-marigold/40 bg-marigold/10 text-2xl text-marigold">
                ✿
              </span>
              <span className="text-lg font-medium text-cream">Upload a selfie</span>
              <span className="max-w-xs text-sm text-cream/60">
                Drag & drop or click. Processed only in your browser — nothing is uploaded to a server.
              </span>
            </button>
          ) : (
            <>
              <canvas ref={canvasRef} className="max-h-[520px] w-full object-contain" />
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="rounded-lg bg-black/70 px-3 py-1.5 text-xs text-cream backdrop-blur hover:bg-black/90"
                >
                  Change photo
                </button>
                <button
                  type="button"
                  onClick={download}
                  className="rounded-lg bg-marigold px-3 py-1.5 text-xs font-semibold text-ink hover:bg-marigold-deep"
                >
                  Download PNG
                </button>
              </div>
            </>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onFile(e.target.files?.[0] ?? null)}
          />
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="font-display text-xl text-marigold">Copy AI prompts</h2>
          <p className="text-sm text-cream/65">
            Paste into Nano Banana, Gemini, or any image model with your selfie as the face reference.
            Prompts match the <strong className="text-cream">{preset.name}</strong> look.
          </p>

          <button
            type="button"
            onClick={() => copyText('nano', preset.nanoBananaPrompt)}
            className="rounded-xl border border-marigold/40 bg-marigold/15 px-4 py-3 text-left transition hover:bg-marigold/25"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-marigold">Copy Nano Banana prompt</span>
              <span className="text-xs text-cream/50">{copied === 'nano' ? 'Copied!' : 'clipboard'}</span>
            </div>
            <p className="mt-1 line-clamp-3 text-xs text-cream/55">{preset.nanoBananaPrompt}</p>
          </button>

          <button
            type="button"
            onClick={() => copyText('gemini', preset.geminiPrompt)}
            className="rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-left transition hover:bg-gold/20"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-gold">Copy Gemini prompt</span>
              <span className="text-xs text-cream/50">{copied === 'gemini' ? 'Copied!' : 'clipboard'}</span>
            </div>
            <p className="mt-1 line-clamp-3 text-xs text-cream/55">{preset.geminiPrompt}</p>
          </button>

          <div className="mt-auto rounded-xl border border-rose/30 bg-rose/10 p-4">
            <p className="text-sm font-medium text-rose">Want 50 ready-made prompts?</p>
            <p className="mt-1 text-xs text-cream/60">
              Catrina / marigold / ofrenda pack + CapCut tips — $9 on Gumroad.
            </p>
            <a
              href="https://hukxmike.gumroad.com/l/catrina-prompts"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block rounded-lg bg-rose px-4 py-2 text-sm font-semibold text-white hover:bg-rose-deep"
            >
              Get the prompt pack →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
