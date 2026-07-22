import type { Character } from '../schemas/annict/characters'
import type { Status } from '../schemas/annict/common'
import type { Episode } from '../schemas/annict/episodes'
import type { Organization } from '../schemas/annict/organizations'
import type { Person } from '../schemas/annict/people'
import type { User } from '../schemas/annict/users'
import type { Work } from '../schemas/annict/works'

export const CACHE_TAGS = {
  //works
  WORKS: 'works',
  WORKS_SEASON: (season: string) => `works:${season}`,
  WORKS_CURRENT_SEASON: 'works:current-season',
  WORK: (id: Work['id']) => `work:${id}`,
  WORK_EPISODES: (id: Work['id']) => `work:${id}:episodes`,
  WORK_REVIEWS: (id: Work['id']) => `work:${id}:reviews`,
  WORK_STATUS: (id: Work['id']) => `work:${id}:status`,
  WORK_CASTS: (id: Work['id']) => `work:${id}:casts`,
  WORK_STAFFS: (id: Work['id']) => `work:${id}:staffs`,
  WORK_SERIES: (id: Work['id']) => `work:${id}:series`,

  // episodes
  EPISODE: (id: Episode['id']) => `episode:${id}`,
  EPISODE_RECORDS: (id: Episode['id']) => `episode:${id}:records`,

  // characters
  CHARACTERS: 'characters',
  CHARACTER: (id: Character['id']) => `character:${id}`,

  // people
  PEOPLE: 'people',
  PERSON: (id: Person['id']) => `person:${id}`,

  // organizations
  ORGANIZATIONS: 'organizations',
  ORGANIZATION: (id: Organization['id']) => `organization:${id}`,

  // users
  USER: (username: User['username']) => `user:${username}`,
  USER_RECORDS: (username: User['username']) => `user:${username}:records`,
  USER_ACTIVITY: (username: User['username']) => `user:${username}:activity`,
  USER_LIBRARIES: (username: User['username']) => `user:${username}:libraries`,
  ME: 'me',
  MY_RECORDS: 'me:records',
  MY_ACTIVITY: 'me:activity',
  MY_LIBRARIES: 'me:libraries',
  MY_LIBRARIES_STATUS: (status: Status) => `me:libraries:${status}`,

  // follow
  FOLLOWING: (username: User['username']) => `following:${username}`,
  FOLLOWERS: (username: User['username']) => `followers:${username}`,
  IS_FOLLOWING: (from: User['username'], to: User['username']) => `is-following:${from}:${to}`,
  IS_FOLLOWER: (from: User['username'], to: User['username']) => `is-follower:${from}:${to}`,
}
