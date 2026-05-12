import { describe, expect, it } from 'vitest'

import { buildGoogleMapsRouteUrl } from './googleMapsExport'

const castles = [
  {
    id: 'osm-1',
    name: 'A',
    country: 'PL',
    type: 'Zamek',
    isRuins: false,
    location: { lat: 50.1, lon: 19.9 },
    details: { shortDescription: 'Opis' },
    source: 'osm-overpass' as const,
  },
  {
    id: 'osm-2',
    name: 'B',
    country: 'CZ',
    type: 'Twierdza',
    isRuins: false,
    location: { lat: 49.2, lon: 16.6 },
    details: { shortDescription: 'Opis' },
    source: 'osm-overpass' as const,
  },
]

describe('buildGoogleMapsRouteUrl', () => {
  it('returns directions url with castle coordinates', () => {
    const result = buildGoogleMapsRouteUrl(castles)

    expect(result.url).toBe('https://www.google.com/maps/dir/50.1,19.9/49.2,16.6')
  })
})
