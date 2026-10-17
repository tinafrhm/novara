import { useNovara } from '../context'
import { LogoMark } from './Icons'

export function Header() {
  const { lang, setLang, t } = useNovara()
  return (
    <header className="header">
      <a className="skip" href="#intro">
        {t.skip}
      </a>
      <div className="wrap header-inner">
        <a className="brand" href="#intro">
          <span className="logo-mark">
            <LogoMark size={26} />
          </span>
          <span>
            <span className="brand-name">NOVARA</span>
            <span className={lang === 'en' ? 'tagline' : 'tagline fa'}>{t.footerTag}</span>
          </span>
        </a>
        <nav className="nav-links" aria-label={t.navLabel}>
          <a href="#intro">{t.navIntro}</a>
          <a href="#experience">{t.navExperience}</a>
          <a href="#product">{t.navProduct}</a>
        </nav>
        <div className="lang" role="group" aria-label={t.language}>
          <button type="button" aria-pressed={lang === 'fa'} onClick={() => setLang('fa')}>
            فا
          </button>
          <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>
            EN
          </button>
        </div>
      </div>
    </header>
  )
}
