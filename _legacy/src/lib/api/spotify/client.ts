import { SpotifyApi } from '@spotify/web-api-ts-sdk'
import { envVariables } from '../../env-variables'

export const spotifyApiClient = SpotifyApi.withClientCredentials(
  envVariables.SPOTIFY_CLIENT_ID,
  envVariables.SPOTIFY_CLIENT_SECRET,
)
