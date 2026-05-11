import type { Castle } from '../../castles/model/castle'

export type RouteExport = {
  url: string
}

const GOOGLE_MAPS_DIRECTIONS_BASE_URL = 'https://www.google.com/maps/dir/'

export const buildGoogleMapsRouteUrl = (castles: Castle[]): RouteExport => {
  if (castles.length === 0) {
    return { url: GOOGLE_MAPS_DIRECTIONS_BASE_URL }
  }

  const points = castles
    .map((castle) => `${castle.location.lat},${castle.location.lon}`)
    .join('/')

  return {
    url: `${GOOGLE_MAPS_DIRECTIONS_BASE_URL}${points}`,
  }
}
