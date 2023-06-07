# Hallo React

## Links
- Offizielle Webseite: https://react.dev/
- Next (React client- und serverseitig): https://nextjs.org/
- https://remix.run/
- https://www.gatsbyjs.com/
- Statistiken über NPM Pakete: https://npmtrends.com/
- React Changelog: https://github.com/facebook/react/blob/main/CHANGELOG.md
- https://github.com/facebookarchive/codemod
- React Erweiterungen: https://github.com/brillout/awesome-react-components
- Initialisierung
  - https://create-react-app.dev/
  - https://vitejs.dev/
- Cartoon intro to react fiber: https://www.youtube.com/watch?v=ZCuYPiUIONs
- Renderer
  - React-DOM: https://www.npmjs.com/package/react-dom
  - https://reactnative.dev/
  - https://github.com/vadimdemedes/ink
  - https://docs.pmnd.rs/react-three-fiber/getting-started/introduction
- Klassenkomponenten (NICHT VERWENDEN!): https://react.dev/reference/react/Component
- Thinking in React: https://react.dev/learn/thinking-in-react

## Setup
1. `npm create vite@latest 01-basics -- --template react-ts` => Scafffolding - erzeugen der Projektstruktur
2. `cd 01-basics` - ins Projektverzeichnis wechseln
3. `npm install` - Abhängigkeiten installieren
4. `npm run dev` - Startet die Applikation im Development Modus

## Components vs Elements
- Komponenten sind Funktionen in React die eine JSX-Struktur zurückgeben
- Komponenten beginnen mit einem Großbuchstaben
- Elemente sind Bausteine die auf native UI-Elemente referenzieren z.B. div im Browser

## JSX
- statt `class` `className` Attribut
- statt `for` `hmtlFor` Attribut nutzen