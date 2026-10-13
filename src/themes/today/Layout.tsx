import '@fontsource-variable/atkinson-hyperlegible-next'
import { Link, NavLink } from 'react-router'
import { sections, site } from '../../content/site'
import type { SectionId } from '../../content/types'
import { ThemeSwitcher, focusSwitcher } from '../../shared/ThemeSwitcher'
import type { LayoutProps } from '../../shared/themeRegistry'
import { Bio } from './sections/Bio'
import { Contact } from './sections/Contact'
import { Home } from './sections/Home'
import { NotFound } from './sections/NotFound'
import { Projects } from './sections/Projects'
import { Resume } from './sections/Resume'
import { useHouseLights, useSceneChange, useSceneCommit } from './stage'
import './today.css'

const views: Record<SectionId, () => React.JSX.Element> = {
  home: Home,
  projects: Projects,
  resume: Resume,
  bio: Bio,
  contact: Contact,
}

/** Today, 2026: the site as a stage. House lights, lighting cues, scene changes. */
export default function TodayLayout({ section }: LayoutProps) {
  const View = section ? views[section.id] : NotFound
  const [house, toggleHouse] = useHouseLights()
  const scene = useSceneChange()
  useSceneCommit()
  const up = house === 'up'

  return (
    <div className="st-root">
      <header className="st-header">
        {/* On the home page the hero already says the name */}
        {section?.id !== 'home' && (
          <p className="st-wordmark">
            <Link to="/" onClick={scene('/')}>
              {site.name}
            </Link>
          </p>
        )}

        <nav className="st-nav" aria-label="Site">
          <ul>
            {sections
              .filter((s) => s.id !== 'home')
              .map((s) => (
                <li key={s.id}>
                  <NavLink to={s.path} end onClick={scene(s.path)}>
                    {s.label}
                  </NavLink>
                </li>
              ))}
          </ul>
        </nav>

        <div className="st-controls">
          <button
            type="button"
            className="st-lights"
            role="switch"
            aria-checked={up}
            onClick={toggleHouse}
            title={up ? 'Bring the house lights down' : 'Bring the house lights up'}
          >
            <span className="st-lamp" aria-hidden="true" />
            <span>
              House lights <b>{house}</b>
            </span>
          </button>
          <ThemeSwitcher className="st-switcher" />
        </div>
      </header>

      <main id="main" className="st-main">
        <View />
      </main>

      <footer className="st-footer">
        <ul className="st-footer-links">
          <li>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </li>
          <li>
            <a href={site.github}>GitHub</a>
          </li>
          <li>
            <a href={site.linkedin}>LinkedIn</a>
          </li>
        </ul>
        <p className="st-footer-note">
          This site has five eras, from a 1995 home page to this one.{' '}
          <button type="button" className="st-text-button" onClick={focusSwitcher}>
            Pick another era
          </button>
        </p>
      </footer>
    </div>
  )
}
