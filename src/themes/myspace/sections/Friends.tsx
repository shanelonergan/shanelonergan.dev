import { projects } from '../../../content/projects'
import { PAGE_TITLE_ID } from '../../../shared/hooks'
import { FriendAvatar } from '../art'

export function Friends() {
  return (
    <>
      <h1 id={PAGE_TITLE_ID} tabIndex={-1} className="ms-glitter ms-page-title">
        Shane&apos;s Friends
      </h1>
      <p className="ms-subtitle">
        a.k.a. every project I&apos;ve shipped: <b>{projects.length}</b> and counting
      </p>
      <ul className="ms-friends">
        {projects.map((p, i) => (
          <li key={p.name} className="ms-box ms-friend">
            <FriendAvatar name={p.name} index={i} />
            <div className="ms-friend-body">
              <h2 className="ms-friend-name">
                {p.liveUrl ? <a href={p.liveUrl}>{p.name}</a> : p.name} <span className="ms-small">({p.year})</span>
              </h2>
              <p>{p.oneLiner}</p>
              <p className="ms-small">
                <b>Made with:</b> {p.stack.join(', ')}
              </p>
              <p className="ms-friend-links">
                {p.liveUrl && (
                  <a href={p.liveUrl}>
                    Visit<span className="sr-only"> {p.name}</span>
                  </a>
                )}
                {p.repoUrl && (
                  <a href={p.repoUrl}>
                    Source<span className="sr-only"> for {p.name}</span>
                  </a>
                )}
                {p.note && <i>{p.note}</i>}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
