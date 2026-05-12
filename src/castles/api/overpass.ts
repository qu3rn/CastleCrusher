import type { MapBounds } from '../../map/model/mapBounds'
import type { Castle } from '../model/castle'
import { normalizeOverpassCastle, overpassResponseSchema } from '../utils/normalizeCastle'

const OVERPASS_URL = 'https://overpass-api.de/api/interpreter'

export const buildOverpassQuery = (bounds: MapBounds): string => `
[out:json][timeout:25];
(
  node["historic"="castle"](${bounds.south},${bounds.west},${bounds.north},${bounds.east});
);
out body;
`

export const fetchCastlesForBounds = async (bounds: MapBounds): Promise<Castle[]> => {
  const query = buildOverpassQuery(bounds)

  const response = await fetch(OVERPASS_URL, {
    method: 'POST',
    body: query,
  })

  if (!response.ok) {
    throw new Error('Nie udało się pobrać zamków z Overpass API.')
  }

  const parsed = overpassResponseSchema.parse(await response.json())

  return parsed.elements
    .filter((element) => element.tags.historic === 'castle' || element.tags.castle_type)
    .map(normalizeOverpassCastle)
}
