import { Link } from 'react-router'
import { hotlist } from '../../../content/hotlist'
import { projects } from '../../../content/projects'
import { sections, site } from '../../../content/site'
import { PAGE_TITLE_ID } from '../../../shared/hooks'
import { LinkIcon, Seal } from '../icons'

export function Home() {
  return (
    <>
      {/* The banner "image" of the period, drawn in CSS; it is also the page's h1 */}
      <h1 id={PAGE_TITLE_ID} tabIndex={-1} className="ns-banner">
        <Seal />
        <span className="ns-banner-text">
          <span className="ns-banner-small">Welcome to</span> <span className="ns-banner-big">{site.name}&apos;s</span>{' '}
          <span className="ns-banner-small">Home Page</span>
        </span>
      </h1>

      <hr />

      <p>
        <b>{site.tagline}</b>
      </p>
      {site.intro.map((line) => (
        <p key={line}>{line}</p>
      ))}

      <ul className="ns-iconlist">
        {sections
          .filter((s) => s.id !== 'home')
          .map((s) => (
            <li key={s.id}>
              <LinkIcon id={s.id} />
              <span>
                <Link to={s.path}>{s.id === 'projects' ? `${s.label} (${projects.length})` : s.label}</Link> -{' '}
                {s.blurb}
              </span>
            </li>
          ))}
      </ul>

      <hr />

      <h2>My .plan</h2>
      <figure className="ns-plan">
        <figcaption>
          <code>% finger shane@shanelonergan.dev</code>
        </figcaption>
        <pre>
          {/* finger's two-column header; the columns stack on narrow screens */}
          <span className="ns-finger-row">
            <span className="ns-finger-field">Login: shane</span>
            <span className="ns-finger-field">Name: {site.name}</span>
          </span>
          <span className="ns-finger-row">
            <span className="ns-finger-field">Directory: /home/shane</span>
            <span className="ns-finger-field">Shell: /bin/zsh</span>
          </span>
          {['Plan:', ...site.plan].join('\n')}
        </pre>
      </figure>

      <hr />

      <h2>Hotlist</h2>
      <p>Some places on the web I like:</p>
      <ul>
        {hotlist.map((link) => (
          <li key={link.url}>
            <a href={link.url}>{link.title}</a>: {link.note}
          </li>
        ))}
      </ul>
    </>
  )
}
