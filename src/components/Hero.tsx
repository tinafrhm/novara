import wifiAnim from '../lottie/wifi.json'
import { useNovara } from '../context'
import { formatMoney, PRICES } from '../order'
import { THEMES } from '../themes'
import { LottiePlayer } from './LottiePlayer'
import { WhatsAppIcon } from './Icons'
import { WordClock } from './WordClock'

export function Hero() {
  const { lang, t, config, waHref } = useNovara()
  const theme = THEMES[config.color]
  return (
    <section id="intro" className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="kicker">{t.kicker}</p>
          <h1>{t.heroTitle}</h1>
          <p className="lead">{t.heroLead}</p>
          <p className="from">
            <span>{t.heroFrom}</span>
            <strong dir="ltr">{formatMoney(PRICES.base, lang)}</strong>
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#product">
              {t.configure}
            </a>
            <a className="btn btn-ghost" href={waHref} target="_blank" rel="noreferrer">
              <WhatsAppIcon />
              {t.whatsapp}
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="stage">
            <LottiePlayer className="lottie lottie-wifi" data={wifiAnim} />
            <WordClock
              className="lg"
              theme={theme}
              backlight={config.led}
              speaker={config.speaker}
              alarm={config.alarm}
              showCaption
            />
          </div>
        </div>
      </div>
      <div className="wrap gallery">
        <figure className="shot">
          <img src="/images/novara-live.jpg" alt={t.altLive} />
          <figcaption>{t.galleryLive}</figcaption>
        </figure>
        <figure className="shot">
          <img src="/images/novara-brand.jpg" alt={t.altBrand} />
          <figcaption>{t.galleryBrand}</figcaption>
        </figure>
      </div>
    </section>
  )
}
