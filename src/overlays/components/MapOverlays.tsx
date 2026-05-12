import type { Castle } from '../../castles/model/castle'
import { CastleCard } from '../../cards/components/CastleCard'

type MapOverlaysProps = {
  selectedCastle: Castle | null
  onAddToRoute: (castle: Castle) => void
}

export const MapOverlays = ({ selectedCastle, onAddToRoute }: MapOverlaysProps) => {
  if (!selectedCastle) {
    return null
  }

  return (
    <div className="pointer-events-auto absolute left-4 top-4 z-10 w-full max-w-md">
      <CastleCard castle={selectedCastle} onAddToRoute={onAddToRoute} />
    </div>
  )
}
