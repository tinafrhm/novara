import { useEffect, useState } from 'react'
import { useNovara } from '../context'
import { formatMoney, formatPhone, orderLines, PHONE_TEL } from '../order'

export function PrintSheet() {
  const { lang, t, config, total } = useNovara()
  const [when, setWhen] = useState(() => new Date())

  useEffect(() => {
    const update = () => setWhen(new Date())
    window.addEventListener('beforeprint', update)
    return () => window.removeEventListener('beforeprint', update)
  }, [])

  const lines = orderLines(lang, config)
  const dateText = new Intl.DateTimeFormat(lang === 'fa' ? 'fa-IR' : 'en-GB', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(when)

  return (
    <article className="print-sheet">
      <p className="print-brand">NOVARA</p>
      <p className="print-tag">{t.footerTag}</p>
      <h1>{t.printHeading}</h1>
      <p className="print-date">{dateText}</p>
      <h2>{t.productName}</h2>
      <table>
        <tbody>
          {lines.map((line) => (
            <tr key={line.key}>
              <th scope="row">{line.label}</th>
              <td>{line.value}</td>
            </tr>
          ))}
          <tr className="sum">
            <th scope="row">{t.total}</th>
            <td>{formatMoney(total, lang)}</td>
          </tr>
        </tbody>
      </table>
      <p>{t.printNote}</p>
      <p className="print-phone">
        <a href={PHONE_TEL}>{formatPhone(lang)}</a>
      </p>
    </article>
  )
}
