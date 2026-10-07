import { NavLink } from 'react-router'
import { sections, site } from '../../content/site'
import type { SectionId } from '../../content/types'
import { netscapeDate } from '../../shared/buildInfo'
import { ThemeSwitcher, focusSwitcher } from '../../shared/ThemeSwitcher'
import type { LayoutProps } from '../../shared/themeRegistry'
import { Bio } from './sections/Bio'
import { Contact } from './sections/Contact'
import { Home } from './sections/Home'
import { NotFound } from './sections/NotFound'
import { Projects } from './sections/Projects'
import { Resume } from './sections/Resume'
import './netscape.css'

const views: Record<SectionId, () => React.JSX.Element> = {
  home: Home,
  projects: Projects,
  resume: Resume,
  bio: Bio,
  contact: Contact,
}

export default function NetscapeLayout({ section }: LayoutProps) {
  const View = section ? views[section.id] : NotFound
  return (
    <div className="ns-page">
      <header className="ns-header">
        <ThemeSwitcher className="ns-switcher" />
      </header>

      <div className="ns-columns">
        <nav className="ns-nav" aria-label="Site">
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

        <main id="main" className="ns-main">
          <View />
        </main>
      </div>

      <footer className="ns-footer">
        <hr />
        <address>
          {site.name} &lt;<a href={`mailto:${site.email}`}>{site.email}</a>&gt;
        </address>
        <p className="ns-modified">Last modified: {netscapeDate()}</p>
        <button type="button" className="ns-badge" onClick={focusSwitcher}>
          <span className="ns-badge-small">Best viewed in</span>
          <span className="ns-badge-big">any era</span>
          <span className="sr-only"> (choose a theme)</span>
        </button>
      </footer>
    </div>
  )
}
