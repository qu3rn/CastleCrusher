# Project name

Castle Map

# Goal

A simple React web application that shows castles in Europe on an interactive map. The app should help users discover castles, plan a route between castles, and export that route to Google Maps.

# Application character

- The map is the main screen.
- Custom UI is overlaid on top of the map.
- The visual direction is exploration / fantasy / Heroes-like.
- The app should remain simple, fast, and possible to move later to Electron or Tauri.

# Stack

- React
- TypeScript
- Vite
- MapLibre GL JS / @vis.gl/react-maplibre
- Zustand
- TanStack Query
- Zod
- Tailwind CSS
- Vitest
- pnpm
- GitHub Actions

# Data sources

- Initially OpenStreetMap through the Overpass API.
- Main tags:
  - `historic=castle`
  - `castle_type=*`
  - `ruins=*`
  - `wikidata`
  - `wikipedia`
  - `name`
  - `tourism=attraction`
- OSM data is imperfect, so the project should have its own normalization and filtering layer.
- Do not assume that every `historic=castle` object is a classic medieval castle.

# Main domain models

- `Castle`
- `CastleRoute`
- `MapBounds`
- `CastleDetails`
- `CastleSource`
- `RouteExport`

# Architecture rules

- Keep the folder structure simple.
- Separate map, data, UI, route planning, and export logic.
- Do not mix Overpass API logic directly into UI components.
- Components should be small and readable.
- Domain logic should be testable outside React.
- Prefer pure functions for normalization, filtering, and URL export.
- Do not add a backend until it is needed.
- Prepare the code so that Overpass API can later be replaced by our own API.

# Suggested structure

src/
  app/
  map/
  castles/
    api/
    components/
    model/
    utils/
  routes/
    components/
    model/
    utils/
  shared/
    components/
    lib/
    types/
  styles/

# UI

- The castle marker should be clearly visible and distinct from normal map points.
- The castle card should have a light fantasy game-like feeling, but not be overdesigned.
- The UI must be usable on desktop.
- Mobile can be improved later, but do not break responsiveness.

# MVP features

- Europe map
- Fetch castles for the current map area
- Show castle markers
- Open castle card on marker click
- Add castle to route
- Route panel
- Export route to Google Maps
- Basic tests

# Things to avoid

- Over-engineering
- Too many UI libraries
- Business logic inside map components
- Loading all of Europe directly from Overpass on every startup
- Assuming OSM data is perfect
- Depending on Google Maps as the main map renderer

# Code style

- TypeScript strict mode
- Clear names
- Small files
- Explicit types for domain models
- Tests for normalization functions, route store, and Google Maps URL export
