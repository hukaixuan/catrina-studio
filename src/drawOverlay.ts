import type { Preset } from './presets'

/** Draw respectful sugar-skull / marigold overlays centered on a typical selfie face oval. */
export function drawCatrinaOverlay(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  preset: Preset,
): void {
  const cx = w * 0.5
  const cy = h * 0.42
  const faceW = Math.min(w, h) * 0.38
  const faceH = faceW * 1.25
  const { primary, secondary, accent, ink, glow } = preset.colors

  ctx.save()

  // Soft vignette for mood
  const vig = ctx.createRadialGradient(cx, cy, faceW * 0.2, cx, cy, Math.max(w, h) * 0.7)
  vig.addColorStop(0, 'rgba(0,0,0,0)')
  vig.addColorStop(1, 'rgba(10,5,3,0.35)')
  ctx.fillStyle = vig
  ctx.fillRect(0, 0, w, h)

  // Semi-transparent face wash (makeup base)
  ctx.beginPath()
  ctx.ellipse(cx, cy, faceW, faceH, 0, 0, Math.PI * 2)
  const wash = ctx.createRadialGradient(cx, cy - faceH * 0.1, faceW * 0.2, cx, cy, faceW)
  if (preset.id === 'classic') {
    wash.addColorStop(0, 'rgba(20,20,20,0.55)')
    wash.addColorStop(1, 'rgba(10,10,10,0.15)')
  } else if (preset.id === 'pink') {
    wash.addColorStop(0, 'rgba(232,93,138,0.35)')
    wash.addColorStop(1, 'rgba(255,248,239,0.08)')
  } else {
    wash.addColorStop(0, 'rgba(212,175,55,0.40)')
    wash.addColorStop(1, 'rgba(244,163,0,0.08)')
  }
  ctx.fillStyle = wash
  ctx.fill()

  // Eye sockets (petal shapes)
  const eyeY = cy - faceH * 0.12
  const eyeDx = faceW * 0.38
  const eyeR = faceW * 0.22
  drawEyeSocket(ctx, cx - eyeDx, eyeY, eyeR, ink, accent, secondary)
  drawEyeSocket(ctx, cx + eyeDx, eyeY, eyeR, ink, accent, secondary)

  // Heart nose
  drawHeartNose(ctx, cx, cy + faceH * 0.05, faceW * 0.12, secondary, ink)

  // Smile / teeth suggestion (subtle, respectful)
  drawSmileLines(ctx, cx, cy + faceH * 0.28, faceW * 0.35, accent, ink)

  // Cheek filigree
  drawFiligree(ctx, cx - faceW * 0.72, cy + faceH * 0.05, faceW * 0.22, secondary, accent)
  drawFiligree(ctx, cx + faceW * 0.72, cy + faceH * 0.05, faceW * 0.22, secondary, accent, true)

  // Forehead flourish
  drawForeheadFlourish(ctx, cx, cy - faceH * 0.55, faceW * 0.45, secondary, accent, ink)

  // Marigold / rose crown
  drawFlowerCrown(ctx, cx, cy - faceH * 0.85, faceW * 1.35, preset)

  // Soft glow ring
  ctx.globalCompositeOperation = 'screen'
  const ring = ctx.createRadialGradient(cx, cy, faceW * 0.9, cx, cy, faceW * 1.4)
  ring.addColorStop(0, hexAlpha(glow, 0))
  ring.addColorStop(0.6, hexAlpha(glow, 0.12))
  ring.addColorStop(1, hexAlpha(glow, 0))
  ctx.fillStyle = ring
  ctx.beginPath()
  ctx.ellipse(cx, cy, faceW * 1.4, faceH * 1.35, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.globalCompositeOperation = 'source-over'

  // Label badge
  ctx.font = `600 ${Math.max(12, Math.round(w * 0.028))}px system-ui, sans-serif`
  ctx.fillStyle = hexAlpha(primary, 0.85)
  const label = preset.name
  const tw = ctx.measureText(label).width
  const pad = 10
  const bx = w - tw - pad * 2 - 16
  const by = h - 36
  roundRect(ctx, bx, by, tw + pad * 2, 28, 8)
  ctx.fill()
  ctx.fillStyle = accent
  ctx.fillText(label, bx + pad, by + 19)

  ctx.restore()
}

function hexAlpha(hex: string, a: number): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${a})`
}

function drawEyeSocket(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  ink: string,
  accent: string,
  petal: string,
): void {
  ctx.save()
  // Dark socket
  ctx.beginPath()
  ctx.ellipse(x, y, r, r * 0.85, 0, 0, Math.PI * 2)
  ctx.fillStyle = hexAlpha(ink, 0.75)
  ctx.fill()
  // Petal ring
  const petals = 8
  for (let i = 0; i < petals; i++) {
    const a = (i / petals) * Math.PI * 2
    const px = x + Math.cos(a) * r * 0.95
    const py = y + Math.sin(a) * r * 0.8
    ctx.beginPath()
    ctx.ellipse(px, py, r * 0.28, r * 0.18, a, 0, Math.PI * 2)
    ctx.fillStyle = hexAlpha(petal, 0.85)
    ctx.fill()
  }
  // Inner highlight ring
  ctx.beginPath()
  ctx.ellipse(x, y, r * 0.55, r * 0.45, 0, 0, Math.PI * 2)
  ctx.strokeStyle = hexAlpha(accent, 0.9)
  ctx.lineWidth = Math.max(1.5, r * 0.08)
  ctx.stroke()
  ctx.restore()
}

function drawHeartNose(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  fill: string,
  ink: string,
): void {
  ctx.save()
  ctx.beginPath()
  const top = y - s * 0.35
  ctx.moveTo(x, y + s * 0.55)
  ctx.bezierCurveTo(x - s, y + s * 0.1, x - s * 0.9, top, x, top + s * 0.35)
  ctx.bezierCurveTo(x + s * 0.9, top, x + s, y + s * 0.1, x, y + s * 0.55)
  ctx.closePath()
  ctx.fillStyle = hexAlpha(fill, 0.95)
  ctx.fill()
  ctx.strokeStyle = hexAlpha(ink, 0.7)
  ctx.lineWidth = Math.max(1, s * 0.08)
  ctx.stroke()
  ctx.restore()
}

function drawSmileLines(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  accent: string,
  ink: string,
): void {
  ctx.save()
  ctx.strokeStyle = hexAlpha(accent, 0.85)
  ctx.lineWidth = Math.max(1.5, w * 0.04)
  ctx.beginPath()
  ctx.moveTo(x - w, y)
  ctx.quadraticCurveTo(x, y + w * 0.35, x + w, y)
  ctx.stroke()
  // Subtle stitch marks
  ctx.strokeStyle = hexAlpha(ink, 0.55)
  ctx.lineWidth = Math.max(1, w * 0.025)
  const n = 7
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1)
    const sx = x - w + t * w * 2
    const sy = y + Math.sin(t * Math.PI) * w * 0.22
    ctx.beginPath()
    ctx.moveTo(sx, sy - w * 0.08)
    ctx.lineTo(sx, sy + w * 0.08)
    ctx.stroke()
  }
  ctx.restore()
}

function drawFiligree(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  a: string,
  b: string,
  mirror = false,
): void {
  ctx.save()
  ctx.translate(x, y)
  if (mirror) ctx.scale(-1, 1)
  ctx.strokeStyle = hexAlpha(a, 0.9)
  ctx.lineWidth = Math.max(1.2, s * 0.08)
  ctx.beginPath()
  ctx.arc(0, 0, s, -0.8, 0.8)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(s * 0.35, -s * 0.2, s * 0.45, -1.2, 0.6)
  ctx.stroke()
  ctx.fillStyle = hexAlpha(b, 0.85)
  ctx.beginPath()
  ctx.arc(0, s * 0.15, s * 0.12, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

function drawForeheadFlourish(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  a: string,
  b: string,
  ink: string,
): void {
  ctx.save()
  ctx.strokeStyle = hexAlpha(a, 0.9)
  ctx.lineWidth = Math.max(1.5, w * 0.04)
  ctx.beginPath()
  ctx.moveTo(x - w, y)
  ctx.quadraticCurveTo(x, y - w * 0.35, x + w, y)
  ctx.stroke()
  // Center diamond
  ctx.beginPath()
  ctx.moveTo(x, y - w * 0.22)
  ctx.lineTo(x + w * 0.12, y)
  ctx.lineTo(x, y + w * 0.18)
  ctx.lineTo(x - w * 0.12, y)
  ctx.closePath()
  ctx.fillStyle = hexAlpha(b, 0.9)
  ctx.fill()
  ctx.strokeStyle = hexAlpha(ink, 0.6)
  ctx.lineWidth = 1
  ctx.stroke()
  ctx.restore()
}

function drawFlowerCrown(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  width: number,
  preset: Preset,
): void {
  const count = 9
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1)
    const angle = -Math.PI * 0.85 + t * Math.PI * 0.7
    const r = width * 0.55
    const x = cx + Math.cos(angle) * r
    const y = cy + Math.sin(angle) * r * 0.55 + Math.sin(t * Math.PI) * width * 0.04
    const size = width * (0.09 + Math.sin(t * Math.PI) * 0.05)
    if (preset.id === 'pink') {
      drawRose(ctx, x, y, size, preset.colors.primary, preset.colors.secondary, preset.colors.accent)
    } else {
      drawMarigold(ctx, x, y, size, preset.colors.secondary, preset.colors.glow, preset.colors.accent)
    }
  }
}

function drawMarigold(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  outer: string,
  mid: string,
  center: string,
): void {
  ctx.save()
  const layers = 3
  for (let L = 0; L < layers; L++) {
    const petals = 10 + L * 2
    const rad = s * (1 - L * 0.22)
    for (let i = 0; i < petals; i++) {
      const a = (i / petals) * Math.PI * 2 + L * 0.2
      const px = x + Math.cos(a) * rad * 0.55
      const py = y + Math.sin(a) * rad * 0.55
      ctx.beginPath()
      ctx.ellipse(px, py, rad * 0.35, rad * 0.18, a, 0, Math.PI * 2)
      ctx.fillStyle = hexAlpha(L === 0 ? outer : mid, 0.92 - L * 0.15)
      ctx.fill()
    }
  }
  ctx.beginPath()
  ctx.arc(x, y, s * 0.18, 0, Math.PI * 2)
  ctx.fillStyle = hexAlpha(center, 0.95)
  ctx.fill()
  ctx.restore()
}

function drawRose(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  outer: string,
  mid: string,
  center: string,
): void {
  ctx.save()
  for (let i = 5; i >= 1; i--) {
    ctx.beginPath()
    ctx.arc(x, y, s * (0.25 + i * 0.12), 0, Math.PI * 2)
    ctx.strokeStyle = hexAlpha(i > 3 ? outer : mid, 0.85)
    ctx.lineWidth = s * 0.14
    ctx.stroke()
  }
  ctx.beginPath()
  ctx.arc(x, y, s * 0.15, 0, Math.PI * 2)
  ctx.fillStyle = hexAlpha(center, 0.9)
  ctx.fill()
  ctx.restore()
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}
