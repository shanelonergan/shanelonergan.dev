import { projects } from '../../../content/projects'
import { PAGE_TITLE_ID } from '../../../shared/hooks'
import { ProjectList } from './ProjectList'

export function Projects() {
  return (
    <>
      <h1 id={PAGE_TITLE_ID} tabIndex={-1}>
        Projects
      </h1>
      <p>Things I&apos;ve built, newest first. Most are React on the front and Rails on the back.</p>
      <ProjectList items={projects} />
    </>
  )
}
