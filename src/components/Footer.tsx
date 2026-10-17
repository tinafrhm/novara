import { useNovara } from '../context'
import { formatPhone, PHONE_TEL } from '../order'
import { LogoMark, PhoneIcon, WhatsAppIcon } from './Icons'

export function Footer() {
  const { lang, t, waHref } = useNovara()
  const year = String(new Date().getFullYear())
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <span className="logo-mark">
            <LogoMark size={36} />
          </span>
          <span className="brand-name">NOVARA</span>
          <span className={lang === 'en' ? 'tagline' : 'tagline fa'}>{t.footerTag}</span>
        </div>
        <nav aria-label={t.footerNav}>
          <h2>{t.footerNav}</h2>
          <a href="#intro">{t.navIntro}</a>
          <a href="#experience">{t.navExperience}</a>
          <a href="#product">{t.navProduct}</a>
        </nav>
        <div>
          <h2>{t.footerContact}</h2>
          <a href={PHONE_TEL}>
            <PhoneIcon />
            <span dir="ltr">{formatPhone(lang)}</span>
          </a>
          <a href={waHref} target="_blank" rel="noreferrer">
            <WhatsAppIcon />
            {t.whatsapp}
          </a>
        </div>
      </div>
      <div className="wrap footer-bottom">{t.rights.replace('{year}', year)}</div>
    </footer>
  )
}
