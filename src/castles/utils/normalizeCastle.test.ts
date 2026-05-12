import { describe, expect, it } from 'vitest'

import { normalizeOverpassCastle } from './normalizeCastle'

describe('normalizeOverpassCastle', () => {
  it('maps Overpass element to Castle model', () => {
    const castle = normalizeOverpassCastle({
      id: 10,
      lat: 48.85,
      lon: 2.35,
      tags: {
        name: 'Château Test',
        castle_type: 'fortress',
        ruins: 'yes',
        wikipedia: 'fr:Château',
      },
    })

    expect(castle).toMatchObject({
      id: 'osm-10',
      name: 'Château Test',
      type: 'Twierdza',
      isRuins: true,
      details: {
        wikipedia: 'fr:Château',
      },
    })
  })
})
