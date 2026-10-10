import { NavLink } from 'react-router'
import { sections } from '../../content/site'
import type { SectionId } from '../../content/types'

/** Each section gets a keycap from Shane's keyboard: a legend letter and a pastel. */
const caps: Record<SectionId, { legend: string; color: string }> = {
  home: { legend: 'H', color: 'petal' },
  projects: { legend: 'P', color: 'butter' },
  resume: { legend: 'R', color: 'mint' },
  bio: { legend: 'B', color: 'aqua' },
  contact: { legend: 'C', color: 'lilac' },
}

/** The site nav as a row of keycaps. The current page's key stays pressed. */
export function Keycaps() {
  return (
    <nav className="td-keys" aria-label="Site">
      <ul>
        {sections.map((s) => (
          <li key={s.id}>
            <NavLink to={s.path} end className={`td-key is-${caps[s.id].color}`}>
              <span className="td-key-legend" aria-hidden="true">
                {caps[s.id].legend}
              </span>
              <span className="td-key-label">{s.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
