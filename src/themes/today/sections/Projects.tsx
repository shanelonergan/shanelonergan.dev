import { useState } from 'react'
import { projects } from '../../../content/projects'
import { PAGE_TITLE_ID } from '../../../shared/hooks'

export function Projects() {
  // The stage beside the list shows whichever project is under the pointer or focus
  const [active, setActive] = useState(0)
  const lit = projects[active]

  return (
    <div className="st-projects">
      <div className="st-projects-list">
        <h1 id={PAGE_TITLE_ID} tabIndex={-1} className="st-title">
          Projects
        </h1>
        <p className="st-lede">Things I&apos;ve built, newest first. Most are React on the front and Rails on the back.</p>
        <ul className="st-rows">
          {projects.map((p, i) => {
            const main = p.liveUrl ?? p.repoUrl
            return (
              <li
                key={p.name}
                className={`st-row st-project${i === active ? ' is-lit' : ''}`}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <span className="st-year">{p.year}</span>
                <div className="st-project-body">
                  <h2 className="st-row-title">
                    {main ? (
                      <a className="st-row-link" href={main}>
                        {p.name}
                      </a>
                    ) : (
                      p.name
                    )}
                  </h2>
                  <p>{p.oneLiner}</p>
                  <ul className="st-pills" aria-label="Built with">
                    {p.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <p className="st-links">
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
                    {p.note && <span className="st-muted">{p.note}</span>}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      {/* A little stage for the lit project. Decorative: everything here is already in the list. */}
      <aside className="st-stage" aria-hidden="true">
        <p className="st-stage-kind">{lit.kind}</p>
        <p className="st-stage-name">{lit.name}</p>
        <p className="st-stage-year">{lit.year}</p>
        <p className="st-stage-cast">{lit.stack.join(', ')}</p>
      </aside>
    </div>
  )
}
