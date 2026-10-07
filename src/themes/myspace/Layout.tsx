import { Link, NavLink } from 'react-router'
import { sections } from '../../content/site'
import type { SectionId } from '../../content/types'
import { ThemeSwitcher, focusSwitcher } from '../../shared/ThemeSwitcher'
import type { LayoutProps } from '../../shared/themeRegistry'
import { Blurbs } from './sections/Blurbs'
import { ContactPage } from './sections/ContactPage'
import { Friends } from './sections/Friends'
import { NotFound } from './sections/NotFound'
import { Profile } from './sections/Profile'
import { ResumePage } from './sections/ResumePage'
import './myspace.css'

const views: Record<SectionId, () => React.JSX.Element> = {
  home: Profile,
  projects: Friends,
  resume: ResumePage,
  bio: Blurbs,
  contact: ContactPage,
}

/**
 * MySpace, 2006: Shane's own "pimped-out" profile layout on "ShaneSpace".
 * The site chrome (the blue bar) stays stock, as it did on every custom profile.
 */
export default function MySpaceLayout({ section }: LayoutProps) {
  const View = section ? views[section.id] : NotFound
  return (
    <div className="ms-page">
      <header className="ms-topbar">
        <div className="ms-topbar-row">
          <p className="ms-logo">
            <Link to="/">
              Shane<span>Space</span>
            </Link>
            <span className="ms-logo-tag"> | a place for projects</span>
          </p>
          <ThemeSwitcher className="ms-switcher" />
        </div>
        <nav className="ms-nav" aria-label="Site">
          <ul>
            {sections.map((s) => (
              <li key={s.id}>
                <NavLink to={s.path} end>
                  {s.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="main" className="ms-main">
        <View />
      </main>

      <footer className="ms-footer">
        {/* Blinkies: the little animated badges every 2006 profile wore */}
        <p className="ms-blinkies" aria-hidden="true">
          <span className="ms-blinkie">React kid</span>
          <span className="ms-blinkie is-b">Rails 4 life</span>
          <span className="ms-blinkie is-c">theatre nerd</span>
        </p>
        <p>
          Layout by Shane ♥ ·{' '}
          <button type="button" className="ms-badge" onClick={focusSwitcher}>
            Best viewed in…<span className="sr-only"> (choose a theme)</span>
          </button>
        </p>
      </footer>
    </div>
  )
}
