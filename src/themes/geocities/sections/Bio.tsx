import { bio } from '../../../content/bio'
import { PAGE_TITLE_ID } from '../../../shared/hooks'

export function Bio() {
  return (
    <>
      <h1 id={PAGE_TITLE_ID} tabIndex={-1}>
        All About Me!
      </h1>
      <p className="gc-center">Welcome to the Broadway side of my home page!</p>

      <section className="gc-box" aria-labelledby="gc-story">
        <h2 id="gc-story">The Story So Far</h2>
        {bio.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </section>

      <section className="gc-box" aria-labelledby="gc-facts">
        <h2 id="gc-facts">Fast Facts</h2>
        <ul className="gc-stars">
          {bio.facts.map((f) => (
            <li key={f.label}>
              <b>{f.label}:</b> {f.value}
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
