import { site } from '../../../content/site'

const share = `mailto:?subject=${encodeURIComponent(`Check out ${site.name}`)}&body=${encodeURIComponent(site.url)}`

/** MySpace's "Contacting" box: every button does something real. */
export function ContactGrid() {
  const actions = [
    { label: 'Send Message', href: `mailto:${site.email}`, glyph: '✉' },
    { label: 'Add to Friends', href: site.linkedin, glyph: '+' },
    { label: 'Forward to Friend', href: share, glyph: '➜' },
    { label: 'View Code', href: site.github, glyph: '{ }' },
    ...(site.resumePdf ? [{ label: 'Get Résumé', href: site.resumePdf, glyph: '▤' }] : []),
  ]
  return (
    <ul className="ms-contact">
      {actions.map((a) => (
        <li key={a.label}>
          <a href={a.href}>
            <span className="ms-contact-glyph" aria-hidden="true">
              {a.glyph}
            </span>
            {a.label}
          </a>
        </li>
      ))}
    </ul>
  )
}
