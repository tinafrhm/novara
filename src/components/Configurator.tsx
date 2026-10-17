import type { ReactNode } from 'react'
import { useNovara } from '../context'
import { useAnimatedNumber } from '../hooks'
import {
  FACE_COLORS,
  formatMoney,
  formatPhone,
  formatPlus,
  orderLines,
  PHONE_TEL,
  PRICES,
} from '../order'
import { THEMES } from '../themes'
import { BellIcon, PhoneIcon, PrintIcon, SpeakerIcon, SunIcon, WhatsAppIcon } from './Icons'
import { WordClock } from './WordClock'

export function Configurator() {
  const { lang, t, config, update, total, waHref } = useNovara()
  const theme = THEMES[config.color]
  const lines = orderLines(lang, config)
  const animated = useAnimatedNumber(total)

  return (
    <section id="product" className="section product">
      <div className="wrap">
        <p className="kicker">{t.productKicker}</p>
        <h2>{t.productTitle}</h2>
        <p className="lead">
          {t.productLeadBefore}{' '}
          <strong dir="ltr">{formatMoney(PRICES.base, lang)}</strong> {t.productLeadAfter}
        </p>
        <p className="unit-note">{t.tomanNote}</p>
        <div className="config">
          <div className="stage config-stage">
            <p className="stage-label">{t.previewLabel}</p>
            <WordClock
              className="lg"
              theme={theme}
              backlight={config.led}
              speaker={config.speaker}
              alarm={config.alarm}
              showCaption
            />
          </div>
          <div className="options">
            <fieldset>
              <legend>{t.screenColor}</legend>
              <p className="help">{t.screenColorHelp}</p>
              <div className="swatches" role="radiogroup" aria-label={t.screenColor}>
                {FACE_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    role="radio"
                    aria-checked={config.color === color}
                    className="swatch"
                    onClick={() => update({ color })}
                  >
                    <span className="dot" style={{ background: THEMES[color].swatch }} />
                    <span>{t.colors[color]}</span>
                    <small>
                      {color === 'standard' ? t.included : formatPlus(PRICES.customColor, lang)}
                    </small>
                  </button>
                ))}
              </div>
            </fieldset>

            <Toggle
              pressed={config.speaker}
              title={t.speaker}
              text={t.speakerHelp}
              price={formatPlus(PRICES.speaker, lang)}
              icon={<SpeakerIcon />}
              onClick={() => update({ speaker: !config.speaker })}
            />
            <Toggle
              pressed={config.led}
              title={t.led}
              text={t.ledHelp}
              price={formatPlus(PRICES.led, lang)}
              icon={<SunIcon />}
              onClick={() => update({ led: !config.led })}
            />
            <Toggle
              pressed={config.alarm}
              title={t.alarm}
              text={t.alarmHelp}
              price={formatPlus(PRICES.alarm, lang)}
              icon={<BellIcon />}
              onClick={() => update({ alarm: !config.alarm })}
            />

            <div className="summary" id="order">
              <h3>{t.summary}</h3>
              <ul>
                {lines.map((line) => (
                  <li key={line.key} className={line.muted ? 'muted' : ''}>
                    <span>{line.label}</span>
                    <span className="num" dir="ltr">
                      {line.value}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="total" aria-live="polite">
                <span>{t.total}</span>
                <span className="num" dir="ltr">
                  {formatMoney(animated, lang)}
                </span>
              </div>
              <ol className="steps">
                <li>
                  <b>{t.step1Title}</b>
                  {t.step1Text}
                </li>
                <li>
                  <b>{t.step2Title}</b>
                  {t.step2Text}
                </li>
                <li>
                  <b>{t.step3Title}</b>
                  {t.step3Text}
                </li>
              </ol>
              <div className="actions">
                <a className="btn btn-wa" href={waHref} target="_blank" rel="noreferrer">
                  <WhatsAppIcon />
                  {t.whatsapp}
                </a>
                <a className="btn btn-ghost" href={PHONE_TEL}>
                  <PhoneIcon />
                  <span dir="ltr">{formatPhone(lang)}</span>
                </a>
                <button type="button" className="btn btn-primary" onClick={() => window.print()}>
                  <PrintIcon />
                  {t.print}
                </button>
              </div>
              <p className="order-note">
                {t.orderNoteBefore}{' '}
                <a href={waHref} target="_blank" rel="noreferrer">
                  {t.whatsappInline}
                </a>{' '}
                {t.orderNoteMid}{' '}
                <a href={PHONE_TEL} dir="ltr">
                  {formatPhone(lang)}
                </a>
                {t.orderNoteAfter}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Toggle({
  pressed,
  title,
  text,
  price,
  icon,
  onClick,
}: {
  pressed: boolean
  title: string
  text: string
  price: string
  icon: ReactNode
  onClick: () => void
}) {
  return (
    <button type="button" className={pressed ? 'opt on' : 'opt'} aria-pressed={pressed} onClick={onClick}>
      <span className="opt-main">
        <span className="icon-bubble small">{icon}</span>
        <span className="opt-text">
          <strong>{title}</strong>
          <small>{text}</small>
          <span className="price-pill">{price}</span>
        </span>
      </span>
      <span className="switch" aria-hidden="true">
        <i />
      </span>
    </button>
  )
}

export function MobileBar() {
  const { lang, t, total, waHref } = useNovara()
  const animated = useAnimatedNumber(total)
  return (
    <div className="mobile-bar">
      <div className="grow">
        <span>{t.total}</span>
        <strong className="num" dir="ltr">
          {formatMoney(animated, lang)}
        </strong>
      </div>
      <a className="icon-btn" href={waHref} target="_blank" rel="noreferrer" aria-label={t.whatsapp}>
        <WhatsAppIcon />
      </a>
      <a className="icon-btn call" href={PHONE_TEL} aria-label={t.call}>
        <PhoneIcon />
      </a>
    </div>
  )
}
