import { education, experience, skills } from '../../../content/experience'
import { site } from '../../../content/site'
import { PAGE_TITLE_ID } from '../../../shared/hooks'

export function Resume() {
  return (
    <>
      <div className="st-title-row">
        <h1 id={PAGE_TITLE_ID} tabIndex={-1} className="st-title">
          Résumé
        </h1>
        {site.resumePdf && (
          <a className="st-button is-ghost" href={site.resumePdf}>
            Download the PDF
          </a>
        )}
      </div>

      <section className="st-section st-cue" aria-labelledby="st-experience">
        <h2 id="st-experience">Experience</h2>
        <ol className="st-rows">
          {experience.map((r) => (
            <li key={r.company + r.start} className="st-row">
              <span className="st-year">
                {r.start}
                <span className="st-year-to"> to </span>
                {r.end}
              </span>
              <div>
                <h3 className="st-row-title">
                  {r.role}, {r.company}
                </h3>
                {r.summary && <p>{r.summary}</p>}
                <ul className="st-list">
                  {r.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="st-section st-cue" aria-labelledby="st-education">
        <h2 id="st-education">Education</h2>
        <ol className="st-rows">
          {education.map((e) => (
            <li key={e.school} className="st-row">
              <span className="st-year">{e.year}</span>
              <div>
                <h3 className="st-row-title">{e.school}</h3>
                <p>{e.program}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="st-section st-cue" aria-labelledby="st-skills">
        <h2 id="st-skills">Skills</h2>
        <ul className="st-pills is-large">
          {skills.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>
    </>
  )
}
