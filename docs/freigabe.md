# Freigabe für mk-reinigungsteam.de

## Angaben der Inhaberin

- Für das Impressum den vollständigen Namen der Unternehmerin beziehungsweise den eingetragenen Unternehmensnamen mit Rechtsform sowie die ladungsfähige Geschäftsanschrift bestätigen. Gegebenenfalls Vertretungsberechtigte, Register und Nummer sowie zugeteilte USt-IdNr. und/oder W-IdNr. ergänzen. Die persönliche Steuernummer ist hierfür nicht erforderlich.
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

1. Die freigegebenen Entwürfe nach `impressum/index.html` und `datenschutz/index.html` verschieben und beide als Eingaben in `vite.config.js` aufnehmen. Entwurfshinweise und Platzhalter entfernen. Beide Seiten in der Fußzeile verlinken. Ihre Canonicals zeigen auf `/impressum/` und `/datenschutz/`.
2. Den Aufbauhinweis auf der Startseite entfernen. `noindex, nofollow` auf den zur Indexierung freigegebenen Seiten entfernen und deren HTTPS-URLs in `public/sitemap.xml` aufnehmen. Die Fehlerseite bleibt außerhalb der Sitemap. Die `LocalBusiness`-Daten erst um eine Adresse ergänzen, wenn die bestätigte Geschäftsanschrift für diese Verwendung freigegeben ist. Google setzt eine Adresse für die entsprechende Darstellung als Rich Result voraus. [Google LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business#local-business)
3. `npm run build` ausführen. Nach Review und Merge die Produktion auf `https://mk-reinigungsteam.de/` prüfen. Die drei Inhaltsseiten müssen per HTTPS `200` liefern, jeweils ihren eigenen Canonical enthalten und weder per Meta-Tag noch per HTTP-Header `X-Robots-Tag` von der Indexierung ausgeschlossen sein. Die `robots.txt` darf diese Pfade nicht sperren. Einen fehlenden Pfad auf HTTP `404` prüfen. Cloudflare kann Vorschau-Deployments mit `X-Robots-Tag: noindex` ausliefern. Maßgeblich ist die Hauptdomain. [Cloudflare Pages](https://developers.cloudflare.com/pages/configuration/serving-pages/)
4. Die Inhaberin legt in Google Search Console die URL-Präfix-Property `https://mk-reinigungsteam.de/` an und stellt den genauen HTML-Bestätigungs-Tag bereit. Den Tag im `<head>` der Startseite hinterlegen, veröffentlichen und die Property bestätigen. Diese Methode erfordert keine DNS-Änderung. [Google Search Console](https://support.google.com/webmasters/answer/9008080?hl=de)
5. Erst nach Freigabe und Prüfung die `https://mk-reinigungsteam.de/sitemap.xml` in Search Console einreichen. Die Live-URL-Prüfung der Startseite ausführen, bei erfolgreicher Prüfung die Indexierung beantragen und später den Status im Bericht zur Seitenindexierung prüfen. [Google URL-Prüfung](https://support.google.com/webmasters/answer/9012289?hl=de)
