import { ANNICT_API_BASEURL } from '../../../constants/annict'
import { AnnictClient } from '.'

export const annictApiClient = new AnnictClient(`${ANNICT_API_BASEURL}/v1`)
