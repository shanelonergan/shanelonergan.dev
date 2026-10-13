import { Link } from 'react-router'
import { PAGE_TITLE_ID } from '../../../shared/hooks'
import { useSceneChange } from '../stage'

export function NotFound() {
  const scene = useSceneChange()
  return (
    <>
      <h1 id={PAGE_TITLE_ID} tabIndex={-1} className="st-title">
        Page not found
      </h1>
      <p className="st-lede">There&apos;s nothing at this address. The link may be old, or it has a typo.</p>
      <p>
        <Link className="st-button" to="/" onClick={scene('/')}>
          Go to the home page
        </Link>
      </p>
    </>
  )
}
