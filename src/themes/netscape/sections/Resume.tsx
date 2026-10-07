import { education, experience, skills } from '../../../content/experience'
import { site } from '../../../content/site'
import { PAGE_TITLE_ID } from '../../../shared/hooks'

export function Resume() {
  return (
    <>
      <h1 id={PAGE_TITLE_ID} tabIndex={-1}>
        Résumé
      </h1>
      <p>
        {site.name}
        <br />
        {site.location}
        <br />
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
      {site.resumePdf && (
        <p>
          You can also <a href={site.resumePdf}>download this as a PDF</a>.
        </p>
      )}

      <h2>Experience</h2>
      {experience.map((r) => (
        <section key={r.company + r.start} className="ns-role" aria-label={`${r.role}, ${r.company}`}>
          <h3>
            {r.role}, {r.company}
          </h3>
          <p className="ns-dates">
            <i>
              {r.start}–{r.end}
            </i>
          </p>
          {r.summary && <p>{r.summary}</p>}
          <ul>
            {r.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </section>
      ))}

      <h2>Education</h2>
      <ul>
        {education.map((e) => (
          <li key={e.school}>
            {e.program}, {e.school} ({e.year})
          </li>
        ))}
      </ul>

      <h2>Skills</h2>
      <p>{skills.join(', ')}.</p>
    </>
  )
}
