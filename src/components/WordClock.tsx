import { useEffect, useState, type CSSProperties } from 'react'
import { activeWords, digitalTime, GRID, minuteMark, phraseEn, phraseFa } from '../clock'
import { useNovara } from '../context'
import type { Theme } from '../themes'
import { LogoMark, TinyClock } from './Icons'

type Props = {
  theme: Theme
  brightness?: number
  backlight?: boolean
  speaker?: boolean
  alarm?: boolean
  showCaption?: boolean
  className?: string
}

function useMinute() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => {
      const next = new Date()
      setNow((current) =>
        current.getHours() === next.getHours() && current.getMinutes() === next.getMinutes()
          ? current
          : next,
      )
    }, 1000)
    return () => window.clearInterval(id)
  }, [])
  return now
}

export function WordClock({
  theme,
  brightness = 1,
  backlight = false,
  speaker = false,
  alarm = false,
  showCaption = false,
  className = '',
}: Props) {
  const { lang, t } = useNovara()
  const now = useMinute()
  const lit = new Set(activeWords(now))
  const mark = minuteMark(now)
  const english = phraseEn(now)
  const persian = phraseFa(now)
  const phrase = lang === 'fa' ? persian : english

  const style = {
    '--panel': theme.panel,
    '--bezel': theme.bezel,
    '--unlit': theme.unlit,
    '--lit': theme.lit,
    '--glow': theme.glow,
    '--wall': theme.wall,
    '--bright': String(brightness),
  } as CSSProperties

  return (
    <div className={`clock-block ${backlight ? 'has-led' : ''} ${className}`} style={style}>
      {backlight && <div className="halo" />}
      <div className={`bezel ${speaker ? 'has-speaker' : ''}`}>
        {alarm && (
          <span className="alarm-badge" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
              <path d="M6 16.5V11a6 6 0 1 1 12 0v5.5l1.2 1.5H4.8L6 16.5Z" stroke="currentColor" strokeWidth="1.6" />
              <path d="M10 19.2a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
        )}
        <div className="panel" dir="ltr" aria-hidden="true">
          {GRID.map((row, rowIndex) =>
            row.map((cell, index) => {
              if (cell.type === 'empty') {
                return <span className="cell" key={`${rowIndex}-${index}`} />
              }
              if (cell.type === 'icon') {
                return (
                  <span className="cell mark" key={`${rowIndex}-${index}`}>
                    {cell.icon === 'power' ? <LogoMark size={16} /> : <TinyClock />}
                  </span>
                )
              }
              if (cell.type === 'plus') {
                return (
                  <span key={`${rowIndex}-${index}`} className={mark > 0 ? 'cell on' : 'cell'}>
                    +
                  </span>
                )
              }
              if (cell.type === 'digit') {
                return (
                  <span key={`${rowIndex}-${index}`} className={mark === cell.n ? 'cell on' : 'cell'}>
                    {cell.n}
                  </span>
                )
              }
              const on = cell.word ? lit.has(cell.word) : false
              return (
                <span className={on ? 'cell on' : 'cell'} key={`${rowIndex}-${index}`}>
                  {cell.char}
                </span>
              )
            }),
          )}
        </div>
        {speaker && (
          <span className="grille" aria-hidden="true">
            {Array.from({ length: 7 }, (_, index) => (
              <i key={index} />
            ))}
          </span>
        )}
      </div>
      {showCaption && (
        <div className="caption">
          <p className="digital">
            <span className="live-dot" aria-hidden="true" />
            <span dir="ltr">{digitalTime(now, lang)}</span>
            <span className="live-label">{t.live}</span>
          </p>
          <p className="phrase">{phrase}</p>
          {lang === 'fa' && (
            <p className="phrase en" dir="ltr">
              {english}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
