/* Consenso alle statistiche (Google Analytics 4).
   - Nessuna scelta: riquadro in basso; GA non si carica.
   - Accetta: carica gtag.js con analytics_storage concesso, niente pubblicità né Google Signals.
   - Rifiuta: niente GA; la domanda torna dopo 6 mesi.
   - «Preferenze cookie» nel piè di pagina riapre il riquadro; se si passa da Accetta a Rifiuta
     i cookie _ga vengono cancellati.
   La scelta sta in localStorage («stt-consenso»), non in un cookie. */
(function () {
  "use strict";
  var ID = window.STT_GA4;
  var riquadro = document.querySelector("[data-consenso]");
  if (!ID || !riquadro) return;

  var CHIAVE = "stt-consenso";
  var SEI_MESI = 182 * 24 * 60 * 60 * 1000;
  var avviato = false;

  function leggi() {
    try { return JSON.parse(localStorage.getItem(CHIAVE) || "null"); } catch (e) { return null; }
  }
  function salva(scelta) {
    try { localStorage.setItem(CHIAVE, JSON.stringify({ scelta: scelta, quando: Date.now() })); } catch (e) {}
  }

  function avvia() {
    if (avviato) return;
    avviato = true;
    window["ga-disable-" + ID] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("consent", "default", {
      ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "granted"
    });
    window.gtag("js", new Date());
    window.gtag("config", ID, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_expires: 13 * 30 * 24 * 60 * 60   /* 13 mesi invece dei 2 anni predefiniti */
    });
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(ID);
    document.head.appendChild(s);
  }

  function ferma() {
    window["ga-disable-" + ID] = true;
    if (window.gtag) window.gtag("consent", "update", { analytics_storage: "denied" });
    var host = location.hostname.replace(/^www\./, "");
    document.cookie.split(";").forEach(function (c) {
      var nome = c.split("=")[0].trim();
      if (nome === "_ga" || nome.indexOf("_ga_") === 0) {
        ["", "; domain=." + host, "; domain=" + location.hostname].forEach(function (d) {
          document.cookie = nome + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/" + d;
        });
      }
    });
  }

  function mostra() { riquadro.hidden = false; }
  function nascondi() { riquadro.hidden = true; }

  riquadro.addEventListener("click", function (ev) {
    var b = ev.target.closest("[data-consenso-scelta]");
    if (!b) return;
    var scelta = b.getAttribute("data-consenso-scelta");
    salva(scelta);
    if (scelta === "si") avvia(); else ferma();
    nascondi();
  });

  Array.prototype.forEach.call(document.querySelectorAll("[data-consenso-apri]"), function (b) {
    b.hidden = false;
    b.addEventListener("click", function () {
      mostra();
      var primo = riquadro.querySelector("button");
      if (primo) primo.focus();
    });
  });

  var c = leggi();
  if (c && c.scelta === "si") avvia();
  else if (c && c.scelta === "no" && Date.now() - c.quando < SEI_MESI) { /* rispetta il rifiuto */ }
  else mostra();
})();
