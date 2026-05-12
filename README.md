# CastleCrusher

Prosty starter aplikacji **Mapa Zamków** (React + TypeScript + Vite) przygotowany pod dalszy rozwój mapy zamków w Europie.

## Struktura katalogów

```text
src/
  app/
  map/
    components/
    model/
  castles/
    api/
    components/
    model/
    utils/
  routes/
    components/
    model/
    utils/
  overlays/
    components/
  cards/
    components/
  data/
  shared/
    test/
    types/
  styles/
```

## Szybki start

```bash
pnpm install
pnpm dev
```

## Skrypty

- `pnpm dev`
- `pnpm build`
- `pnpm preview`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm format`

## Uwagi architektoniczne

- Warstwa danych jest odseparowana (`src/data`, `src/castles/api`) i gotowa do podmiany Overpass API na backend.
- Pobieranie zamków działa dla aktualnego widoku mapy (bez ładowania całej Europy przy starcie).
- Normalizacja danych OSM do modelu domenowego jest w czystych funkcjach (`src/castles/utils`).
- Logika trasy i eksportu Google Maps jest testowalna poza Reactem.
