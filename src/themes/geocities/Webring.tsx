import { useState } from 'react'
import { Link } from 'react-router'
import { sections, site } from '../../content/site'
import type { SectionId } from '../../content/types'

/** A webring that rings around this site's own sections. */
export function Webring({ current }: { current: SectionId | null }) {
  const index = Math.max(
    0,
    sections.findIndex((s) => s.id === current),
  )
  const prev = sections[(index - 1 + sections.length) % sections.length]
  const next = sections[(index + 1) % sections.length]
  // Picked once per page; never the page you're on.
  const [random] = useState(() => {
    const others = sections.filter((s) => s.id !== current)
    return others[Math.floor(Math.random() * others.length)]
  })

  return (
    <nav className="gc-webring" aria-label="Webring">
      <p className="gc-webring-title">
        This <b>Brooklyn Coders Ring</b> site is owned by {site.name}.
      </p>
      <ul>
        <li>
          <Link to={prev.path}>
            <span aria-hidden="true">◄ </span>Prev<span className="sr-only">ious: {prev.label}</span>
          </Link>
        </li>
        <li>
          <Link to={random.path}>
            Random<span className="sr-only">: {random.label}</span>
          </Link>
        </li>
        <li>
          <Link to={next.path}>
            Next<span className="sr-only">: {next.label}</span>
            <span aria-hidden="true"> ►</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
