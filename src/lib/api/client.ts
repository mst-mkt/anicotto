import { AnnictClient } from '.'
import { ANNICT_API_BASEURL } from '../../constants/annict'

export const annictApiClient = new AnnictClient(`${ANNICT_API_BASEURL}/v1`)
