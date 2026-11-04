# Freigabe für mk-reinigungsteam.de

## Angaben der Inhaberin

- Geschäftsbezeichnung und Name der Inhaberin stehen in den Entwürfen. Für die Freigabe fehlt die bestätigte ladungsfähige Geschäftsanschrift. Gegebenenfalls Angaben zur Rechtsform, zu Vertretungsberechtigten, zum Register und zu zugeteilten USt-IdNr. und/oder W-IdNr. ergänzen. Die persönliche Steuernummer ist hierfür nicht erforderlich.
- Sofern anwendbar, zuständige Aufsicht und berufsrechtliche Angaben sowie Pflichten zur Verbraucherschlichtung klären.
- Für die Datenschutzerklärung die verantwortliche Stelle und gegebenenfalls den Datenschutzbeauftragten bestätigen. Die tatsächlich eingesetzten Cloudflare- und Microsoft-365-Vertragspartner, Verarbeitung und Empfänger, Löschfristen beziehungsweise Kriterien, Rechtsgrundlagen und etwaige Drittlandübermittlungen anhand der Einstellungen und Verträge prüfen.
- Die veröffentlichungsfähigen Fassungen von Impressum und Datenschutzerklärung zur Veröffentlichung freigeben. Eine konkrete Leistung wie Büroreinigung erst nach Bestätigung in Texte oder Leistungsseiten aufnehmen.

Rechtsgrundlagen für die Prüfung sind [§ 5 DDG](https://www.gesetze-im-internet.de/ddg/__5.html), [§ 36 VSBG](https://www.gesetze-im-internet.de/vsbg/__36.html) und [Art. 13 DSGVO](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32016R0679).

## Weiterleitung von www in Cloudflare

Die Hauptdomain und `www.mk-reinigungsteam.de` sind bereits über Cloudflare per HTTPS erreichbar. Die Weiterleitung wird als Regel in der bestehenden Cloudflare-Zone vorbereitet. Änderungen an den DNS-Einträgen, insbesondere denen für Microsoft 365, sind dafür nicht erforderlich.

In **Rules → Redirect Rules** eine **Single Redirect** für `www` anlegen:

| Einstellung | Wert |
| --- | --- |
| Name | WWW zur Hauptdomain |
| Bedingung (Custom filter expression) | `(http.host eq "www.mk-reinigungsteam.de")` |
| Zieltyp | Dynamic |
| Ziel (Expression) | `concat("https://mk-reinigungsteam.de", http.request.uri.path)` |
| Statuscode | `301` |
| Preserve query string | Ein |

Die Bedingung trifft ausschließlich auf `www` zu. Das Ziel liegt auf der Hauptdomain, daher greift dieselbe Regel dort nicht erneut. Eine pfadbasierte Pages-Regel in `_redirects` eignet sich dafür nicht. [Cloudflare-Dokumentation](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/create-dashboard/)

Nach dem Aktivieren muss der erste Aufruf unten auf `https://mk-reinigungsteam.de/?quelle=www-test` weiterleiten und mit `200` enden. Beim zweiten Aufruf muss der Pfad samt Abfrage im Weiterleitungsziel erhalten bleiben.

```sh
curl -IL --max-redirs 3 "https://www.mk-reinigungsteam.de/?quelle=www-test"
curl -I "https://www.mk-reinigungsteam.de/pfad-test?quelle=www-test"
```

## Freigabe und Indexierung

Die Website richtet sich an Kunden in Leipzig und Umgebung. Inhalt und Navigation sind deutsch. Die Hauptdomain endet auf `.de`, und die Antworten enthalten `Content-Language: de-DE`. Bei der Prüfung muss auch eine Anfrage mit einer anderen Browsersprache die deutsche Seite ausliefern. [Google zur Ausrichtung auf ein Land](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites#how-does-google-determine-a-target-locale)

1. Die freigegebenen Entwürfe nach `impressum/index.html` und `datenschutz/index.html` verschieben und beide als Eingaben in `vite.config.js` aufnehmen. Entwurfshinweise und Platzhalter entfernen. Beide Seiten in der Fußzeile jeder Inhaltsseite verlinken. Ihre Canonicals zeigen auf `/impressum/` und `/datenschutz/`.
2. Nach der Freigabe der Inhalte den Aufbauhinweis auf der Startseite entfernen. `noindex, nofollow` auf den zur Indexierung freigegebenen Seiten entfernen. Die `LocalBusiness`-Daten erst um eine Adresse ergänzen, wenn die bestätigte Geschäftsanschrift für diese Verwendung freigegeben ist. Google setzt eine Adresse für die entsprechende Darstellung als Rich Result voraus. [Google LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business#local-business)
3. Den vorbereiteten Sitemap-Entwurf von `drafts/sitemap.xml` nach `public/sitemap.xml` verschieben. Nur kanonische, veröffentlichte HTTPS-Seiten mit Status `200` und freigegebener Indexierung aufnehmen. Die Fehlerseite bleibt außerhalb der Sitemap. In `public/robots.txt` die Zeile `Sitemap: https://mk-reinigungsteam.de/sitemap.xml` ergänzen. [Google zu Sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
4. `npm ci` und `npm run build` ausführen. Nach Freigabe durch die Inhaberin den PR zusammenführen und die Cloudflare-Pages-Bereitstellung des Merge-Commits prüfen. Anschließend die Hauptdomain und die beiden Rechtstexte über HTTPS auf `200` und ihre Canonicals prüfen. Die frühere URL `/gebaeudereinigung/` muss mit `301` zum Abschnitt `/#leistungen` führen. Jede zur Indexierung freigegebene Seite muss sowohl im HTML als auch im HTTP-Header ohne `noindex` ausgeliefert werden. `robots.txt` muss den Abruf zulassen. Eine nicht vorhandene URL muss `404` liefern. Vorschau-Deployments dürfen weiterhin `X-Robots-Tag: noindex` senden. [Cloudflare Pages](https://developers.cloudflare.com/pages/configuration/serving-pages/)
5. Die [Anleitung für Google Search Console, Bing und lokale Unternehmensprofile](lokale-profile.md) verwenden. Erst nach dem Produktionscheck die veröffentlichte Sitemap einreichen, die Live-URLs prüfen und die Indexierung beantragen. Die Indexierung wird von den Suchmaschinen entschieden.
