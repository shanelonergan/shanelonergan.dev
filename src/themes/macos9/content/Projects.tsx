import { useState } from 'react'
import { projects } from '../../../content/projects'
import type { Project } from '../../../content/types'
import { useDesktop } from '../desktopContext'
import { Icon } from '../icons'

function Details({ p }: { p: Project }) {
  return (
    <div className="mac-details">
      <p>{p.oneLiner}</p>
      <p className="mac-muted">{p.stack.join(', ')}</p>
      <p className="mac-detail-links">
        {p.liveUrl && (
          <a href={p.liveUrl}>
            Open site<span className="sr-only"> for {p.name}</span>
          </a>
        )}
        {p.repoUrl && (
          <a href={p.repoUrl}>
            View source<span className="sr-only"> for {p.name}</span>
          </a>
        )}
        {p.note && <span className="mac-muted">{p.note}</span>}
      </p>
    </div>
  )
}

/** Finder list view: Name / Kind / Date with disclosure triangles. */
function ListView() {
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set([projects[0].name]))
  const toggle = (name: string) =>
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })

  return (
    <table className="mac-finder">
      <caption className="sr-only">Projects. Expand a row for details and links.</caption>
      <thead>
        <tr>
          <th scope="col" className="is-sorted">
            Name
          </th>
          <th scope="col" className="mac-col-kind">
            Kind
          </th>
          <th scope="col">Date</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((p, i) => {
          const open = expanded.has(p.name)
          const detailId = `proj-${i}`
          return [
            <tr key={p.name} className={open ? 'is-open' : undefined}>
              <th scope="row" className="mac-name-cell">
                <button
                  type="button"
                  className="mac-disclosure"
                  aria-expanded={open}
                  aria-controls={detailId}
                  onClick={() => toggle(p.name)}
                >
                  <span className="mac-triangle" aria-hidden="true" />
                  <Icon kind="folder" size={16} />
                  <span>{p.name}</span>
                </button>
              </th>
              <td className="mac-col-kind">{p.kind}</td>
              <td>{p.year}</td>
            </tr>,
            <tr key={`${p.name}-details`} id={detailId} hidden={!open} className="mac-detail-row">
              <td colSpan={3}>
                <Details p={p} />
              </td>
            </tr>,
          ]
        })}
      </tbody>
    </table>
  )
}

function IconView() {
  return (
    <ul className="mac-icon-view">
      {projects.map((p) => {
        const href = p.liveUrl ?? p.repoUrl
        const body = (
          <>
            <Icon kind="folder" />
            <span className="mac-icon-view-label">{p.name}</span>
          </>
        )
        return (
          <li key={p.name}>
            {href ? (
              <a href={href} className="mac-icon-view-item">
                {body}
              </a>
            ) : (
              <span className="mac-icon-view-item">{body}</span>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export function Projects() {
  const { projectsView } = useDesktop()
  return projectsView === 'list' ? <ListView /> : <IconView />
}
