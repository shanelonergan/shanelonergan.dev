import { bio } from '../../../content/bio'
import { PAGE_TITLE_ID } from '../../../shared/hooks'

export function Bio() {
  return (
    <>
      <h1 id={PAGE_TITLE_ID} tabIndex={-1}>
        Bio
      </h1>
      {bio.paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}

      <h2>Vital statistics</h2>
      <dl className="ns-facts">
        {bio.facts.map((f) => (
          <div key={f.label}>
            <dt>{f.label}:</dt> <dd>{f.value}</dd>
          </div>
        ))}
      </dl>
    </>
  )
}
