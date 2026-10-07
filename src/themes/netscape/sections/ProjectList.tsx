import type { Project } from '../../../content/types'

export function ProjectList({ items }: { items: Project[] }) {
  return (
    <dl className="ns-projects">
      {items.map((p) => (
        <div key={p.name} className="ns-project">
          <dt>
            {p.liveUrl ? <a href={p.liveUrl}>{p.name}</a> : <b>{p.name}</b>} ({p.year})
          </dt>
          <dd>
            {p.oneLiner}
            <br />
            <small>
              <i>Built with</i> {p.stack.join(', ')}
            </small>
            <br />
            {p.liveUrl && (
              <>
                [<a href={p.liveUrl}>visit the site</a>]{' '}
              </>
            )}
            {p.repoUrl && (
              <>
                [<a href={p.repoUrl}>read the source</a>]
              </>
            )}
            {p.note && <i>{p.note}</i>}
          </dd>
        </div>
      ))}
    </dl>
  )
}
