import type { ReactNode } from 'react'
import { useNovara } from '../context'
import { useAnimatedNumber } from '../hooks'
import {
  colorPrice,
  FACE_COLORS,
  formatMillions,
  formatMoney,
  formatSize,
  isDefaultConfig,
  formatPhone,
  formatPlus,
  orderLines,
  PHONE_TEL,
  PRICES,
  SIZE_BASE,
  SIZES,
} from '../order'
import { THEMES } from '../themes'
import { EngraveIcon, PaletteIcon, PhoneIcon, PrintIcon, SpeakerIcon, SteelIcon, SunIcon, WhatsAppIcon } from './Icons'
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
              units={config.size}
              backlight={config.backlight}
              speaker={config.music}
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
                      {colorPrice(color, config.size) === 0
                        ? t.included
                        : formatPlus(colorPrice(color, config.size), lang)}
                    </small>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>{t.size}</legend>
              <p className="help">{t.sizeHelp}</p>
              <div className="sizes" role="radiogroup" aria-label={t.size}>
                {SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    role="radio"
                    aria-checked={config.size === size}
                    className="swatch"
                    onClick={() => update({ size })}
                  >
                    <span className="num" dir="ltr">
                      {formatSize(size, lang)}
                    </span>
                    <small>{formatMillions(SIZE_BASE[size], lang)}</small>
                  </button>
                ))}
              </div>
            </fieldset>

            <Toggle
              pressed={config.music}
              title={t.music}
              text={t.musicHelp}
              price={formatPlus(PRICES.music[config.size], lang)}
              icon={<SpeakerIcon />}
              onClick={() => update({ music: !config.music })}
            />
            <Toggle
              pressed={config.backlight}
              title={t.backlight}
              text={t.backlightHelp}
              price={formatPlus(PRICES.backlight[config.size], lang)}
              icon={<SunIcon />}
              onClick={() => update({ backlight: !config.backlight })}
            />
            <Toggle
              pressed={config.engraving}
              title={t.engraving}
              text={t.engravingHelp}
              price={formatPlus(PRICES.engraving[config.size], lang)}
              icon={<EngraveIcon />}
              onClick={() => update({ engraving: !config.engraving })}
            />
            <Toggle
              pressed={config.steel}
              title={t.steel}
              text={t.steelHelp}
              price={formatPlus(PRICES.steel[config.size], lang)}
              icon={<SteelIcon />}
              onClick={() => update({ steel: !config.steel })}
            />
            <Toggle
              pressed={config.painting}
              title={t.painting}
              text={t.paintingHelp}
              price={formatPlus(PRICES.painting[config.size], lang)}
              icon={<PaletteIcon />}
              onClick={() => update({ painting: !config.painting })}
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
                  <span>{t.step1Text}</span>
                </li>
                <li>
                  <b>{t.step2Title}</b>
                  <span>{t.step2Text}</span>
                </li>
                <li>
                  <b>{t.step3Title}</b>
                  <span>{t.step3Text}</span>
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
  const { lang, t, config, total, waHref } = useNovara()
  const animated = useAnimatedNumber(total)
  if (isDefaultConfig(config)) return null
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
