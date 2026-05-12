import { beforeEach, describe, expect, it } from 'vitest'

import { useRouteStore } from './routeStore'

const sampleCastle = {
  id: 'osm-1',
  name: 'Zamek Przykładowy',
  country: 'PL',
  type: 'Twierdza',
  isRuins: false,
  location: { lat: 50.1, lon: 19.9 },
  details: { shortDescription: 'Opis', wikipedia: undefined, wikidata: undefined },
  source: 'osm-overpass' as const,
}

describe('routeStore', () => {
  beforeEach(() => {
    useRouteStore.setState({ castles: [] })
  })

  it('adds unique castles to route', () => {
    useRouteStore.getState().addCastle(sampleCastle)
    useRouteStore.getState().addCastle(sampleCastle)

    expect(useRouteStore.getState().castles).toHaveLength(1)
  })

  it('removes castle from route', () => {
    useRouteStore.getState().addCastle(sampleCastle)
    useRouteStore.getState().removeCastle(sampleCastle.id)

    expect(useRouteStore.getState().castles).toHaveLength(0)
  })
})
