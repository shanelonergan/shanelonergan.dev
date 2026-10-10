import { education, experience, skills } from '../../../content/experience'
import { site } from '../../../content/site'
import { PAGE_TITLE_ID } from '../../../shared/hooks'

export function Resume() {
  return (
    <>
      <h1 id={PAGE_TITLE_ID} tabIndex={-1} className="td-title">
        Résumé
      </h1>
      {site.resumePdf && (
        <p>
          <a className="td-button" href={site.resumePdf}>
            Download the PDF
          </a>
        </p>
      )}

      <section className="td-section" aria-labelledby="td-experience">
        <h2 id="td-experience">Experience</h2>
        <ol className="td-rows">
          {experience.map((r) => (
            <li key={r.company + r.start} className="td-row">
              <span className="td-year">
                {r.start}
                <br />
                to {r.end}
              </span>
              <div>
                <h3 className="td-row-title">
                  {r.role}, {r.company}
                </h3>
                {r.summary && <p>{r.summary}</p>}
                <ul className="td-list">
                  {r.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="td-section" aria-labelledby="td-education">
        <h2 id="td-education">Education</h2>
        <ol className="td-rows">
          {education.map((e) => (
            <li key={e.school} className="td-row">
              <span className="td-year">{e.year}</span>
              <div>
                <h3 className="td-row-title">{e.school}</h3>
                <p>{e.program}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="td-section" aria-labelledby="td-skills">
        <h2 id="td-skills">Skills</h2>
        <p>{skills.join(', ')}</p>
      </section>
    </>
  )
}
