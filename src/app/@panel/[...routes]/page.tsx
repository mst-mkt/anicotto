import { Suspense } from 'react'
import { SidePanelContainer } from './_components/conteiner'
import { WatchingPanel, WatchingPanelSkeleton } from './_components/watching-panel'

const SidePanel = () => (
  <SidePanelContainer title="視聴中の作品">
    <Suspense fallback={<WatchingPanelSkeleton />}>
      <WatchingPanel />
    </Suspense>
  </SidePanelContainer>
)

export default SidePanel
