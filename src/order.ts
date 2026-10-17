import { dictionary, type Lang } from './i18n'

export const FACE_COLORS = ['standard', 'cream', 'black', 'blue', 'gray'] as const
export type FaceColor = (typeof FACE_COLORS)[number]

export type Config = {
  color: FaceColor
  speaker: boolean
  led: boolean
  alarm: boolean
}

export const PRICES = {
  base: 35_000_000,
  customColor: 3_000_000,
  speaker: 4_000_000,
  led: 3_000_000,
  alarm: 4_000_000,
} as const

export const PHONE_NATIONAL = '09149145985'
export const PHONE_TEL = 'tel:+989149145985'

const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹'

export function isFaceColor(value: unknown): value is FaceColor {
  return typeof value === 'string' && (FACE_COLORS as readonly string[]).includes(value)
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

export function formatPlus(amount: number, lang: Lang) {
  const millions = amount / 1_000_000
  const formatted = new Intl.NumberFormat(lang === 'fa' ? 'fa-IR' : 'en-US').format(millions)
  return lang === 'fa' ? `+${formatted} میلیون` : `+${formatted} million`
}

export function totalPrice(config: Config) {
  return (
    PRICES.base +
    (config.color === 'standard' ? 0 : PRICES.customColor) +
    (config.speaker ? PRICES.speaker : 0) +
    (config.led ? PRICES.led : 0) +
    (config.alarm ? PRICES.alarm : 0)
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
  return [
    {
      key: 'base',
      label: t.base,
      value: formatMoney(PRICES.base, lang),
      muted: false,
    },
    {
      key: 'color',
      label: `${t.screenColor} · ${t.colors[config.color]}`,
      value: config.color === 'standard' ? t.included : formatMoney(PRICES.customColor, lang),
      muted: false,
    },
    {
      key: 'speaker',
      label: t.speaker,
      value: config.speaker ? formatMoney(PRICES.speaker, lang) : t.notAdded,
      muted: !config.speaker,
    },
    {
      key: 'led',
      label: t.led,
      value: config.led ? formatMoney(PRICES.led, lang) : t.notAdded,
      muted: !config.led,
    },
    {
      key: 'alarm',
      label: t.alarm,
      value: config.alarm ? formatMoney(PRICES.alarm, lang) : t.notAdded,
      muted: !config.alarm,
    },
  ]
}

export function orderMessage(lang: Lang, config: Config, total: number) {
  const t = dictionary[lang]
  const yesNo = (on: boolean) => (on ? t.yes : t.no)
  return [
    t.waGreeting,
    `${t.productLabel}: ${t.productName}`,
    `${t.screenColor}: ${t.colors[config.color]}`,
    `${t.speaker}: ${yesNo(config.speaker)}`,
    `${t.led}: ${yesNo(config.led)}`,
    `${t.alarm}: ${yesNo(config.alarm)}`,
    `${t.total}: ${formatMoney(total, lang)}`,
  ].join('\n')
}

export function whatsappHref(message: string) {
  return `https://wa.me/989149145985?text=${encodeURIComponent(message)}`
}
