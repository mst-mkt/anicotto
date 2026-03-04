import { type arm as armData } from '@kawaiioverflow/arm'
import { arm } from '@kawaiioverflow/arm'

type ArmEntry = (typeof armData)[number]
type ArmKey = keyof ArmEntry

type Service = 'myAnimeList' | 'anilist' | 'annict' | 'syoboiCalendar'

const keyMap = {
  myAnimeList: 'mal_id',
  anilist: 'anilist_id',
  annict: 'annict_id',
  syoboiCalendar: 'syobocal_tid',
} satisfies Record<Service, ArmKey>

const indexBy = (service: Service) => new Map(arm.map((e) => [e[keyMap[service]], e]))

const indexes = {
  myAnimeList: indexBy('myAnimeList'),
  anilist: indexBy('anilist'),
  annict: indexBy('annict'),
  syoboiCalendar: indexBy('syoboiCalendar'),
} satisfies Record<Service, Map<number | undefined, ArmEntry>>

const createConverter = (from: Service) => {
  return (to: Service, id: number): number | undefined => indexes[from].get(id)?.[keyMap[to]]
}

export const convertFromMyAnimeList = createConverter('myAnimeList')
export const convertFromAnnict = createConverter('annict')
export const convertFromAnilist = createConverter('anilist')
export const convertFromSyoboiCalendar = createConverter('syoboiCalendar')
