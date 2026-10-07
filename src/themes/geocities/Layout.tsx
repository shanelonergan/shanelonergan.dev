import '@fontsource/comic-neue/latin-700.css'
import { NavLink } from 'react-router'
import { sections } from '../../content/site'
import type { SectionId } from '../../content/types'
import { ThemeSwitcher, focusSwitcher } from '../../shared/ThemeSwitcher'
import type { LayoutProps } from '../../shared/themeRegistry'
import { HitCounter } from './HitCounter'
import { Marquee } from './Marquee'
import { Webring } from './Webring'
import { Contact } from './sections/Contact'
import { Hobbies } from './sections/Hobbies'
import { Home } from './sections/Home'
import { NotFound } from './sections/NotFound'
import { Projects } from './sections/Projects'
import { Resume } from './sections/Resume'
import './geocities.css'

const views: Record<SectionId, () => React.JSX.Element> = {
  home: Home,
  projects: Projects,
  resume: Resume,
  hobbies: Hobbies,
  contact: Contact,
}

/** GeoCities addresses were neighborhood/suburb/number. The hobbies page lives on Broadway. */
function neighborhood(section: LayoutProps['section']) {
  return section?.id === 'hobbies'
    ? { name: 'Broadway', address: 'Broadway/Stage/1998' }
    : { name: 'SiliconValley', address: 'SiliconValley/Heights/1999' }
}

export default function GeoCitiesLayout({ section }: LayoutProps) {
  const View = section ? views[section.id] : NotFound
  const hood = neighborhood(section)

  return (
    <div className="gc-page">
      <aside className="gc-topbar" aria-label="Theme">
        <ThemeSwitcher className="gc-switcher" />
      </aside>

      <div className={`gc-panel${section?.id === 'hobbies' ? ' is-broadway' : ''}`}>
        <header className="gc-header">
          <div className="gc-construction">
            <span>This page is always under construction!</span>
          </div>
          <p className="gc-welcome">
            <span aria-hidden="true">★ </span>Welcome to<span aria-hidden="true"> ★</span>
          </p>
          <p className="gc-sitename">Shane&apos;s Home Page</p>
          <Marquee>
            Thanks for stopping by! ✦ Now with 100% more Rails ✦ NEW: Seen, my audition tracker ✦ Best viewed at
            800x600 ✦ Don&apos;t forget to sign my guestbook!
          </Marquee>
        </header>

        <nav className="gc-nav" aria-label="Site">
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

        <main id="main" className="gc-main">
          <View />
        </main>

        <hr />

        <aside className="gc-visitor" aria-label="Visitor counter">
          <HitCounter />
        </aside>

        <footer className="gc-footer">
          {/* keyed so "Random" is re-rolled on every page */}
          <Webring key={section?.id ?? 'none'} current={section?.id ?? null} />
          <p className="gc-hood">
            You are in the <b>{hood.name}</b> neighborhood: <code>{hood.address}</code>
          </p>
          <button type="button" className="gc-badge" onClick={focusSwitcher}>
            <span className="gc-badge-small">Best viewed in</span>
            <span className="gc-badge-big">any era</span>
            <span className="sr-only"> (choose a theme)</span>
          </button>
        </footer>
      </div>
    </div>
  )
}
