import type { MapBounds } from '../map/model/mapBounds'
import type { Castle } from '../castles/model/castle'
import { fetchCastlesForBounds } from '../castles/api/overpass'

export const loadCastles = async (bounds: MapBounds): Promise<Castle[]> => {
  return fetchCastlesForBounds(bounds)
}
