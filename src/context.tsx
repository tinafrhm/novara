import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { dictionary, type Lang } from './i18n'
import { isFaceColor, orderMessage, totalPrice, whatsappHref, type Config } from './order'

type Store = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (typeof dictionary)['fa']
  config: Config
  update: (partial: Partial<Config>) => void
  total: number
  waHref: string
}

const NovaraContext = createContext<Store | null>(null)

function loadLang(): Lang {
  try {
    const stored = sessionStorage.getItem('novara-lang')
    if (stored === 'fa' || stored === 'en') return stored
  } catch {
    /* ignore */
  }
  return 'fa'
}

function loadConfig(): Config {
  const fallback: Config = { color: 'standard', speaker: false, led: false, alarm: false }
  try {
    const raw = sessionStorage.getItem('novara-config')
    if (!raw) return fallback
    const data = JSON.parse(raw) as Partial<Config>
    if (!isFaceColor(data.color)) return fallback
    return {
      color: data.color,
      speaker: Boolean(data.speaker),
      led: Boolean(data.led),
      alarm: Boolean(data.alarm),
    }
  } catch {
    return fallback
  }
}

export function NovaraProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(loadLang)
  const [config, setConfig] = useState<Config>(loadConfig)
  const update = useCallback((partial: Partial<Config>) => {
    setConfig((current) => ({ ...current, ...partial }))
  }, [])

  useEffect(() => {
    const copy = dictionary[lang]
    document.documentElement.lang = lang === 'fa' ? 'fa' : 'en'
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr'
    document.title = copy.metaTitle
  }, [lang])

  useEffect(() => {
    try {
      sessionStorage.setItem('novara-lang', lang)
      sessionStorage.setItem('novara-config', JSON.stringify(config))
    } catch {
      /* ignore */
    }
  }, [lang, config])

  const value = useMemo<Store>(() => {
    const total = totalPrice(config)
    return {
      lang,
      setLang,
      t: dictionary[lang],
      config,
      update,
      total,
      waHref: whatsappHref(orderMessage(lang, config, total)),
    }
  }, [lang, config, update])

  return <NovaraContext.Provider value={value}>{children}</NovaraContext.Provider>
}

export function useNovara() {
  const store = useContext(NovaraContext)
  if (!store) throw new Error('useNovara must be used within NovaraProvider')
  return store
}
