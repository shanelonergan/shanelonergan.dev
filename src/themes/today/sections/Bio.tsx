import { bio } from '../../../content/bio'
import { PAGE_TITLE_ID } from '../../../shared/hooks'

export function Bio() {
  const [opening, ...rest] = bio.paragraphs
  return (
    <div className="st-bio">
      <div className="st-prose">
        <h1 id={PAGE_TITLE_ID} tabIndex={-1} className="st-title">
          Bio
        </h1>
        <p className="st-lede">{opening}</p>
        {rest.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <aside className="st-facts st-cue" aria-label="Quick facts">
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
