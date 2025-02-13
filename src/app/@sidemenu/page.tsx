import { Suspense } from 'react'
import { SidemenuLinks } from './_components/links/links'
import { SideProfile, SideProfileSkeleton } from './_components/profile/profile'

const SideMenu = () => (
  <>
    <SidemenuLinks />
    <Suspense fallback={<SideProfileSkeleton />}>
      <SideProfile />
    </Suspense>
  </>
)

export default SideMenu
