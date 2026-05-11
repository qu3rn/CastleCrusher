import type { Coordinates } from '../../shared/types/location'

export type CastleSource = 'osm-overpass'

export type CastleDetails = {
  shortDescription: string
  wikipedia?: string
  wikidata?: string
}

export type Castle = {
  id: string
  name: string
  country: string
  type: string
  isRuins: boolean
  location: Coordinates
  details: CastleDetails
  source: CastleSource
}
