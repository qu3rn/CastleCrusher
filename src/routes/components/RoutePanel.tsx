import type { Castle } from '../../castles/model/castle'
import { buildGoogleMapsRouteUrl } from '../utils/googleMapsExport'

type RoutePanelProps = {
  castles: Castle[]
  onRemoveCastle: (castleId: string) => void
  onClearRoute: () => void
}

export const RoutePanel = ({ castles, onRemoveCastle, onClearRoute }: RoutePanelProps) => {
  const routeExport = buildGoogleMapsRouteUrl(castles)

  return (
    <aside className="rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-zinc-100">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Trasa zamków</h2>
        <button
          type="button"
          className="rounded border border-zinc-600 px-2 py-1 text-sm hover:bg-zinc-800"
          onClick={onClearRoute}
        >
          Wyczyść
        </button>
      </div>

      <ul className="mt-3 space-y-2 text-sm">
        {castles.map((castle, index) => (
          <li key={castle.id} className="flex items-center justify-between rounded bg-zinc-800/70 px-3 py-2">
            <span>
              {index + 1}. {castle.name}
            </span>
            <button
              type="button"
              className="text-xs text-red-300 hover:text-red-200"
              onClick={() => onRemoveCastle(castle.id)}
            >
              Usuń
            </button>
          </li>
        ))}
      </ul>

      <a
        className="mt-4 block rounded bg-emerald-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-emerald-500"
        href={routeExport.url}
        target="_blank"
        rel="noreferrer"
      >
        Eksportuj trasę do Google Maps
      </a>
    </aside>
  )
}
