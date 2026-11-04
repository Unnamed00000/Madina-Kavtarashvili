# MK Gebäudereinigung

Statische, responsive Vorschaltseite für MK Gebäudereinigung in Leipzig. HTML5, CSS3 und Vite; kein clientseitiges JavaScript, keine externen Schriften, kein Tracking.

## Lokal starten

Node.js 22.12 oder neuer verwenden.

```sh
npm ci
npm run dev
```

## Produktionsbuild

```sh
npm run build
npm run preview
```

Die fertigen Dateien liegen in `dist/`.

## Cloudflare Pages mit GitHub

- Repository: `Unnamed00000/Madina-Kavtarashvili`
- Produktionsbranch: `main`
- Framework: Vite (alternativ: None)
- Build-Befehl: `npm run build`
- Build-Ausgabeverzeichnis: `dist`
- Stammverzeichnis: leer lassen (Repository-Wurzel)
- Node.js: 22, über `.nvmrc` festgelegt

Git-Integration verwenden, damit neue Commits in `main` automatisch veröffentlicht werden. Keine API-Schlüssel für den Build erforderlich.

## Hauptdomain und Freigabe

Die Hauptadresse ist [mk-reinigungsteam.de](https://mk-reinigungsteam.de/). Die [Checkliste für den öffentlichen Start](docs/freigabe.md) beschreibt die Weiterleitung von `www`, die Freigabe der Rechtstexte und die Prüfung der Indexierung. Die [Anleitung für Suchmaschinen und Unternehmensprofile](docs/lokale-profile.md) ist für die Inhaberin bestimmt.

## Inhalt und nächste Schritte

- Telefonnummer: `+49 176 84983536`, Link: `tel:+4917684983536`
- E-Mail: `madina@mk-reinigungsteam.de`, Link: `mailto:madina@mk-reinigungsteam.de`
- Firmenlogo aus der bereitgestellten Vorlage, als transparentes WebP in `public/mk-logo.webp`
- KI-generiertes Symbolbild für die Reinigung in `public/reinigung.webp`
- Start- und Leistungsseite behalten `noindex, nofollow` bis zur Freigabe. `robots.txt` lässt den Abruf zu, damit Suchmaschinen die Anweisung lesen können.
- Vite baut die Startseite, `/gebaeudereinigung/` und die Fehlerseite. Die Rechtstexte und der Sitemap-Entwurf in `drafts/` bleiben außerhalb des Builds.
- Die Leistungsseite beschreibt die bestätigte allgemeine Gebäudereinigung für private und gewerbliche Kunden in Leipzig und Umgebung. Einzelleistungen werden erst nach Bestätigung ergänzt.

`public/_headers` enthält die HTTP-Sicherheitsheader für Cloudflare Pages.
