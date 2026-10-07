import type { LayoutProps } from '../../shared/themeRegistry'
import NetscapeLayout from '../netscape/Layout'

// Placeholder until this theme is built; renders the Netscape layout.
export default function Layout(props: LayoutProps) {
  return <NetscapeLayout {...props} />
}
