/* Surf Team Trieste — piccoli comportamenti del sito, senza librerie. */
(function () {
  "use strict";

  var riduciMoto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  /* ── panorama: su telefono parte con il club e il Faro in vista ── */
  var panorama = document.querySelector("[data-panorama]");
  if (panorama && panorama.scrollWidth > panorama.clientWidth) {
    panorama.scrollLeft = (panorama.scrollWidth - panorama.clientWidth) * 0.28;
  }

  /* ── la scia di bolina che collega le boe ─────────────── */
  var percorso = document.querySelector("[data-percorso]");
  var svg = percorso && percorso.querySelector(".percorso__rotta");
  if (svg) {
    var piano = svg.querySelector(".percorso__piano");
    var scia = svg.querySelector(".percorso__scia");
    var vela = svg.querySelector(".percorso__vela");
    var lunghezza = 0;
    var attivo = false;

    var disegna = function () {
      attivo = getComputedStyle(svg).display !== "none";
      if (!attivo) return;
      var box = percorso.getBoundingClientRect();
      var boe = percorso.querySelectorAll("[data-boa]");
      if (boe.length < 2) return;
      var punti = Array.prototype.map.call(boe, function (b) {
        var r = b.getBoundingClientRect();
        return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
      });
      // si parte poco sopra la prima boa e si risale di bolina: bordi a zig-zag tra una boa e l'altra
      var d = "M" + punti[0].x + " " + (punti[0].y - 90) + " L" + punti[0].x + " " + punti[0].y;
      for (var i = 1; i < punti.length; i++) {
        var a = punti[i - 1], b = punti[i];
        var tratto = b.y - a.y;
        var bordi = Math.max(2, Math.round(tratto / 190));
        for (var k = 1; k < bordi; k++) {
          var lato = k % 2 ? 1 : -1;
          var x = a.x + lato * 30;
          var y = a.y + (tratto * k) / bordi;
          d += " L" + x.toFixed(1) + " " + y.toFixed(1);
        }
        d += " L" + b.x + " " + (b.y - 30) + " L" + b.x + " " + b.y;
      }
      piano.setAttribute("d", d);
      scia.setAttribute("d", d);
      svg.setAttribute("viewBox", "0 0 " + box.width + " " + box.height);
      lunghezza = scia.getTotalLength();
      scia.style.strokeDasharray = lunghezza + " " + lunghezza;
      avanza();
    };

    var avanza = function () {
      if (!attivo || !lunghezza) return;
      var box = percorso.getBoundingClientRect();
      var visto = window.innerHeight * 0.62 - box.top;
      var quota = riduciMoto ? 1 : Math.min(1, Math.max(0, visto / box.height));
      scia.style.strokeDashoffset = String(lunghezza * (1 - quota));
      var l = lunghezza * quota;
      var p = scia.getPointAtLength(l);
      var q = scia.getPointAtLength(Math.min(lunghezza, l + 2));
      // la vela resta dritta e si inclina verso il lato del bordo che sta facendo
      var dx = q.x - p.x, dy = q.y - p.y;
      var inclina = (dx / (Math.sqrt(dx * dx + dy * dy) || 1)) * 30;
      vela.setAttribute("transform", "translate(" + p.x.toFixed(1) + " " + p.y.toFixed(1) + ") rotate(" + inclina.toFixed(1) + ")");
    };

    var programmato = false;
    window.addEventListener("scroll", function () {
      if (programmato) return;
      programmato = true;
      requestAnimationFrame(function () { programmato = false; avanza(); });
    }, { passive: true });
    window.addEventListener("resize", disegna);
    window.addEventListener("load", disegna);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(disegna);
    disegna();
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
