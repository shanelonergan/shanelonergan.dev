import { Link } from 'react-router'
import { hotlist } from '../../../content/hotlist'
import { projects } from '../../../content/projects'
import { site } from '../../../content/site'
import { PAGE_TITLE_ID } from '../../../shared/hooks'
import { ProjectList } from './ProjectList'

export function Home() {
  return (
    <>
      <h1 id={PAGE_TITLE_ID} tabIndex={-1}>
        {site.name}
      </h1>
      <p>
        <b>{site.tagline}</b>
      </p>
      {site.intro.map((line) => (
        <p key={line}>{line}</p>
      ))}
      <p>
        You can <Link to="/projects">see what I&apos;ve built</Link>, <Link to="/resume">read my résumé</Link>, or
        email me at <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <hr />

      <h2>Recent projects</h2>
      <ProjectList items={projects.slice(0, 3)} />
      <p>
        <Link to="/projects">All {projects.length} projects</Link>
      </p>

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
