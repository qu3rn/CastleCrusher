type CastlesToolbarProps = {
  isLoading: boolean
  onLoadCastles: () => void
}

export const CastlesToolbar = ({ isLoading, onLoadCastles }: CastlesToolbarProps) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-700 bg-zinc-900 p-3 text-zinc-100">
      <p className="text-sm text-zinc-300">Pobierz zamki tylko dla aktualnego widoku mapy.</p>
      <button
        type="button"
        className="rounded bg-amber-500 px-3 py-2 text-sm font-medium text-zinc-950 hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
        onClick={onLoadCastles}
        disabled={isLoading}
      >
        {isLoading ? 'Ładowanie...' : 'Pobierz zamki'}
      </button>
    </div>
  )
}
