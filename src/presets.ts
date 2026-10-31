export type PresetId = 'classic' | 'pink' | 'golden'

export interface Preset {
  id: PresetId
  name: string
  blurb: string
  colors: {
    primary: string
    secondary: string
    accent: string
    ink: string
    glow: string
  }
  nanoBananaPrompt: string
  geminiPrompt: string
}

const faceRef =
  'Use the uploaded selfie as the face reference. Keep the same identity, bone structure, eye shape, and skin tone. Do not change age or gender.'

export const PRESETS: Preset[] = [
  {
    id: 'classic',
    name: 'Classic Black Marigold',
    blurb: 'Traditional La Catrina — black base, white sugar-skull lines, orange marigold crown.',
    colors: {
      primary: '#0a0a0a',
      secondary: '#f4a300',
      accent: '#fff8ef',
      ink: '#1a1a1a',
      glow: '#f4a300',
    },
    nanoBananaPrompt: `${faceRef}

Transform into elegant La Catrina makeup for Día de Muertos. Matte black face base with precise white sugar-skull linework: heart nose, petal eye sockets, ornate cheek filigree, thin smile lines. Crown of fresh orange marigolds (cempasúchil) with soft petals and a few loose petals. Soft candlelight, respectful portrait, photorealistic, shallow depth of field, no horror, no gore.`,
    geminiPrompt: `${faceRef}

Photorealistic Día de Muertos Catrina portrait. Classic black-and-white sugar skull face paint, delicate filigree on cheeks and forehead, heart-shaped nose tip, marigold flower crown in vivid orange and gold. Warm ofrenda candle light, respectful cultural tone, high detail skin texture, editorial beauty lighting. Avoid scary or cartoon styles.`,
  },
  {
    id: 'pink',
    name: 'Pink Rose',
    blurb: 'Softer romantic Catrina — rose pink, blush petals, cream highlights.',
    colors: {
      primary: '#e85d8a',
      secondary: '#f7c6d6',
      accent: '#fff8ef',
      ink: '#5a2038',
      glow: '#e85d8a',
    },
    nanoBananaPrompt: `${faceRef}

Soft romantic La Catrina look. Cream and rose-pink sugar-skull paint with delicate white lace-like patterns around the eyes. Pink and blush roses in the hair crown mixed with a few pale marigolds. Gentle smile, soft window light, beauty-editorial style, respectful Día de Muertos aesthetic, photorealistic, no horror.`,
    geminiPrompt: `${faceRef}

Elegant pink-rose Catrina makeup for Day of the Dead. Pastel pink base with cream sugar-skull motifs, rose petal accents on cheeks, floral crown of pink roses and white blossoms. Soft glam beauty lighting, warm tones, cultural respect, photorealistic portrait. Avoid gothic horror or cartoon filters.`,
  },
  {
    id: 'golden',
    name: 'Golden Skull',
    blurb: 'Festive metallic gold — gilded skull motifs with marigold glow.',
    colors: {
      primary: '#d4af37',
      secondary: '#f4a300',
      accent: '#fff3c4',
      ink: '#3a2a08',
      glow: '#ffd700',
    },
    nanoBananaPrompt: `${faceRef}

Golden Catrina sugar-skull look. Metallic gold and bronze face paint with ornate skull motifs outlined in deep ink, jeweled highlights on the brow and cheekbones. Dense marigold and gold leaf crown. Rich ofrenda candle glow, luxurious yet respectful Día de Muertos portrait, photorealistic, cinematic warm light, no horror.`,
    geminiPrompt: `${faceRef}

Photorealistic Golden Skull Catrina. Gilded sugar-skull face paint with fine filigree, amber and gold marigolds, candlelit ofrenda background. Celebratory Day of the Dead mood, high fashion detail, respectful cultural presentation. Avoid scary or low-quality meme styles.`,
  },
]

export function getPreset(id: PresetId): Preset {
  return PRESETS.find((p) => p.id === id) ?? PRESETS[0]
}
