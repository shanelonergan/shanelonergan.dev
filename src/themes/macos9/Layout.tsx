import { useCallback, useEffect, useMemo, useReducer, useRef, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { hobbies } from '../../content/hobbies'
import { projects } from '../../content/projects'
import { site } from '../../content/site'
import { announce } from '../../shared/announce'
import { PAGE_TITLE_ID, useMediaQuery, usePrefersReducedMotion, type NavState } from '../../shared/hooks'
import { safeGet, safeSet } from '../../shared/storage'
import { ThemeSwitcher, focusSwitcher } from '../../shared/ThemeSwitcher'
import type { LayoutProps } from '../../shared/themeRegistry'
import { AboutThisShane, Hobbies, KeyboardHelp, Mail, NotFoundAlert, ReadMe, Resume } from './content/Documents'
import { Projects } from './content/Projects'
import { DesktopContext, type DesktopApi } from './desktopContext'
import { DesktopIcons } from './DesktopIcons'
import { SparkleGlyph } from './icons'
import { MenuBar, type Menu } from './MenuBar'
import { StartupScreen } from './StartupScreen'
import { TrashAlert } from './TrashAlert'
import { Window } from './Window'
import { desktopIcons, initialWm, winMeta, wmReducer, type Win, type WinId } from './windows'
import './macos9.css'

/** Navigations the window manager makes itself; the route→window sync ignores them. */
interface WmNav extends NavState {
  wm?: boolean
}

const STARTUP_KEY = 'startup-seen'

const contents: Record<WinId, ReactNode> = {
  home: <ReadMe />,
  projects: <Projects />,
  resume: <Resume />,
  hobbies: <Hobbies />,
  contact: <Mail />,
  about: <AboutThisShane />,
  help: <KeyboardHelp />,
  notfound: <NotFoundAlert />,
}

const info: Partial<Record<WinId, string>> = {
  projects: `${projects.length} items`,
  hobbies: `${hobbies.items.length} items`,
}

function Clock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 15_000)
    return () => window.clearInterval(id)
  }, [])
  return (
    <span className="mac-clock" aria-hidden="true">
      {now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
    </span>
  )
}

