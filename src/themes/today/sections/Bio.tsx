import { bio } from '../../../content/bio'
import { PAGE_TITLE_ID } from '../../../shared/hooks'
import photo from '../shane.webp'

export function Bio() {
  const [opening, ...rest] = bio.paragraphs
  return (
    <div className="st-bio">
      <h1 id={PAGE_TITLE_ID} tabIndex={-1} className="st-title">
        Bio
      </h1>
      <img
        className="st-portrait"
        src={photo}
        width={640}
        height={800}
        alt="Shane in a rust corduroy blazer and cream sweater, holding a mechanical keyboard with pastel keycaps"
      />
      <div className="st-prose">
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
