import { Suspense } from 'react'
import { SidePanelContainer } from './[...routes]/_components/conteiner'
import { WatchingPanel, WatchingPanelSkeleton } from './[...routes]/_components/watching-panel'

const SidePanel = () => (
  <SidePanelContainer title="視聴中の作品">
    <Suspense fallback={<WatchingPanelSkeleton />}>
      <WatchingPanel />
    </Suspense>
  </SidePanelContainer>
)

export default SidePanel
