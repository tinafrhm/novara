const RAW = [
  'ITLISASTHP+1',
  'ACFIFTEENDC2',
  'TWENTYFIVEX3',
  'THIRTYFTENO4',
  'MINUTESETOU*',
  'PASTORUFOURT',
  'SEVENXTWELVE',
  'NINEFIVEATWO',
  'EIGHTFELEVEN',
  'SIXTHREEONEA',
  'TENSE^CLOCK ',
]

const SPANS: { row: number; start: number; end: number; expect: string; word: string }[] = [
  { row: 0, start: 0, end: 1, expect: 'IT', word: 'it' },
  { row: 0, start: 3, end: 4, expect: 'IS', word: 'is' },
  { row: 1, start: 2, end: 8, expect: 'FIFTEEN', word: 'fifteen' },
  { row: 2, start: 0, end: 5, expect: 'TWENTY', word: 'twenty' },
  { row: 2, start: 6, end: 9, expect: 'FIVE', word: 'mfive' },
  { row: 3, start: 0, end: 5, expect: 'THIRTY', word: 'thirty' },
  { row: 3, start: 7, end: 9, expect: 'TEN', word: 'mten' },
  { row: 4, start: 0, end: 6, expect: 'MINUTES', word: 'minutes' },
  { row: 4, start: 8, end: 9, expect: 'TO', word: 'to' },
  { row: 5, start: 0, end: 3, expect: 'PAST', word: 'past' },
  { row: 5, start: 7, end: 10, expect: 'FOUR', word: 'four' },
  { row: 6, start: 0, end: 4, expect: 'SEVEN', word: 'seven' },
  { row: 6, start: 6, end: 11, expect: 'TWELVE', word: 'twelve' },
  { row: 7, start: 0, end: 3, expect: 'NINE', word: 'nine' },
  { row: 7, start: 4, end: 7, expect: 'FIVE', word: 'hfive' },
  { row: 7, start: 9, end: 11, expect: 'TWO', word: 'two' },
  { row: 8, start: 0, end: 4, expect: 'EIGHT', word: 'eight' },
  { row: 8, start: 6, end: 11, expect: 'ELEVEN', word: 'eleven' },
  { row: 9, start: 0, end: 2, expect: 'SIX', word: 'six' },
  { row: 9, start: 3, end: 7, expect: 'THREE', word: 'three' },
  { row: 9, start: 8, end: 10, expect: 'ONE', word: 'one' },
  { row: 10, start: 0, end: 2, expect: 'TEN', word: 'hten' },
  { row: 10, start: 6, end: 10, expect: 'CLOCK', word: 'oclock' },
]

export type Cell =
  | { type: 'empty' }
  | { type: 'icon'; icon: 'clock' | 'power' }
  | { type: 'digit'; n: number }
  | { type: 'letter'; char: string; word?: string }

export const GRID: Cell[][] = RAW.map((raw, row) =>
  [...raw].map((char, index) => {
    if (char === ' ') return { type: 'empty' }
    if (char === '*') return { type: 'icon', icon: 'clock' }
    if (char === '^') return { type: 'icon', icon: 'power' }
    if (index === 11 && row < 4 && '1234'.includes(char)) return { type: 'digit', n: Number(char) }
    const span = SPANS.find((item) => item.row === row && index >= item.start && index <= item.end)
    return span ? { type: 'letter', char, word: span.word } : { type: 'letter', char }
  }),
)

const HOURS = [
  'twelve',
  'one',
  'two',
  'three',
  'four',
  'hfive',
  'six',
  'seven',
  'eight',
  'nine',
  'hten',
  'eleven',
]

const HOUR_EN = [
  'TWELVE',
  'ONE',
  'TWO',
  'THREE',
  'FOUR',
  'FIVE',
  'SIX',
  'SEVEN',
  'EIGHT',
  'NINE',
  'TEN',
  'ELEVEN',
]

