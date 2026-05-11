import type { Castle } from '../../castles/model/castle'

type CastleCardProps = {
  castle: Castle
  onAddToRoute: (castle: Castle) => void
}

export const CastleCard = ({ castle, onAddToRoute }: CastleCardProps) => {
  const wikipediaUrl = castle.details.wikipedia
    ? `https://pl.wikipedia.org/wiki/${castle.details.wikipedia.split(':').at(-1)}`
    : undefined

  return (
    <article className="rounded-xl border border-amber-500/40 bg-zinc-900/85 p-4 text-left text-amber-100 shadow-xl backdrop-blur-sm">
      <p className="text-xs uppercase tracking-[0.2em] text-amber-400">Karta zamku</p>
      <h2 className="mt-1 text-xl font-semibold">{castle.name}</h2>
      <p className="text-sm text-amber-200/90">{castle.country}</p>
      <p className="mt-2 text-sm">Typ: {castle.type}</p>
      <p className="mt-1 text-sm">{castle.details.shortDescription}</p>

      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <button type="button" className="rounded border border-amber-600 px-3 py-2 hover:bg-amber-500/20">
          Historia
        </button>
        <a
          className="rounded border border-amber-600 px-3 py-2 text-center hover:bg-amber-500/20"
          href={wikipediaUrl ?? '#'}
          target="_blank"
          rel="noreferrer"
        >
          Więcej informacji
        </a>
        <button
          type="button"
          className="rounded border border-amber-600 px-3 py-2 hover:bg-amber-500/20"
          onClick={() => onAddToRoute(castle)}
        >
          Dodaj do trasy
        </button>
        <a
          className="rounded border border-amber-600 px-3 py-2 text-center hover:bg-amber-500/20"
          href={`https://www.google.com/maps/search/?api=1&query=${castle.location.lat},${castle.location.lon}`}
          target="_blank"
          rel="noreferrer"
        >
          Otwórz w Google Maps
        </a>
      </div>
    </article>
  )
}
