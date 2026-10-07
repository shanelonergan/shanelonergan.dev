import { Fragment } from 'react'
import { education, experience, skills } from '../../../content/experience'
import { bio } from '../../../content/bio'
import { site } from '../../../content/site'
import { useDesktop } from '../desktopContext'
import { Icon } from '../icons'

/** "Read Me": a SimpleText-style Read Me. */
export function ReadMe() {
  const { openWindow, isTouch } = useDesktop()
  return (
    <div className="mac-doc">
      <p className="mac-doc-title">{site.name}</p>
      <p>
        <b>{site.tagline}</b>
      </p>
      {site.intro.map((line) => (
        <p key={line}>{line}</p>
      ))}
      <div className="mac-buttons">
        <button type="button" className="mac-button is-default" onClick={() => openWindow('projects')}>
          Projects
        </button>
        <button type="button" className="mac-button" onClick={() => openWindow('resume')}>
          Résumé
        </button>
        <button type="button" className="mac-button" onClick={() => openWindow('contact')}>
          Mail
        </button>
      </div>
      <p className="mac-muted mac-hint">
        {isTouch ? 'Tap' : 'Double-click'} an icon on the desktop to open it, or use the menus up top.
      </p>
    </div>
  )
}

export function Resume() {
  return (
    <div className="mac-doc">
      {site.resumePdf && (
        <p>
          <a href={site.resumePdf}>Download as PDF</a>
        </p>
      )}
      <h3>Experience</h3>
      {experience.map((r) => (
        <section key={r.company + r.start} aria-label={`${r.role}, ${r.company}`} className="mac-role">
          <h4>
            {r.role}, {r.company}
          </h4>
          <p className="mac-muted">
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
      <h3>Education</h3>
      <ul>
        {education.map((e) => (
          <li key={e.school}>
            {e.program}, {e.school} ({e.year})
          </li>
        ))}
      </ul>
      <h3>Skills</h3>
      <p>{skills.join(', ')}</p>
    </div>
  )
}

/** "Bio", laid out like a Finder Get Info window: facts up top, the story in Comments. */
export function BioInfo() {
  return (
    <div className="mac-doc mac-info">
      <div className="mac-info-head">
        <Icon kind="person" />
        <p className="mac-doc-title">{site.name}</p>
      </div>
      <dl className="mac-info-list">
        <dt>Kind:</dt>
        <dd>Full-stack engineer</dd>
        {bio.facts.map((f) => (
          <Fragment key={f.label}>
            <dt>{f.label}:</dt>
            <dd>{f.value}</dd>
          </Fragment>
        ))}
      </dl>
      <h3 id="mac-comments" className="mac-info-label">
        Comments:
      </h3>
      <div className="mac-comments" aria-labelledby="mac-comments" role="group">
        {bio.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </div>
  )
}

/** "Mail": a compose window whose Send button is a mailto: link. */
export function Mail() {
  return (
    <div className="mac-mail">
      <dl className="mac-mail-headers">
        <dt>To:</dt>
        <dd>{site.email}</dd>
        <dt>Subject:</dt>
        <dd>Hello from your desktop</dd>
      </dl>
      <div className="mac-mail-body">
        <p>Email is the best way to reach me. You can also find me here:</p>
        <ul>
          <li>
            <a href={site.github}>GitHub</a>
          </li>
          <li>
            <a href={site.linkedin}>LinkedIn</a>
          </li>
        </ul>
      </div>
      <div className="mac-buttons is-right">
        <a
          className="mac-button is-default"
          href={`mailto:${site.email}?subject=${encodeURIComponent('Hello from your desktop')}`}
        >
          Send…
        </a>
      </div>
    </div>
  )
}

/** "About This Shane", in the spirit of About This Computer. */
export function AboutThisShane() {
  return (
    <div className="mac-doc mac-about">
      <p className="mac-doc-title">Shane OS</p>
      <dl className="mac-about-list">
        <dt>Built-in memory:</dt>
        <dd>{skills.slice(0, 5).join(', ')}</dd>
        <dt>Virtual memory:</dt>
        <dd>On, set to guitar after hours</dd>
        <dt>Largest unused block:</dt>
        <dd>Weekends</dd>
      </dl>
      <p className="mac-muted">
        Running in {site.location}. This site is built with React, TypeScript and Vite; every icon is drawn by hand.
      </p>
    </div>
  )
}

export function KeyboardHelp() {
  const rows: [string, string][] = [
    ['Tab', 'Move between the menu bar, windows and desktop icons'],
    ['Enter or Space', 'Open the selected desktop icon'],
    ['← → in the menu bar', 'Move between menus'],
    ['↓ or Enter on a menu', 'Open it; ↑ ↓ to choose, Enter to pick'],
    ['Esc', 'Close the open menu, or the front window'],
    ['Collapse box', 'Window-shade: roll the window up into its title bar (or double-click the title bar)'],
    ['Best viewed in', 'Top right: switch to another era'],
  ]
  return (
    <div className="mac-doc">
      <table className="mac-keys">
        <caption className="sr-only">Keyboard shortcuts</caption>
        <tbody>
          {rows.map(([key, what]) => (
            <tr key={key}>
              <th scope="row">{key}</th>
              <td>{what}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function NotFoundAlert() {
  const { openWindow } = useDesktop()
  return (
    <div className="mac-alert-body">
      <p>
        The item &ldquo;{typeof window !== 'undefined' ? window.location.pathname : ''}&rdquo; could not be found.
      </p>
      <div className="mac-buttons is-right">
        <button type="button" className="mac-button is-default" onClick={() => openWindow('home')}>
          OK
        </button>
      </div>
    </div>
  )
}
