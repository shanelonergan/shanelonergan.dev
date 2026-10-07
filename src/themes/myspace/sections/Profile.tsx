import { Fragment, type ReactNode } from 'react'
import { Link } from 'react-router'
import { bio } from '../../../content/bio'
import { skills } from '../../../content/experience'
import { projects } from '../../../content/projects'
import { site } from '../../../content/site'
import { buildDate } from '../../../shared/buildInfo'
import { PAGE_TITLE_ID, useMediaQuery } from '../../../shared/hooks'
import { FriendAvatar, OnlineIcon, ProfilePic } from '../art'
import { ProfileSong } from '../ProfileSong'
import { ContactGrid } from './ContactGrid'

const lastLogin = buildDate.toLocaleDateString('en-US', { timeZone: 'America/New_York' })

type Box = 'id' | 'contact' | 'url' | 'interests' | 'details' | 'extended' | 'song' | 'blurbs' | 'friends' | 'comments'

// Desktop keeps the classic two columns. On phones there is one column, and the
// projects (Top 8) come before the trivia. The order is changed in the DOM, not
// with CSS, so what you see is the order screen readers and the Tab key follow.
const desktopLeft: Box[] = ['id', 'contact', 'url', 'interests', 'details']
const desktopRight: Box[] = ['extended', 'song', 'blurbs', 'friends', 'comments']
const phone: Box[] = ['id', 'extended', 'contact', 'friends', 'blurbs', 'song', 'interests', 'details', 'url', 'comments']

export function Profile() {
  const isPhone = useMediaQuery('(max-width: 759px)')

  const boxes: Record<Box, ReactNode> = {
    id: (
      <section className="ms-card ms-id" aria-labelledby={PAGE_TITLE_ID}>
        <h1 id={PAGE_TITLE_ID} tabIndex={-1} className="ms-glitter ms-name">
          {site.name}
        </h1>
        <div className="ms-id-row">
          <ProfilePic />
          <div className="ms-id-info">
            <p className="ms-quote">&ldquo;{site.tagline}&rdquo;</p>
            <p>
              Brooklyn,
              <br />
              NEW YORK
              <br />
              United States
            </p>
            <p className="ms-online">
              <OnlineIcon /> Online Now!
            </p>
            <p className="ms-small">Last Login: {lastLogin}</p>
          </div>
        </div>
        <p className="ms-mood">
          <b>Mood:</b> inspired <span aria-hidden="true">✦</span>
        </p>
        <p className="ms-viewmy">
          <b>View My:</b> <Link to="/projects">Projects</Link> | <Link to="/resume">Résumé</Link>
        </p>
      </section>
    ),
    contact: (
      <section className="ms-box" aria-labelledby="ms-contacting">
        <h2 className="ms-box-head" id="ms-contacting">
          Contacting Shane
        </h2>
        <ContactGrid />
      </section>
    ),
    url: (
      <section className="ms-box ms-url" aria-label="ShaneSpace URL">
        <p>
          <b>ShaneSpace URL:</b>
          <br />
          <a href={site.url}>{site.url.replace('https://', 'http://')}</a>
        </p>
      </section>
    ),
    interests: (
      <section className="ms-box" aria-labelledby="ms-interests">
        <h2 className="ms-box-head" id="ms-interests">
          Shane&apos;s Interests
        </h2>
        <table className="ms-table">
          <tbody>
            {bio.interests.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                <td>{row.value}</td>
              </tr>
            ))}
            <tr>
              <th scope="row">Code</th>
              <td>{skills.join(', ')}</td>
            </tr>
          </tbody>
        </table>
      </section>
    ),
    details: (
      <section className="ms-box" aria-labelledby="ms-details">
        <h2 className="ms-box-head" id="ms-details">
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
    ),
    extended: (
      <p className="ms-extended">
        <b>Shane is in your extended network</b>
      </p>
    ),
    song: (
      <ProfileSong />
    ),
    blurbs: (
      <section className="ms-box" aria-labelledby="ms-blurbs">
        <h2 className="ms-box-head" id="ms-blurbs">
          Shane&apos;s Blurbs
        </h2>
        <div className="ms-box-body">
          <h3>About me:</h3>
          {site.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p>
            <Link to="/bio">Read the whole story</Link>
          </p>
          <h3>Who I&apos;d like to meet:</h3>
          <p>{bio.wantToMeet}</p>
        </div>
      </section>
    ),
    friends: (
      <section className="ms-box" aria-labelledby="ms-friends">
        <h2 className="ms-box-head" id="ms-friends">
          Shane&apos;s Friend Space <span className="ms-head-note">(Top 8)</span>
        </h2>
        <div className="ms-box-body">
          <p>
            Shane has <b className="ms-count">{projects.length}</b> friends. (They&apos;re projects. Shane is fine.)
          </p>
          <ul className="ms-top8">
            {projects.slice(0, 8).map((p, i) => {
              const href = p.liveUrl ?? p.repoUrl
              const body = (
                <>
                  <FriendAvatar name={p.name} index={i} />
                  <span className="ms-top8-name">{p.name}</span>
                </>
              )
              return (
                <li key={p.name}>
                  {href ? <a href={href}>{body}</a> : <Link to="/projects">{body}</Link>}
                </li>
              )
            })}
          </ul>
          <p className="ms-right-link">
            <Link to="/projects">View All of Shane&apos;s Friends</Link>
          </p>
        </div>
      </section>
    ),
    comments: (
      <section className="ms-box" aria-labelledby="ms-comments">
        <h2 className="ms-box-head" id="ms-comments">
          Shane&apos;s Friends Comments
        </h2>
        <div className="ms-box-body">
          <p>
            Displaying <b>0</b> of <b>0</b> comments (
            <a href={`mailto:${site.email}?subject=${encodeURIComponent('A comment for your ShaneSpace')}`}>
              Add Comment
            </a>
            )
          </p>
        </div>
      </section>
    ),
  }
  const render = (list: Box[]) => list.map((k) => <Fragment key={k}>{boxes[k]}</Fragment>)

  if (isPhone) return <div className="ms-profile">{render(phone)}</div>
  return (
    <div className="ms-profile">
      <div className="ms-left">{render(desktopLeft)}</div>
      <div className="ms-right">{render(desktopRight)}</div>
    </div>
  )
}
