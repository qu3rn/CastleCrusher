import { create } from 'zustand'

import type { Castle } from '../../castles/model/castle'

export type CastleRoute = {
  castles: Castle[]
  addCastle: (castle: Castle) => void
  removeCastle: (castleId: string) => void
  clearRoute: () => void
}

export const useRouteStore = create<CastleRoute>((set) => ({
  castles: [],
  addCastle: (castle) =>
    set((state) => {
      if (state.castles.some((saved) => saved.id === castle.id)) {
        return state
      }

      return { castles: [...state.castles, castle] }
    }),
  removeCastle: (castleId) =>
    set((state) => ({
      castles: state.castles.filter((castle) => castle.id !== castleId),
    })),
  clearRoute: () => set({ castles: [] }),
}))
