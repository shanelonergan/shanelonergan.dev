import { education, experience, skills } from '../../../content/experience'
import { site } from '../../../content/site'
import { PAGE_TITLE_ID } from '../../../shared/hooks'

export function Resume() {
  return (
    <>
      <h1 id={PAGE_TITLE_ID} tabIndex={-1}>
        My Résumé
      </h1>
      {site.resumePdf && (
        <p className="gc-center">
          <a className="gc-download" href={site.resumePdf}>
            Download my résumé (PDF)
          </a>
        </p>
      )}

      <h2>Where I&apos;ve worked</h2>
      {experience.map((r) => (
        <section key={r.company + r.start} className="gc-box" aria-label={`${r.role}, ${r.company}`}>
          <h3>
            {r.role} @ {r.company}
          </h3>
          <p className="gc-dates">
            {r.start} to {r.end}
          </p>
          {r.summary && <p>{r.summary}</p>}
          <ul>
            {r.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </section>
      ))}

      <h2>School</h2>
      <ul>
        {education.map((e) => (
          <li key={e.school}>
            <b>{e.school}</b>: {e.program} ({e.year})
          </li>
        ))}
      </ul>

      <h2>Stuff I know</h2>
      <ul className="gc-stars gc-skills">
        {skills.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </>
  )
}
