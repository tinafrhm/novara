import { useEffect, useState } from 'react'
import clockAnim from '../lottie/clock.json'
import { useNovara } from '../context'
import { localizeDigits } from '../order'
import { THEMES } from '../themes'
import {
  GearIcon,
  PaletteIcon,
  SunIcon,
  TimerIcon,
  TinyClock,
  WifiIcon,
} from './Icons'
import { LottiePlayer } from './LottiePlayer'
import { WordClock } from './WordClock'

const LIGHTS = [
  { id: 'blue', color: '#5ad4ff', label: 'lightBlue' },
  { id: 'warm', color: '#ffd8a8', label: 'lightWarm' },
  { id: 'white', color: '#ffffff', label: 'lightWhite' },
  { id: 'amber', color: '#ffb15e', label: 'lightAmber' },
  { id: 'mint', color: '#9af0dd', label: 'lightMint' },
] as const

type Tab = 'clock' | 'colors' | 'timer' | 'settings'

export function Features() {
  const { t } = useNovara()
  return (
    <section id="experience" className="section">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="kicker">{t.experienceKicker}</p>
            <h2>{t.experienceTitle}</h2>
            <p className="lead">{t.experienceLead}</p>
          </div>
          <LottiePlayer className="lottie lottie-clock" data={clockAnim} />
        </div>
        <div className="cards">
          <article className="card">
            <span className="icon-bubble">
              <WifiIcon />
            </span>
            <h3>{t.featureWifiTitle}</h3>
            <p>{t.featureWifiText}</p>
          </article>
          <article className="card">
            <span className="icon-bubble">
              <SunIcon />
            </span>
            <h3>{t.featureBrightTitle}</h3>
            <p>{t.featureBrightText}</p>
          </article>
          <article className="card">
            <span className="icon-bubble">
              <PaletteIcon />
            </span>
            <h3>{t.featureColorTitle}</h3>
            <p>{t.featureColorText}</p>
          </article>
        </div>
        <PhoneDemo />
      </div>
    </section>
  )
}

function PhoneDemo() {
  const { lang, t } = useNovara()
  const [tab, setTab] = useState<Tab>('clock')
  const [brightness, setBrightness] = useState(0.8)
  const [night, setNight] = useState(false)
  const [wifi, setWifi] = useState(true)
  const [light, setLight] = useState<(typeof LIGHTS)[number]['id']>('blue')
  const [duration, setDuration] = useState(25 * 60)
  const [seconds, setSeconds] = useState(25 * 60)
  const [running, setRunning] = useState(false)
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => {
      setSeconds((current) => (current <= 1 ? 0 : current - 1))
    }, 1000)
    return () => window.clearInterval(id)
  }, [running])

  useEffect(() => {
    if (seconds === 0) setRunning(false)
  }, [seconds])

  const shownBrightness = night ? Math.min(brightness, 0.34) : brightness
  const lightColor = LIGHTS.find((item) => item.id === light)?.color ?? '#5ad4ff'
  const theme = { ...THEMES.standard, lit: lightColor, glow: lightColor, wall: lightColor }
  const percent = localizeDigits(String(Math.round(shownBrightness * 100)), lang)
  const status = new Intl.DateTimeFormat(lang === 'fa' ? 'fa-IR' : 'en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(now)

  function pickTimer(minutes: number) {
    const next = minutes * 60
    setDuration(next)
    setSeconds(next)
    setRunning(false)
  }

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')
  const progress = duration === 0 ? 0 : seconds / duration

  return (
    <div className="experience-grid">
      <div>
        <h3 className="phone-aside-title">{t.experienceTitle}</h3>
        <p className="lead">{t.phoneAside}</p>
      </div>
      <div className="phone" dir="ltr">
        <div className="phone-screen">
          <div className="status">
            <span>{status}</span>
            <span className="status-icons" aria-hidden="true">
              <WifiIcon />
            </span>
          </div>
          <div className="app-title">{t.phoneTitle}</div>
          <p className={`wifi-row ${wifi ? '' : 'off'}`}>
            <i />
            {wifi ? t.phoneWifi : t.phoneWifiOff}
          </p>
          <div className="phone-body">
            {tab === 'clock' && (
              <>
                <WordClock className="mini" theme={theme} brightness={shownBrightness} />
                <label className="slider-label" htmlFor="brightness">
                  <span>{t.phoneBrightness}</span>
                  <span dir="ltr">{lang === 'fa' ? `${percent}٪` : `${percent}%`}</span>
                </label>
                <input
                  id="brightness"
                  type="range"
                  min={0.15}
                  max={1}
                  step={0.01}
                  value={brightness}
                  onChange={(event) => {
                    setNight(false)
                    setBrightness(Number(event.target.value))
                  }}
                />
              </>
            )}
            {tab === 'colors' && (
              <div className="light-grid" role="radiogroup" aria-label={t.phoneColors}>
                {LIGHTS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    role="radio"
                    aria-checked={light === item.id}
                    className="light-choice"
                    onClick={() => setLight(item.id)}
                  >
                    <span style={{ background: item.color }} />
                    {t[item.label]}
                  </button>
                ))}
              </div>
            )}
            {tab === 'timer' && (
              <div className="timer-panel">
                <div
                  className="timer-ring"
                  style={{
                    background: `conic-gradient(#5ad4ff ${progress * 360}deg, rgba(255,255,255,0.08) 0deg)`,
                  }}
                >
                  <div dir="ltr">
                    {localizeDigits(mm, lang)}:{localizeDigits(ss, lang)}
                  </div>
                </div>
                <div className="presets">
                  {[5, 15, 25].map((minutes) => (
                    <button key={minutes} type="button" onClick={() => pickTimer(minutes)}>
                      {localizeDigits(String(minutes), lang)}
                    </button>
                  ))}
                </div>
                <div className="timer-actions">
                  <button type="button" onClick={() => seconds > 0 && setRunning((value) => !value)}>
                    {running ? t.phonePause : t.phoneStart}
                  </button>
                  <button type="button" onClick={() => pickTimer(duration / 60)}>
                    {t.phoneReset}
                  </button>
                </div>
              </div>
            )}
            {tab === 'settings' && (
              <div className="settings-list">
                <button type="button" aria-pressed={wifi} onClick={() => setWifi((value) => !value)}>
                  <span>{t.phoneWifiRow}</span>
                  <span className={wifi ? 'switch on' : 'switch'} aria-hidden="true">
                    <i />
                  </span>
                </button>
                <button
                  type="button"
                  aria-pressed={night}
                  onClick={() => setNight((value) => !value)}
                >
                  <span>{t.phoneNight}</span>
                  <span className={night ? 'switch on' : 'switch'} aria-hidden="true">
                    <i />
                  </span>
                </button>
              </div>
            )}
          </div>
          <nav className="phone-nav" aria-label={t.phoneTitle}>
            <button type="button" aria-pressed={tab === 'clock'} onClick={() => setTab('clock')}>
              <TinyClock />
              {t.phoneClock}
            </button>
            <button type="button" aria-pressed={tab === 'colors'} onClick={() => setTab('colors')}>
              <PaletteIcon />
              {t.phoneColors}
            </button>
            <button type="button" aria-pressed={tab === 'timer'} onClick={() => setTab('timer')}>
              <TimerIcon />
              {t.phoneTimer}
            </button>
            <button type="button" aria-pressed={tab === 'settings'} onClick={() => setTab('settings')}>
              <GearIcon />
              {t.phoneSettings}
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}
