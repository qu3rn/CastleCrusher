import { z } from 'zod'

import type { Castle } from '../model/castle'

const overpassElementSchema = z.object({
  id: z.number(),
  lat: z.number(),
  lon: z.number(),
  tags: z.record(z.string(), z.string()).default({}),
})

export const overpassResponseSchema = z.object({
  elements: z.array(overpassElementSchema),
})

export type OverpassElement = z.infer<typeof overpassElementSchema>

const castleTypeMap: Record<string, string> = {
  defensive: 'Obronny',
  fortress: 'Twierdza',
  palace: 'Pałac zamkowy',
  manor: 'Dwór obronny',
}

export const normalizeOverpassCastle = (element: OverpassElement): Castle => {
  const tags = element.tags
  const castleType = tags.castle_type ?? 'unknown'
  const resolvedType = castleTypeMap[castleType] ?? 'Zamek'

  return {
    id: `osm-${element.id}`,
    name: tags.name ?? 'Nieznany zamek',
    country: tags['addr:country'] ?? 'Nieznany kraj',
    type: resolvedType,
    isRuins: tags.ruins === 'yes',
    location: {
      lat: element.lat,
      lon: element.lon,
    },
    details: {
      shortDescription:
        tags.description ??
        (tags.ruins === 'yes'
          ? 'Ruiny zamku oznaczone w OpenStreetMap.'
          : 'Zamek oznaczony w OpenStreetMap.'),
      wikipedia: tags.wikipedia,
      wikidata: tags.wikidata,
    },
    source: 'osm-overpass',
  }
}
