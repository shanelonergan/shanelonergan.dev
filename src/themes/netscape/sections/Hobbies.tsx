import { hobbies } from '../../../content/hobbies'
import { PAGE_TITLE_ID } from '../../../shared/hooks'

export function Hobbies() {
  return (
    <>
      <h1 id={PAGE_TITLE_ID} tabIndex={-1}>
        Hobbies
      </h1>
      <p>When I&apos;m not writing code, this is usually what I&apos;m doing.</p>
      {hobbies.items.map((h) => (
        <section key={h.id} aria-labelledby={`hobby-${h.id}`}>
          <h2 id={`hobby-${h.id}`}>{h.title}</h2>
          {h.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </section>
      ))}
      {hobbies.showtunes.length > 0 && (
        <>
          <h2>Showtunes I love</h2>
          <ul>
            {hobbies.showtunes.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}
