import { projects } from '../../../content/projects'
import { PAGE_TITLE_ID } from '../../../shared/hooks'

export function Projects() {
  return (
    <>
      <h1 id={PAGE_TITLE_ID} tabIndex={-1} className="td-title">
        Projects
      </h1>
      <p className="td-lede">Things I&apos;ve built, newest first. Most are React on the front and Rails on the back.</p>
      <ul className="td-rows">
        {projects.map((p) => (
          <li key={p.name} className="td-row">
            <span className="td-year">{p.year}</span>
            <div>
              <h2 className="td-row-title">{p.liveUrl ? <a href={p.liveUrl}>{p.name}</a> : p.name}</h2>
              <p>{p.oneLiner}</p>
              <p className="td-meta">{p.stack.join(', ')}</p>
              <p className="td-links">
                {p.liveUrl && (
                  <a href={p.liveUrl}>
                    Visit site<span className="sr-only"> for {p.name}</span>
                  </a>
                )}
                {p.repoUrl && (
                  <a href={p.repoUrl}>
                    Source code<span className="sr-only"> for {p.name}</span>
                  </a>
                )}
                {p.note && <span className="td-meta">{p.note}</span>}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
