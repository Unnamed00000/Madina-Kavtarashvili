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

## Domain später verbinden

Nach erfolgreicher Veröffentlichung unter der zugewiesenen `pages.dev`-Adresse kann `mk-reinigungsteam.de` in Cloudflare Pages unter „Custom domains“ hinzugefügt werden. Die dort angezeigten DNS-Schritte befolgen. Vor einem Nameserver-Wechsel bestehende DNS-Einträge einschließlich MX, SPF, DKIM und DMARC erhalten, damit E-Mail weiter funktioniert. Die Erstveröffentlichung verändert die Domain nicht.

## Inhalt und nächste Schritte

- Telefonnummer: `+49 176 84983536`, Link: `tel:+4917684983536`
- E-Mail: `madina@mk-reinigungsteam.de`, Link: `mailto:madina@mk-reinigungsteam.de`
- Firmenlogo aus der bereitgestellten Vorlage, als transparentes WebP in `public/mk-logo.webp`
- KI-generiertes Symbolbild für die Reinigung in `public/reinigung.webp`
- Die Testversion ist mit `noindex, nofollow` versehen.
- Vor dem regulären Unternehmensauftritt die vollständigen, geprüften Anbieterangaben für Impressum und Datenschutz ergänzen. Geschäftsanschrift und verantwortliche Person wurden für diese Testversion nicht bereitgestellt. Keine erfundenen Angaben oder leeren Rechtsseiten veröffentlicht.
- Danach Suchmaschinenfreigabe und gegebenenfalls Canonical-/Social-Metadaten für die endgültige Domain aktualisieren.

`public/_headers` enthält die HTTP-Sicherheitsheader für Cloudflare Pages.
