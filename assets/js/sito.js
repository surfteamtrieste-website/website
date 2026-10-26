/* Surf Team Trieste — piccoli comportamenti del sito, senza librerie. */
(function () {
  "use strict";

  /* ── menu su telefono ─────────────────────────────────── */
  var bottoneMenu = document.querySelector(".testata__menu");
  var nav = document.getElementById("navigazione");
  if (bottoneMenu && nav) {
    bottoneMenu.addEventListener("click", function () {
      var aperto = bottoneMenu.getAttribute("aria-expanded") === "true";
      bottoneMenu.setAttribute("aria-expanded", String(!aperto));
      nav.classList.toggle("aperta", !aperto);
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        bottoneMenu.setAttribute("aria-expanded", "false");
        nav.classList.remove("aperta");
      }
    });
  }

  /* ── vento ora a Barcola, dai dati di Vento Trieste ─────
     Il worker di ventotrieste.info tiene una copia dei dati aggiornata ogni minuto.
     Barcola = centralina Windguru sul Terrapieno: media e raffica degli ultimi 10 minuti, in nodi.
     Se è ferma da più di 20 minuti si mostra Trieste molo (Protezione Civile FVG).
     Le parole sono quelle del surfometro di Vento Trieste; a Barcola seguono la raffica
     perché la centralina è al riparo (vedi il commento in ventotrieste.info). */
  var DATI_VENTO = "https://ventotrieste-dati.bebroggi.workers.dev/";
  var VECCHIO_MIN = 20;
  var BANDE = [
    { fino: 8, txt: "Bavisela", gloss: "solo brezza leggera, vento troppo debole", colore: "#7d8791" },
    { fino: 13, txt: "Arietta", gloss: "wing foil con ali grandi", colore: "#1f8f87" },
    { fino: 18, txt: "Sufia", gloss: "Tutti in acqua! Xe aria!", colore: "#5a9431" },
    { fino: 25, txt: "Sufia ben", gloss: "wing foil con ali piccole e windsurf", colore: "#3f7414" },
    { fino: 35.01, txt: "Sufia sai ben", gloss: "pochi wing, tanti windsurf", colore: "#2f5a0e" },
    { fino: Infinity, txt: "Buriana!", gloss: "Cúci e boni; no xè el caso", colore: "#d63a3a" }
  ];
  var PUNTI = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSO", "SO", "OSO", "O", "ONO", "NO", "NNO"];
  var INGLESE = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];

  function banda(kt) {
    for (var i = 0; i < BANDE.length; i++) if (kt < BANDE[i].fino) return BANDE[i];
    return BANDE[BANDE.length - 1];
  }
  function gradiDa(sigla) {
    var i = INGLESE.indexOf(String(sigla || "").toUpperCase());
    if (i < 0) i = PUNTI.indexOf(String(sigla || "").toUpperCase());
    return i < 0 ? null : i * 22.5;
  }
  function direzione(deg) {
    if (deg == null || isNaN(deg)) return "";
    var g = ((Math.round(deg) % 360) + 360) % 360;
    return String(g).padStart(3, "0") + "° " + PUNTI[Math.round(g / 22.5) % 16];
  }
  function nodi(media, raffica) {
    var m = Math.round(media), r = Math.round(raffica);
    return isNaN(r) || r <= m ? String(m) : m + "–" + r;
  }
  function oraDa(unix) {
    return new Date(unix * 1000).toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Rome" });
  }

  function letture(d) {
    var out = {};
    var b = d && d.barcola;
    if (b && typeof b.wind_avg === "number" && b.unixtime) {
      out.barcola = {
        luogo: "Barcola", media: b.wind_avg, raffica: b.wind_max, deg: b.wind_direction,
        ora: oraDa(b.unixtime), eta: (Date.now() / 1000 - b.unixtime) / 60, parolaSu: b.wind_max
      };
    }
    var t = d && d.trieste && d.trieste[0];
    if (t && t.kt != null) {
      var media = parseFloat(t.kt), raffica = parseFloat(t.sunki);
      out.trieste = { luogo: "Trieste molo", media: media, raffica: raffica, deg: gradiDa(t.direzione), ora: t.ora, parolaSu: media };
    }
    return out;
  }

  function mostraVento(box, l) {
    var q = function (s) { return box.querySelector(s); };
    var b = l.barcola, viva = b && b.eta <= VECCHIO_MIN;
    var scelta = viva ? b : l.trieste;
    if (!scelta || isNaN(scelta.media)) return erroreVento(box);

    box.setAttribute("data-stato", "ok");
    q("[data-v-luogo]").textContent = viva ? "Vento ora a Barcola" : "Vento ora a Trieste (molo)";
    q("[data-v-kt]").textContent = nodi(scelta.media, scelta.raffica);
    q("[data-v-dir]").textContent = [direzione(scelta.deg), "ore " + scelta.ora].filter(Boolean).join(" · ");
    var freccia = q("[data-v-freccia]");
    if (scelta.deg != null && !isNaN(scelta.deg)) {
      freccia.style.setProperty("--deg", scelta.deg + "deg");
      freccia.hidden = false;
    } else {
      freccia.hidden = true;
    }
    var p = banda(scelta.parolaSu), parola = q("[data-v-parola]");
    parola.querySelector("strong").textContent = p.txt;
    parola.querySelector("strong").style.setProperty("--colore-parola", p.colore);
    parola.querySelector("span").textContent = p.gloss;
    parola.hidden = false;
    q("[data-v-fonte]").textContent = viva
      ? "Media e raffica degli ultimi 10 minuti dalla centralina sul Terrapieno."
      : "La centralina di Barcola ora non trasmette: dati della Protezione Civile FVG al molo di Trieste.";

    var righe = q("[data-v-righe]");
    if (righe) {
      righe.innerHTML = "";
      [b, l.trieste].forEach(function (r) {
        if (!r) return;
        var li = document.createElement("li");
        var nome = document.createElement("span");
        nome.textContent = r.luogo === "Barcola" ? "Barcola, Terrapieno" : "Trieste molo";
        var val = document.createElement("b");
        val.textContent = (r === b && !viva)
          ? "ferma dalle " + r.ora
          : nodi(r.media, r.raffica) + " kt · " + (direzione(r.deg) || "–") + " · " + r.ora;
        li.appendChild(nome); li.appendChild(val); righe.appendChild(li);
      });
      righe.hidden = !righe.children.length;
      if (viva && l.trieste) q("[data-v-fonte]").textContent += " Trieste molo: Protezione Civile FVG (CC BY 4.0).";
    }
  }

  function erroreVento(box) {
    box.setAttribute("data-stato", "errore");
    box.querySelector("[data-v-kt]").textContent = "–";
    box.querySelector("[data-v-dir]").textContent = "Dati non disponibili in questo momento.";
    box.querySelector("[data-v-parola]").hidden = true;
  }

  var boxVento = document.querySelectorAll("[data-vento]");
  if (boxVento.length && window.fetch) {
    var leggi = function () {
      var ac = "AbortController" in window ? new AbortController() : null;
      var timer = setTimeout(function () { if (ac) ac.abort(); }, 8000);
      fetch(DATI_VENTO + "?ts=" + Date.now(), ac ? { signal: ac.signal, cache: "no-store" } : { cache: "no-store" })
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then(function (d) {
          var l = letture(d);
          Array.prototype.forEach.call(boxVento, function (box) { mostraVento(box, l); });
        })
        .catch(function () { Array.prototype.forEach.call(boxVento, erroreVento); })
        .then(function () { clearTimeout(timer); });
    };
    leggi();
    setInterval(function () { if (!document.hidden) leggi(); }, 120000);
  }

  /* ── webcam di Barcola: nuova immagine ogni minuto ─── */
  var webcam = document.querySelector("[data-webcam]");
  if (webcam) {
    var img = webcam.querySelector("img");
    var ora = webcam.querySelector("[data-webcam-ora]");
    var base = webcam.getAttribute("data-src");
    var aggiorna = function () {
      var nuova = new Image();
      nuova.onload = function () {
        img.src = nuova.src;
        if (ora) ora.textContent = " (ultima alle " + new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }) + ")";
      };
      nuova.src = base + "?t=" + Date.now();
    };
    setInterval(function () { if (!document.hidden) aggiorna(); }, 60000);
  }

  /* ── previsioni Windguru (widget ufficiale, caricato quando serve) ── */
  var wg = document.querySelector("[data-windguru]");
  if (wg) {
    var palco = wg.querySelector("[data-wg-palco]");
    var schede = wg.querySelectorAll("[data-wg-model]");
    var caricaModello = function (bottone) {
      Array.prototype.forEach.call(schede, function (b) {
        b.setAttribute("aria-selected", String(b === bottone));
        var pannello = palco.querySelector('[data-wg-pannello="' + b.dataset.wgModel + '"]');
        if (pannello) pannello.hidden = b !== bottone;
      });
      var attesa = palco.querySelector("[data-wg-attesa]");
      if (attesa) attesa.remove();
      if (palco.querySelector('[data-wg-pannello="' + bottone.dataset.wgModel + '"]')) return;

      var uid = "wg_fwdg_" + bottone.dataset.wgSpot + "_" + bottone.dataset.wgModel;
      var pannello = document.createElement("div");
      pannello.setAttribute("data-wg-pannello", bottone.dataset.wgModel);
      pannello.innerHTML = "<p>Carico le previsioni…</p>";
      palco.appendChild(pannello);
      var segno = document.createElement("script");
      segno.id = uid;
      pannello.appendChild(segno);
      var parametri = [
        "s=" + bottone.dataset.wgSpot, "m=" + bottone.dataset.wgModel, "uid=" + uid,
        "wj=knots", "tj=c", "waj=m", "tij=cm", "odh=0", "doh=24", "fhours=240", "hrsm=2",
        "vt=forecasts", "lng=it", "p=WINDSPD,GUST,MWINDSPD,SMER,TMP,CDC,APCP1s"
      ];
      var script = document.createElement("script");
      script.src = "https://www.windguru.cz/js/widget.php?" + parametri.join("&");
      script.async = true;
      script.onload = function () { var p = pannello.querySelector(":scope > p"); if (p) p.remove(); };
      script.onerror = function () { pannello.innerHTML = "<p>Previsioni non disponibili ora. Riprova tra poco o apri windguru.cz.</p>"; };
      segno.parentNode.insertBefore(script, segno);
    };
    Array.prototype.forEach.call(schede, function (b) {
      b.addEventListener("click", function () { caricaModello(b); });
    });
    var parti = function () { caricaModello(schede[0]); };
    if ("IntersectionObserver" in window) {
      var oss = new IntersectionObserver(function (voci) {
        if (voci.some(function (v) { return v.isIntersecting; })) { oss.disconnect(); parti(); }
      }, { rootMargin: "300px" });
      oss.observe(wg);
    } else {
      parti();
    }
  }

  /* ── modulo lezioni ───────────────────────────────────── */
  var modulo = document.querySelector("[data-modulo]");
  if (modulo) {
    var esito = modulo.querySelector("[data-esito]");
    var mostra = function (testo) { esito.textContent = testo; esito.classList.add("visibile"); };

    modulo.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!modulo.checkValidity()) {
        var primo = modulo.querySelector(":invalid");
        mostra("Controlla i campi obbligatori: nome, email valida, corso e consenso privacy.");
        if (primo) primo.focus();
        return;
      }
      var dati = new FormData(modulo);
      var endpoint = modulo.getAttribute("data-endpoint");

      if (endpoint) {
        var bottone = modulo.querySelector("button[type=submit]");
        bottone.disabled = true;
        fetch(endpoint, { method: "POST", body: dati, headers: { Accept: "application/json" } })
          .then(function (r) {
            if (!r.ok) throw new Error(r.status);
            modulo.reset();
            mostra("Richiesta inviata, grazie! Ti rispondiamo appena possibile.");
          })
          .catch(function () {
            mostra("Non è stato possibile inviare il modulo. Scrivici a " + modulo.getAttribute("data-email") + " o chiamaci.");
          })
          .then(function () { bottone.disabled = false; });
        return;
      }

      // Nessun servizio collegato: si apre l'app di posta con il messaggio già scritto.
      var righe = [
        "Richiesta lezione dal sito",
        "",
        "Nome: " + dati.get("nome"),
        "Email: " + dati.get("email"),
        "Telefono: " + (dati.get("telefono") || "-"),
        "Corso: " + dati.get("corso"),
        "Esperienza: " + dati.get("livello"),
        "Persone: " + (dati.get("persone") || "1"),
        "Periodo: " + (dati.get("periodo") || "-"),
        "",
        dati.get("messaggio") || ""
      ];
      var oggetto = "Lezione di " + dati.get("corso") + " - " + dati.get("nome");
      window.location.href = "mailto:" + modulo.getAttribute("data-email") +
        "?subject=" + encodeURIComponent(oggetto) + "&body=" + encodeURIComponent(righe.join("\n"));
      mostra("Si sta aprendo la tua app di posta con il messaggio pronto: basta premere Invia. Se non si apre, scrivici a " + modulo.getAttribute("data-email") + ".");
    });
  }
})();