const HOUR_FA = ['دوازده', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه', 'ده', 'یازده']

const MINUTE_WORDS: Record<number, string[]> = {
  5: ['mfive'],
  10: ['mten'],
  15: ['fifteen'],
  20: ['twenty'],
  25: ['twenty', 'mfive'],
  30: ['thirty'],
}

const MINUTE_EN: Record<number, string> = {
  5: 'FIVE',
  10: 'TEN',
  15: 'FIFTEEN',
  20: 'TWENTY',
  25: 'TWENTY FIVE',
  30: 'THIRTY',
}

function hourIndex(hours: number) {
  return ((hours % 12) + 12) % 12
}

function blockOf(date: Date) {
  return Math.floor(date.getMinutes() / 5) * 5
}

export function minuteMark(date: Date) {
  return date.getMinutes() % 5
}

export function activeWords(date: Date) {
  const block = blockOf(date)
  const words = ['it', 'is']
  if (block === 0) {
    words.push(HOURS[hourIndex(date.getHours())], 'oclock')
  } else if (block <= 30) {
    words.push(...MINUTE_WORDS[block], 'minutes', 'past', HOURS[hourIndex(date.getHours())])
  } else {
    words.push(
      ...MINUTE_WORDS[60 - block],
      'minutes',
      'to',
      HOURS[hourIndex(date.getHours() + 1)],
    )
  }
  return words
}

export function phraseEn(date: Date) {
  const block = blockOf(date)
  const hour = HOUR_EN[hourIndex(date.getHours())]
  if (block === 0) return `IT IS ${hour} O'CLOCK`
  if (block <= 30) return `IT IS ${MINUTE_EN[block]} MINUTES PAST ${hour}`
  const next = HOUR_EN[hourIndex(date.getHours() + 1)]
  return `IT IS ${MINUTE_EN[60 - block]} MINUTES TO ${next}`
}

const FA_MINUTE = [
  '',
  'یک',
  'دو',
  'سه',
  'چهار',
  'پنج',
  'شش',
  'هفت',
  'هشت',
  'نه',
  'ده',
  'یازده',
  'دوازده',
  'سیزده',
  'چهارده',
  'پانزده',
  'شانزده',
  'هفده',
  'هجده',
  'نوزده',
  'بیست',
  'بیست و یک',
  'بیست و دو',
  'بیست و سه',
  'بیست و چهار',
  'بیست و پنج',
  'بیست و شش',
  'بیست و هفت',
  'بیست و هشت',
  'بیست و نه',
  'سی',
  'سی و یک',
  'سی و دو',
  'سی و سه',
  'سی و چهار',
  'سی و پنج',
  'سی و شش',
  'سی و هفت',
  'سی و هشت',
  'سی و نه',
  'چهل',
  'چهل و یک',
  'چهل و دو',
  'چهل و سه',
  'چهل و چهار',
  'چهل و پنج',
  'چهل و شش',
  'چهل و هفت',
  'چهل و هشت',
  'چهل و نه',
  'پنجاه',
  'پنجاه و یک',
  'پنجاه و دو',
  'پنجاه و سه',
  'پنجاه و چهار',
  'پنجاه و پنج',
  'پنجاه و شش',
  'پنجاه و هفت',
  'پنجاه و هشت',
  'پنجاه و نه',
]

export function phraseFa(date: Date) {
  const hour = HOUR_FA[hourIndex(date.getHours())]
  const minutes = date.getMinutes()
  if (minutes === 0) return `ساعت ${hour}`
  return `ساعت ${hour} و ${FA_MINUTE[minutes]} دقیقه`
}

export function digitalTime(date: Date, lang: 'fa' | 'en') {
  return new Intl.DateTimeFormat(lang === 'fa' ? 'fa-IR' : 'en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)
}

if (import.meta.env.DEV) {
  const assert = (condition: boolean, message: string) => {
    if (!condition) throw new Error(`Word clock: ${message}`)
  }
  for (const raw of RAW) assert([...raw].length === 12, `row length ${raw}`)
  assert(RAW.slice(0, 4).map((raw) => raw.at(-1)).join('') === '1234', 'digit column')
  for (const span of SPANS) {
    assert(RAW[span.row].slice(span.start, span.end + 1) === span.expect, span.expect)
  }
  const known = new Set(SPANS.map((span) => span.word))
  for (const id of ['it', 'is', 'oclock', 'minutes', 'past', 'to', ...HOURS, ...Object.values(MINUTE_WORDS).flat()]) {
    assert(known.has(id), `missing ${id}`)
  }
  const at = (hours: number, minutes: number) =>
    activeWords(new Date(2026, 0, 1, hours, minutes)).sort().join('|')
  assert(at(9, 25) === ['is', 'it', 'mfive', 'minutes', 'nine', 'past', 'twenty'].sort().join('|'), '9:25')
  assert(at(0, 0) === ['is', 'it', 'oclock', 'twelve'].sort().join('|'), '0:00')
  assert(at(16, 40) === ['hfive', 'is', 'it', 'minutes', 'to', 'twenty'].sort().join('|'), '16:40')
  assert(at(10, 10) === ['hten', 'is', 'it', 'minutes', 'mten', 'past'].sort().join('|'), '10:10')
  assert(at(23, 50) === ['is', 'it', 'minutes', 'mten', 'to', 'twelve'].sort().join('|'), '23:50')
  assert(at(5, 5) === ['hfive', 'is', 'it', 'mfive', 'minutes', 'past'].sort().join('|'), '5:05')
  assert(at(10, 31) === at(10, 30), '10:31 words stay on the half hour')
  assert(minuteMark(new Date(2026, 0, 1, 10, 31)) === 1, '10:31 lights 1')
  assert(minuteMark(new Date(2026, 0, 1, 10, 34)) === 4, '10:34 lights 4')
  assert(minuteMark(new Date(2026, 0, 1, 10, 35)) === 0, '10:35 lights no digit')
}
