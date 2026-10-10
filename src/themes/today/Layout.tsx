import '@fontsource-variable/atkinson-hyperlegible-next'
import { Link } from 'react-router'
import { site } from '../../content/site'
import type { SectionId } from '../../content/types'
import { ThemeSwitcher, focusSwitcher } from '../../shared/ThemeSwitcher'
import type { LayoutProps } from '../../shared/themeRegistry'
import { Keycaps } from './Keycaps'
import { Bio } from './sections/Bio'
import { Contact } from './sections/Contact'
import { Home } from './sections/Home'
import { NotFound } from './sections/NotFound'
import { Projects } from './sections/Projects'
import { Resume } from './sections/Resume'
import './today.css'

const views: Record<SectionId, () => React.JSX.Element> = {
  home: Home,
  projects: Projects,
  resume: Resume,
  bio: Bio,
  contact: Contact,
}

/** Today, 2026: the site as Shane would build it now. Quiet type, one loud keyboard. */
export default function TodayLayout({ section }: LayoutProps) {
  const View = section ? views[section.id] : NotFound
  return (
    <div className="td-page">
      <header className="td-header">
        {/* On the home page the hero already says the name, so the wordmark steps aside */}
        {section?.id === 'home' ? (
          <span />
        ) : (
          <p className="td-wordmark">
            <Link to="/">{site.name}</Link>
          </p>
        )}
        <ThemeSwitcher className="td-switcher" />
      </header>

      <Keycaps />

      <main id="main" className="td-main">
        <View />
      </main>

      <footer className="td-footer">
        <p>
          Every era of this site is hand-built, from a 1995 home page to this one.{' '}
          <button type="button" className="td-text-button" onClick={focusSwitcher}>
            Visit another era
          </button>
        </p>
      </footer>
    </div>
  )
}
