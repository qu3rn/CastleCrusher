import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

import { CastlesToolbar } from '../castles/components/CastlesToolbar'
import type { Castle } from '../castles/model/castle'
import { loadCastles } from '../data/castlesDataSource'
import { CastleMap } from '../map/components/CastleMap'
import { EUROPE_BOUNDS, type MapBounds } from '../map/model/mapBounds'
import { MapOverlays } from '../overlays/components/MapOverlays'
import { RoutePanel } from '../routes/components/RoutePanel'
import { useRouteStore } from '../routes/model/routeStore'

const DEFAULT_BOUNDS = EUROPE_BOUNDS

const App = () => {
  const [bounds, setBounds] = useState<MapBounds>(DEFAULT_BOUNDS)
  const [selectedCastle, setSelectedCastle] = useState<Castle | null>(null)
  const [requestVersion, setRequestVersion] = useState(0)

  const routeCastles = useRouteStore((state) => state.castles)
  const addCastle = useRouteStore((state) => state.addCastle)
  const removeCastle = useRouteStore((state) => state.removeCastle)
  const clearRoute = useRouteStore((state) => state.clearRoute)

  const queryKey = useMemo(() => ['castles', bounds, requestVersion] as const, [bounds, requestVersion])

  const castlesQuery = useQuery({
    queryKey,
    queryFn: () => loadCastles(bounds),
    enabled: requestVersion > 0,
  })

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-6 text-zinc-100">
      <div className="mx-auto w-full max-w-7xl space-y-4">
        <header className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">
          <h1 className="text-2xl font-bold text-amber-300">Mapa Zamków Europy</h1>
          <p className="mt-1 text-sm text-zinc-300">
            Prosty MVP: mapa, karta zamku, trasa i eksport do Google Maps.
          </p>
        </header>

        <CastlesToolbar
          isLoading={castlesQuery.isFetching}
          onLoadCastles={() => setRequestVersion((version) => version + 1)}
        />

        {castlesQuery.isError ? (
          <p className="rounded border border-red-500/40 bg-red-950/40 p-3 text-sm text-red-200">
            Nie udało się pobrać zamków dla aktualnego widoku.
          </p>
        ) : null}

        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <section className="relative">
            <CastleMap
              castles={castlesQuery.data ?? []}
              onSelectCastle={setSelectedCastle}
              onBoundsChange={setBounds}
            />
            <MapOverlays selectedCastle={selectedCastle} onAddToRoute={addCastle} />
          </section>

          <RoutePanel castles={routeCastles} onRemoveCastle={removeCastle} onClearRoute={clearRoute} />
        </div>
      </div>
    </main>
  )
}

export default App
