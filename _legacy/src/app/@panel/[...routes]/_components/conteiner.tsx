import type { FC, ReactNode } from 'react'
import { cn } from '../../../../utils/classnames'
import styles from '../../../layout.module.css'

type SidePanelContainerProps = {
  title: ReactNode
  children: ReactNode
}

export const SidePanelContainer: FC<SidePanelContainerProps> = ({ title, children }) => (
  <aside
    className={cn('sticky top-16 hidden h-fit flex-col gap-y-4 pr-[4svmin] lg:flex', styles.panel)}
  >
    <h3 className="font-bold">{title}</h3>
    <div>{children}</div>
  </aside>
)
