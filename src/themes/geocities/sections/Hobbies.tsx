import { hobbies } from '../../../content/hobbies'
import { PAGE_TITLE_ID } from '../../../shared/hooks'

const corners: Record<string, string> = {
  guitar: 'Guitar Corner',
  theatre: 'On Stage',
  keyboards: 'Keyboard Korner',
}

export function Hobbies() {
  return (
    <>
      <h1 id={PAGE_TITLE_ID} tabIndex={-1}>
        My Interests
      </h1>
      <p className="gc-center">Welcome to the Broadway side of my home page!</p>

      {hobbies.items.map((h) => (
        <section key={h.id} className="gc-box" aria-labelledby={`gc-hobby-${h.id}`}>
          <h2 id={`gc-hobby-${h.id}`}>{corners[h.id] ?? h.title}</h2>
          {h.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </section>
      ))}

      <section className="gc-box" aria-labelledby="gc-showtunes">
        <h2 id="gc-showtunes">Showtunes I Love</h2>
        {hobbies.showtunes.length > 0 ? (
          <ol>
            {hobbies.showtunes.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ol>
        ) : (
          <p className="gc-coming-soon">This list is under construction. Check back soon!</p>
        )}
      </section>
    </>
  )
}
