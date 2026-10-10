import { bio } from '../../../content/bio'
import { PAGE_TITLE_ID } from '../../../shared/hooks'

export function Bio() {
  return (
    <div className="td-bio">
      <div>
        <h1 id={PAGE_TITLE_ID} tabIndex={-1} className="td-title">
          Bio
        </h1>
        {bio.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <aside className="td-facts" aria-label="Quick facts">
        <dl>
          {bio.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </div>
  )
}