export default function MacLayout({ section }: LayoutProps) {
  const [wm, dispatch] = useReducer(wmReducer, initialWm)
  const navigate = useNavigate()
  const location = useLocation()
  const isNarrow = useMediaQuery('(max-width: 719px)')
  const canDrag = useMediaQuery('(pointer: fine) and (min-width: 720px)')
  const isTouch = useMediaQuery('(pointer: coarse)')
  const reducedMotion = usePrefersReducedMotion()
  const desktopRef = useRef<HTMLElement>(null)
  const [booting, setBooting] = useState(() => !reducedMotion && !safeGet(STARTUP_KEY, 'session'))
  const [trashOpen, setTrashOpen] = useState(false)
  const [flash, setFlash] = useState('')

  const viewport = () => ({
    w: desktopRef.current?.clientWidth ?? window.innerWidth,
    h: desktopRef.current?.clientHeight ?? window.innerHeight,
  })

  const finishStartup = useCallback(() => {
    setBooting(false)
    safeSet(STARTUP_KEY, '1', 'session')
  }, [])

  // Route → window: arriving at /projects (by link, back button or reload) opens Projects.
  const routeWin: WinId = section ? section.id : 'notfound'
  useEffect(() => {
    if ((location.state as WmNav | null)?.wm) return
    dispatch({ type: 'open', id: routeWin, viewport: viewport() })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key, routeWin])

  const focusFrontTitle = () => requestAnimationFrame(() => document.getElementById(PAGE_TITLE_ID)?.focus())

  const openWindow = useCallback(
    (id: WinId) => {
      dispatch({ type: 'open', id, viewport: viewport() })
      const path = winMeta[id].path
      if (path && path !== location.pathname) navigate(path, { state: { wm: true } satisfies WmNav })
      focusFrontTitle()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.pathname, navigate],
  )

  // Clicking or tabbing into a window brings it to the front; the URL follows, focus stays put.
  const focusWindow = (id: WinId) => {
    if (wm.front === id) return
    dispatch({ type: 'focus', id })
    const path = winMeta[id].path
    if (path && path !== location.pathname) navigate(path, { state: { wm: true, keepFocus: true } satisfies WmNav })
  }

  const closeWindow = useCallback(
    (id: WinId) => {
      const next = Object.values(wm.wins)
        .filter((w): w is Win => !!w?.open && w.id !== id)
        .sort((a, b) => b.z - a.z)[0]
      dispatch({ type: 'close', id })
      const path = next ? (winMeta[next.id].path ?? location.pathname) : '/'
      if (path !== location.pathname) navigate(path, { state: { wm: true, keepFocus: true } satisfies WmNav })
      // Return focus to the icon that opens this window, else the menu bar
      requestAnimationFrame(() => {
        const target =
          document.getElementById(`icon-${id}`) ?? document.querySelector<HTMLElement>('.mac-menu-title[tabindex="0"]')
        target?.focus()
      })
    },
    [wm.wins, location.pathname, navigate],
  )

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setFlash('Copied!')
      announce(`Copied ${site.email} to the clipboard`)
    } catch {
      setFlash(site.email)
      announce(`Couldn't copy. The address is ${site.email}`)
    }
    window.setTimeout(() => setFlash(''), 2500)
  }

  const restart = () => {
    dispatch({ type: 'reset' })
    navigate('/', { state: { wm: false } satisfies WmNav })
    if (!reducedMotion) setBooting(true)
    announce('Restarted')
  }

  const anyOpen = wm.front !== null
  const openItems = desktopIcons.map(({ id, label }) => ({ label: `Open ${label}`, onSelect: () => openWindow(id) }))

  const menus: Menu[] = isNarrow
    ? [
        {
          id: 'windows',
          label: (
            <>
              <SparkleGlyph /> Windows
            </>
          ),
          ariaLabel: 'Windows',
          items: [
            ...desktopIcons.map(({ id, label }) => ({
              label,
              checked: wm.front === id,
              onSelect: () => openWindow(id),
            })),
            { label: 'Copy Email Address', onSelect: copyEmail, separatorBefore: true },
            { label: 'About This Shane…', onSelect: () => openWindow('about') },
            { label: 'Keyboard Help', onSelect: () => openWindow('help') },
            { label: 'Empty Trash…', onSelect: () => setTrashOpen(true) },
            { label: 'Restart', onSelect: restart },
          ],
        },
      ]
    : [
        {
          id: 'shane',
          label: <SparkleGlyph />,
          ariaLabel: 'Shane',
          items: [
            { label: 'About This Shane…', onSelect: () => openWindow('about') },
            { label: 'Keyboard Help', onSelect: () => openWindow('help'), separatorBefore: true },
          ],
        },
        {
          id: 'file',
          label: 'File',
          items: [
            ...openItems,
            {
              label: 'Close Window',
              hint: 'Esc',
              disabled: !anyOpen,
              separatorBefore: true,
              onSelect: () => wm.front && closeWindow(wm.front),
            },
            ...(site.resumePdf
              ? [{ label: 'Get Résumé PDF', onSelect: () => window.location.assign(site.resumePdf!) }]
              : []),
          ],
        },
        {
          id: 'edit',
          label: 'Edit',
          items: [
            { label: 'Undo', disabled: true },
            { label: 'Cut', disabled: true, separatorBefore: true },
            { label: 'Copy Email Address', onSelect: copyEmail },
            { label: 'Paste', disabled: true },
          ],
        },
        {
          id: 'view',
          label: 'View',
          items: [
            {
              label: 'Projects as List',
              checked: wm.projectsView === 'list',
              onSelect: () => {
                dispatch({ type: 'projectsView', view: 'list' })
                openWindow('projects')
              },
            },
            {
              label: 'Projects as Icons',
              checked: wm.projectsView === 'icons',
              onSelect: () => {
                dispatch({ type: 'projectsView', view: 'icons' })
                openWindow('projects')
              },
            },
            { label: 'Clean Up', separatorBefore: true, disabled: !anyOpen, onSelect: () => dispatch({ type: 'cleanUp' }) },
          ],
        },
        {
          id: 'special',
          label: 'Special',
          items: [
            { label: 'Empty Trash…', onSelect: () => setTrashOpen(true) },
            { label: 'Restart', onSelect: restart, separatorBefore: true },
          ],
        },
      ]

  const api: DesktopApi = useMemo(
    () => ({ openWindow, closeWindow, projectsView: wm.projectsView, isTouch }),
    [openWindow, closeWindow, wm.projectsView, isTouch],
  )

  const openWins = Object.values(wm.wins).filter((w): w is Win => !!w?.open)

  return (
    <DesktopContext.Provider value={api}>
      <div className="mac-root">
        <header className="mac-menubar" inert={trashOpen}>
          <MenuBar menus={menus} label="Menu bar" />
          <span className="mac-menubar-right">
            {flash && (
              <span className="mac-flash" aria-hidden="true">
                {flash}
              </span>
            )}
            <Clock />
            <ThemeSwitcher className="mac-switcher" />
          </span>
        </header>

        <main
          id="main"
          ref={desktopRef}
          className={`mac-desktop${anyOpen ? ' has-front' : ''}`}
          inert={trashOpen}
          tabIndex={-1}
        >
          <h1 className="sr-only">{site.name}&apos;s desktop</h1>

          <div inert={isNarrow && anyOpen}>
            <DesktopIcons onOpen={openWindow} onTrash={() => setTrashOpen(true)} />
          </div>

          <div className="mac-sticky" inert={isNarrow && anyOpen}>
            <p>
              <b>Hi!</b> {isTouch ? 'Tap' : 'Double-click'} an icon to open it, or use the menus. Prefer a different
              decade?
            </p>
            <button type="button" className="mac-sticky-button" onClick={focusSwitcher}>
              Best viewed in…
            </button>
          </div>

          {openWins.map((win) => (
            <Window
              key={win.id}
              win={win}
              title={winMeta[win.id].title}
              width={winMeta[win.id].width}
              isFront={wm.front === win.id}
              isPageTitle={wm.front === win.id}
              canDrag={canDrag}
              info={info[win.id]}
              onFocus={focusWindow}
              onClose={closeWindow}
              onShade={(id) => dispatch({ type: 'shade', id })}
              onZoom={(id) => dispatch({ type: 'zoom', id })}
              onMove={(id, x, y) => dispatch({ type: 'move', id, x, y })}
            >
              {contents[win.id]}
            </Window>
          ))}
        </main>

        {trashOpen && <TrashAlert onClose={() => setTrashOpen(false)} />}
        {booting && <StartupScreen onDone={finishStartup} />}
      </div>
    </DesktopContext.Provider>
  )
}
