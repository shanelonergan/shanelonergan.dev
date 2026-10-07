import { Link } from 'react-router'
import { projects } from '../../../content/projects'
import { site } from '../../../content/site'
import { PAGE_TITLE_ID } from '../../../shared/hooks'

export function Home() {
  const latest = projects[0]
  return (
    <>
      <h1 id={PAGE_TITLE_ID} tabIndex={-1}>
        Hi! I&apos;m Shane.
      </h1>
      <p className="gc-lead">{site.tagline}</p>
      {site.intro.map((line) => (
        <p key={line}>{line}</p>
      ))}

      <h2>Where to next?</h2>
      <ul className="gc-stars">
        <li>
          <Link to="/projects">Check out my projects</Link> ({projects.length} and counting)
        </li>
        <li>
          <Link to="/resume">Read my résumé</Link>
        </li>
        <li>
          <a href={`mailto:${site.email}`}>E-mail me!</a> at {site.email}
        </li>
        <li>
          <Link to="/hobbies">My interests</Link>: guitar and showtunes
        </li>
      </ul>

      <h2>What&apos;s new?</h2>
      <p>
        <span className="gc-new">NEW!</span> I&apos;m building <b>{latest.name}</b>. {latest.oneLiner}
      </p>
    </>
  )
}
