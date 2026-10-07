import { projects } from '../../../content/projects'
import { PAGE_TITLE_ID } from '../../../shared/hooks'

export function Projects() {
  return (
    <>
      <h1 id={PAGE_TITLE_ID} tabIndex={-1}>
        My Projects
      </h1>
      <p className="gc-center">Here&apos;s stuff I&apos;ve made. Click around!</p>
      <ul className="gc-projects">
        {projects.map((p) => (
          <li key={p.name} className="gc-box">
            <h2 className="gc-project-name">
              {p.liveUrl ? <a href={p.liveUrl}>{p.name}</a> : p.name} <span className="gc-year">({p.year})</span>
            </h2>
            <p>{p.oneLiner}</p>
            <p className="gc-stack">
              <b>Made with:</b> {p.stack.join(' · ')}
            </p>
            <p className="gc-links">
              {p.liveUrl && (
                <a href={p.liveUrl}>
                  Visit it<span className="sr-only"> ({p.name})</span>
                </a>
              )}
              {p.repoUrl && (
                <a href={p.repoUrl}>
                  See the code<span className="sr-only"> ({p.name})</span>
                </a>
              )}
              {p.note && <i>{p.note}</i>}
            </p>
          </li>
        ))}
      </ul>
    </>
  )
}
