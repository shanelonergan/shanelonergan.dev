import { bio } from '../../../content/bio'
import { PAGE_TITLE_ID } from '../../../shared/hooks'

export function Blurbs() {
  return (
    <>
      <h1 id={PAGE_TITLE_ID} tabIndex={-1} className="ms-glitter ms-page-title">
        Shane&apos;s Blurbs
      </h1>
      <section className="ms-box" aria-labelledby="ms-about-me">
        <h2 className="ms-box-head" id="ms-about-me">
          About me:
        </h2>
        <div className="ms-box-body">
          {bio.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>
      <section className="ms-box" aria-labelledby="ms-meet">
        <h2 className="ms-box-head" id="ms-meet">
          Who I&apos;d like to meet:
        </h2>
        <div className="ms-box-body">
          <p>{bio.wantToMeet}</p>
        </div>
      </section>
      <section className="ms-box" aria-labelledby="ms-bio-details">
        <h2 className="ms-box-head" id="ms-bio-details">
          Shane&apos;s Details
        </h2>
        <table className="ms-table">
          <tbody>
            {bio.facts.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}:</th>
                <td>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}
