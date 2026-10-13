import { Link } from 'react-router'
import { projects } from '../../../content/projects'
import { site } from '../../../content/site'
import { PAGE_TITLE_ID } from '../../../shared/hooks'
import photo from '../shane.webp'
import { useSceneChange } from '../stage'

export function Home() {
  const scene = useSceneChange()

  return (
    <>
      <section className="st-hero full-width" aria-labelledby={PAGE_TITLE_ID}>
        {/* The spot: its own layer, drifting slowly as a transform so the stage never repaints */}
        <div className="st-spot" aria-hidden="true" />
        <div className="st-hero-inner">
          <div className="st-hero-text">
            <h1 id={PAGE_TITLE_ID} tabIndex={-1} className="st-name">
              Shane
              <br />
              Lonergan
            </h1>
            <p className="st-lede">{site.tagline}</p>
            {site.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="st-actions">
              <Link className="st-button" to="/projects" onClick={scene('/projects')}>
                See my projects
              </Link>
              <a className="st-button is-ghost" href={`mailto:${site.email}`}>
                Email me
              </a>
            </p>
          </div>
          <img
            className="st-portrait"
            src={photo}
            width={640}
            height={800}
            fetchPriority="high"
            alt="Shane in a rust corduroy blazer and cream sweater, holding a mechanical keyboard with pastel keycaps"
          />
        </div>
      </section>

      <section className="st-section st-cue" aria-labelledby="st-recent">
        <h2 id="st-recent">Recent work</h2>
        <ul className="st-rows">
          {projects.slice(0, 3).map((p) => (
            <li key={p.name} className="st-row">
              <span className="st-year">{p.year}</span>
              <div>
                <h3 className="st-row-title">{p.liveUrl ? <a href={p.liveUrl}>{p.name}</a> : p.name}</h3>
                <p>{p.oneLiner}</p>
              </div>
            </li>
          ))}
        </ul>
        <p>
          <Link to="/projects" onClick={scene('/projects')}>
            All {projects.length} projects
          </Link>
        </p>
      </section>

      <section className="st-section st-cue" aria-labelledby="st-offstage">
        <h2 id="st-offstage" className="sr-only">
          Offstage
        </h2>
        <blockquote className="st-quote">
          <p>Actors are bricklayers. It turns out programmers are too.</p>
        </blockquote>
        <p>
          I came to code from the theater, and I&apos;m still a working actor and musician.{' '}
          <Link to="/bio" onClick={scene('/bio')}>
            Read the bio
          </Link>
        </p>
      </section>

      <section className="st-section st-cue" aria-labelledby="st-reach">
        <h2 id="st-reach">Get in touch</h2>
        <p>
          <a className="st-email" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </p>
        <p className="st-muted">I read everything, and I write back.</p>
      </section>
    </>
  )
}
