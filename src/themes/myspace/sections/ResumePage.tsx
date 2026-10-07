import { education, experience, skills } from '../../../content/experience'
import { site } from '../../../content/site'
import { PAGE_TITLE_ID } from '../../../shared/hooks'

export function ResumePage() {
  return (
    <>
      <h1 id={PAGE_TITLE_ID} tabIndex={-1} className="ms-glitter ms-page-title">
        Shane&apos;s Résumé
      </h1>
      {site.resumePdf && (
        <p className="ms-subtitle">
          <a href={site.resumePdf}>Download the PDF</a>
        </p>
      )}

      <section className="ms-box" aria-labelledby="ms-companies">
        <h2 className="ms-box-head" id="ms-companies">
          Companies
        </h2>
        <div className="ms-box-body ms-scroll" tabIndex={0} role="region" aria-label="Companies table">
          <table className="ms-table ms-grid">
            <thead>
              <tr>
                <th scope="col">Company</th>
                <th scope="col">Title</th>
                <th scope="col">Dates</th>
              </tr>
            </thead>
            <tbody>
              {experience.map((r) => (
                <tr key={r.company + r.start}>
                  <td>{r.company}</td>
                  <td>{r.role}</td>
                  <td>
                    {r.start} to {r.end}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {experience.map((r) => (
        <section key={r.company + r.start} className="ms-box" aria-label={`${r.role}, ${r.company}`}>
          <h2 className="ms-box-head">
            {r.role} @ {r.company}
          </h2>
          <div className="ms-box-body">
            {r.summary && <p>{r.summary}</p>}
            <ul>
              {r.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="ms-box" aria-labelledby="ms-schools">
        <h2 className="ms-box-head" id="ms-schools">
          Schools
        </h2>
        <div className="ms-box-body ms-scroll" tabIndex={0} role="region" aria-label="Schools table">
          <table className="ms-table ms-grid">
            <thead>
              <tr>
                <th scope="col">School</th>
                <th scope="col">Studied</th>
                <th scope="col">Graduated</th>
              </tr>
            </thead>
            <tbody>
              {education.map((e) => (
                <tr key={e.school}>
                  <td>{e.school}</td>
                  <td>{e.program}</td>
                  <td>{e.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="ms-box" aria-labelledby="ms-skills">
        <h2 className="ms-box-head" id="ms-skills">
          Skills
        </h2>
        <div className="ms-box-body">
          <p>{skills.join(' · ')}</p>
        </div>
      </section>
    </>
  )
}
