import { Link } from 'react-router'
import { projects } from '../../../content/projects'
import { site } from '../../../content/site'
import { PAGE_TITLE_ID } from '../../../shared/hooks'
import photo from '../shane.webp'

export function Home() {
  return (
    <>
      <section className="td-hero" aria-labelledby={PAGE_TITLE_ID}>
        <div className="td-hero-text">
          <h1 id={PAGE_TITLE_ID} tabIndex={-1} className="td-name">
            Shane
            <br />
            Lonergan
          </h1>
          <p className="td-lede">{site.tagline}</p>
          {site.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="td-actions">
            <Link className="td-button" to="/projects">
              See my projects
            </Link>
            <a className="td-button is-quiet" href={`mailto:${site.email}`}>
              Email me
            </a>
          </p>
        </div>
        <img
          className="td-photo"
          src={photo}
          width={320}
          height={400}
          alt="Shane in a rust corduroy blazer and cream sweater, holding a mechanical keyboard with pastel keycaps"
        />
      </section>

      <section className="td-section" aria-labelledby="td-recent">
        <h2 id="td-recent">Recent work</h2>
        <ul className="td-rows">
          {projects.slice(0, 3).map((p) => (
            <li key={p.name} className="td-row">
              <span className="td-year">{p.year}</span>
              <div>
                <h3 className="td-row-title">
                  {p.liveUrl ? <a href={p.liveUrl}>{p.name}</a> : p.name}
                </h3>
                <p>{p.oneLiner}</p>
              </div>
            </li>
          ))}
        </ul>
        <p>
          <Link to="/projects">All {projects.length} projects</Link>
        </p>
      </section>
    </>
  )
}
