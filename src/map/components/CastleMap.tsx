import { useEffect, useRef } from 'react'
import maplibregl, { type Map } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

import type { Castle } from '../../castles/model/castle'
import type { MapBounds } from '../model/mapBounds'

type CastleMapProps = {
  castles: Castle[]
  onSelectCastle: (castle: Castle) => void
  onBoundsChange: (bounds: MapBounds) => void
}

const toMapBounds = (map: Map): MapBounds => {
  const bounds = map.getBounds()

  return {
    south: bounds.getSouth(),
    west: bounds.getWest(),
    north: bounds.getNorth(),
    east: bounds.getEast(),
  }
}

export const CastleMap = ({ castles, onSelectCastle, onBoundsChange }: CastleMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<Map | null>(null)
  const markersRef = useRef<maplibregl.Marker[]>([])

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) {
      return
    }

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [12, 51],
      zoom: 4,
    })

    map.addControl(new maplibregl.NavigationControl(), 'top-right')

    const reportBounds = () => onBoundsChange(toMapBounds(map))
    map.on('load', reportBounds)
    map.on('moveend', reportBounds)

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [onBoundsChange])

  useEffect(() => {
    const map = mapRef.current
    if (!map) {
      return
    }

    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current = castles.map((castle) => {
      const markerEl = document.createElement('button')
      markerEl.type = 'button'
      markerEl.className = 'h-3.5 w-3.5 rounded-full border border-amber-200 bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.7)]'
      markerEl.title = castle.name
      markerEl.addEventListener('click', () => onSelectCastle(castle))

      return new maplibregl.Marker({ element: markerEl })
        .setLngLat([castle.location.lon, castle.location.lat])
        .addTo(map)
    })
  }, [castles, onSelectCastle])

  return <div ref={mapContainerRef} className="h-[70vh] w-full rounded-xl border border-zinc-700" />
}
