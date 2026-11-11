---
title: Privacy e cookie
permalink: /privacy/
description: Informativa privacy e cookie del sito del Surf Team Trieste A.S.D.
---
{%- assign club = site.data.club -%}
<header class="pagina-testa">
  <div class="contenitore">
    <p class="etichetta">Informativa</p>
    <h1 class="pagina-testa__titolo">Privacy e cookie</h1>
  </div>
</header>

<section class="sezione">
  <div class="contenitore">
    <div class="testo" markdown="1">

**Titolare del trattamento:** {{ club.ragione_sociale }}, {{ club.indirizzo.via }}, {{ club.indirizzo.cap }} {{ club.indirizzo.citta }}, C.F. {{ club.codice_fiscale }}, [{{ club.email }}](mailto:{{ club.email }}).

## Statistiche delle visite

Per sapere quante persone visitano il sito e quali pagine leggono usiamo **Google Analytics 4** (Google Ireland Ltd), **solo se lo accetti** dal riquadro che compare in fondo alla pagina. Se rifiuti o non scegli, Google Analytics non viene caricato.

Se accetti, Google Analytics salva nel browser i cookie `_ga` e `_ga_*` (durata 13 mesi) e raccoglie dati sull'uso del sito: pagine viste, durata della visita, tipo di dispositivo e browser, città o paese approssimativi. Google Analytics 4 non registra né conserva l'indirizzo IP. Non usiamo funzioni pubblicitarie né Google Signals, i dati restano in forma aggregata e li conserviamo per 14 mesi. Google può trattarli anche negli Stati Uniti, nell'ambito dell'EU-US Data Privacy Framework.

Puoi cambiare idea in qualsiasi momento con **Preferenze cookie** in fondo a ogni pagina: se rifiuti dopo aver accettato, i cookie di Google Analytics vengono cancellati.

## Cookie tecnici e memoria del browser

Il sito non usa altri cookie. Nella memoria del browser (localStorage) ricorda solo se hai già visto l'avviso sul vecchio dominio e la tua scelta sulle statistiche. I caratteri tipografici sono ospitati sul sito stesso.

## Contenuti di terze parti

Per mostrare il vento in tempo reale, la home e la pagina Meteo leggono i dati di [Vento Trieste](https://ventotrieste.info) (un servizio ospitato su Cloudflare). La pagina Meteo mostra anche l'immagine della webcam di Barcola (servizio Meteobridge), le previsioni e la stazione del club su [Windguru](https://www.windguru.cz) e, al suo interno, il sito Vento Trieste, che ha una propria informativa. I video degli eventi si caricano da YouTube in modalità privacy avanzata (youtube-nocookie.com) solo quando premi play. Per caricare questi contenuti il browser si collega ai rispettivi servizi, che vedono l'indirizzo IP del visitatore e hanno regole proprie. I link a mappe e servizi esterni portano a siti con regole proprie.

## I tuoi diritti

Puoi chiedere in qualsiasi momento di vedere, correggere o cancellare i tuoi dati (artt. 15 e seguenti del Regolamento UE 2016/679) scrivendo a [{{ club.email }}](mailto:{{ club.email }}). Hai anche il diritto di presentare reclamo al Garante per la protezione dei dati personali.

</div>
  </div>
</section>
