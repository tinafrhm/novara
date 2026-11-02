import { dictionary, type Lang } from './i18n'

export const FACE_COLORS = ['standard', 'white', 'gray', 'beige', 'cream', 'custom'] as const
export type FaceColor = (typeof FACE_COLORS)[number]

export const SIZES = [25, 70, 90, 110] as const
export type ClockSize = (typeof SIZES)[number]

export type Config = {
  color: FaceColor
  size: ClockSize
  music: boolean
  backlight: boolean
  engraving: boolean
  steel: boolean
  painting: boolean
}

type BySize = Record<ClockSize, number>

const flat = (amount: number): BySize => ({ 25: 0, 70: amount, 90: amount, 110: amount })

export const SIZE_BASE: BySize = {
  25: 25_000_000,
  70: 40_000_000,
  90: 60_000_000,
  110: 80_000_000,
}

export const PRICES = {
  base: SIZE_BASE[70],
  from: SIZE_BASE[25],
  music: flat(8_500_000),
  backlight: { 25: 0, 70: 5_000_000, 90: 6_000_000, 110: 7_000_000 },
  engraving: flat(1_000_000),
  steel: { 25: 0, 70: 10_000_000, 90: 12_000_000, 110: 14_000_000 },
  painting: { 25: 0, 70: 12_000_000, 90: 14_000_000, 110: 16_000_000 },
  color: {
    standard: flat(0),
    white: { 25: 0, 70: 1_500_000, 90: 2_000_000, 110: 2_500_000 },
    gray: { 25: 0, 70: 1_500_000, 90: 2_000_000, 110: 2_500_000 },
    beige: { 25: 0, 70: 2_000_000, 90: 2_500_000, 110: 3_000_000 },
    cream: { 25: 0, 70: 2_000_000, 90: 2_500_000, 110: 3_000_000 },
    custom: { 25: 0, 70: 5_000_000, 90: 5_500_000, 110: 6_000_000 },
  },
} as const

export function offersExtras(size: ClockSize) {
  return size !== 25
}

export function colorPrice(color: FaceColor, size: ClockSize) {
  return PRICES.color[color][size]
}

export const PHONE_NATIONAL = '09149145985'
export const PHONE_TEL = 'tel:+989149145985'

const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹'

export function isFaceColor(value: unknown): value is FaceColor {
  return typeof value === 'string' && (FACE_COLORS as readonly string[]).includes(value)
}

export function isClockSize(value: unknown): value is ClockSize {
  return typeof value === 'number' && (SIZES as readonly number[]).includes(value)
}

export function formatSize(size: ClockSize, lang: Lang) {
  const dims = localizeDigits(`${size}×${size}`, lang)
  return size === 25 ? `${dims} ${dictionary[lang].sizeTabletop}` : dims
}

export function localizeDigits(value: string, lang: Lang) {
  if (lang !== 'fa') return value
  return value.replace(/\d/g, (digit) => FA_DIGITS[Number(digit)] ?? digit)
}

export function formatPhone(lang: Lang) {
  return localizeDigits(PHONE_NATIONAL, lang)
}

export function formatMoney(value: number, lang: Lang) {
  const formatted = new Intl.NumberFormat(lang === 'fa' ? 'fa-IR' : 'en-US').format(value)
  return lang === 'fa' ? `${formatted} تومان` : `${formatted} Toman`
}

export function formatMillions(amount: number, lang: Lang) {
  const formatted = new Intl.NumberFormat(lang === 'fa' ? 'fa-IR' : 'en-US', {
    maximumFractionDigits: 1,
  }).format(amount / 1_000_000)
  return lang === 'fa' ? `${formatted} میلیون` : `${formatted} million`
}

export function formatPlus(amount: number, lang: Lang) {
  return `+${formatMillions(amount, lang)}`
}

export function isDefaultConfig(config: Config) {
  return (
    config.color === 'standard' &&
    config.size === 70 &&
    !config.music &&
    !config.backlight &&
    !config.engraving &&
    !config.steel &&
    !config.painting
  )
}

export function totalPrice(config: Config) {
  const { size } = config
  if (!offersExtras(size)) return SIZE_BASE[size]
  return (
    SIZE_BASE[size] +
    colorPrice(config.color, size) +
    (config.music ? PRICES.music[size] : 0) +
    (config.backlight ? PRICES.backlight[size] : 0) +
    (config.engraving ? PRICES.engraving[size] : 0) +
    (config.steel ? PRICES.steel[size] : 0) +
    (config.painting ? PRICES.painting[size] : 0)
  )
}

export type OrderLine = {
  key: string
  label: string
  value: string
  muted: boolean
}

export function orderLines(lang: Lang, config: Config): OrderLine[] {
  const t = dictionary[lang]
  const { size } = config
  const base: OrderLine = {
    key: 'base',
    label: `${t.base} · ${formatSize(size, lang)}`,
    value: formatMoney(SIZE_BASE[size], lang),
    muted: false,
  }
  if (!offersExtras(size)) return [base]
  const extras = [
    ['music', t.music, config.music, PRICES.music[size]],
    ['backlight', t.backlight, config.backlight, PRICES.backlight[size]],
    ['engraving', t.engraving, config.engraving, PRICES.engraving[size]],
    ['steel', t.steel, config.steel, PRICES.steel[size]],
    ['painting', t.painting, config.painting, PRICES.painting[size]],
  ] as const
  return [
    base,
    {
      key: 'color',
      label: `${t.screenColor} · ${t.colors[config.color]}`,
      value: colorPrice(config.color, size) === 0 ? t.included : formatMoney(colorPrice(config.color, size), lang),
      muted: false,
    },
    ...extras.map(([key, label, on, amount]) => ({
      key,
      label,
      value: on ? formatMoney(amount, lang) : t.notAdded,
      muted: !on,
    })),
  ]
}

export function orderMessage(lang: Lang, config: Config, total: number) {
  const t = dictionary[lang]
  const yesNo = (on: boolean) => (on ? t.yes : t.no)
  if (!offersExtras(config.size)) {
    return [
      t.waGreeting,
      `${t.productLabel}: ${t.productName}`,
      `${t.size}: ${formatSize(config.size, lang)}`,
      `${t.total}: ${formatMoney(total, lang)}`,
    ].join('\n')
  }
  return [
    t.waGreeting,
    `${t.productLabel}: ${t.productName}`,
    `${t.size}: ${formatSize(config.size, lang)}`,
    `${t.screenColor}: ${t.colors[config.color]}`,
    `${t.music}: ${yesNo(config.music)}`,
    `${t.backlight}: ${yesNo(config.backlight)}`,
    `${t.engraving}: ${yesNo(config.engraving)}`,
    `${t.steel}: ${yesNo(config.steel)}`,
    `${t.painting}: ${yesNo(config.painting)}`,
    `${t.total}: ${formatMoney(total, lang)}`,
  ].join('\n')
}

export function whatsappHref(message: string) {
  return `https://wa.me/989149145985?text=${encodeURIComponent(message)}`
}
