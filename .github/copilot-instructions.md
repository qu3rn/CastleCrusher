# Mapa Zamków – Copilot Instructions

## Nazwa projektu
Mapa Zamków

## Cel
Prosta webowa aplikacja React pokazująca zamki w Europie na interaktywnej mapie. Aplikacja ma pomagać użytkownikowi odkrywać zamki, planować trasę po zamkach i eksportować trasę do Google Maps.

## Charakter aplikacji
- Mapa jako główny ekran
- Własne UI nakładane na mapę
- Klimat eksploracji / fantasy / Heroes-like
- Aplikacja ma być prosta, szybka i możliwa do przeniesienia później do Electron/Tauri

## Stack
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

## Źródła danych
- Początkowo OpenStreetMap przez Overpass API
- Główne tagi:
  - `historic=castle`
  - `castle_type=*`
  - `ruins=*`
  - `wikidata`
  - `wikipedia`
  - `name`
  - `tourism=attraction`
- Dane z OSM są niedoskonałe, więc projekt powinien mieć własną warstwę normalizacji i filtrowania.
- Nie zakładaj, że każdy obiekt `historic=castle` jest klasycznym zamkiem.

## Główne modele domenowe
- `Castle`
- `CastleRoute`
- `MapBounds`
- `CastleDetails`
- `CastleSource`
- `RouteExport`

## Zasady architektury
- Utrzymuj prostą strukturę katalogów.
- Oddziel mapę, dane, UI, routing trasy i logikę eksportu.
- Nie mieszaj logiki Overpass API bezpośrednio z komponentami UI.
- Komponenty powinny być małe i czytelne.
- Logika domenowa powinna być testowalna poza Reactem.
- Preferuj funkcje czyste dla normalizacji, filtrowania i eksportu URL.
- Nie dodawaj backendu, dopóki nie jest potrzebny.
- Przygotuj kod tak, żeby później dało się podmienić Overpass API na własne API.

## Proponowana struktura
```
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
```

## UI
- Marker zamku powinien być wyraźny i odróżniać się od zwykłych punktów mapy.
- Karta zamku ma mieć lekki klimat gry fantasy, ale bez przesady.
- UI musi być użyteczne na desktopie.
- Mobile może być przygotowany później, ale nie psuj responsywności.

## Funkcje MVP
- Mapa Europy
- Pobieranie zamków dla aktualnego obszaru
- Pokazanie markerów zamków
- Karta zamku po kliknięciu
- Dodanie zamku do trasy
- Panel trasy
- Eksport trasy do Google Maps
- Podstawowe testy

## Czego unikać
- Nadmiernej architektury
- Zbyt wielu bibliotek UI
- Logiki biznesowej w komponentach mapy
- Bezpośredniego ładowania całej Europy z Overpass przy każdym starcie
- Zakładania, że dane OSM są idealne
- Uzależnienia projektu od Google Maps jako głównego renderera

## Styl kodu
- TypeScript strict
- Czytelne nazwy
- Małe pliki
- Jawne typy dla modeli domenowych
- Testy dla funkcji normalizujących, store trasy i eksportu Google Maps URL
