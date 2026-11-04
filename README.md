# Sito del Surf Team Trieste A.S.D.

Il sito del windsurf club del Terrapieno di Barcola.
È un sito statico pubblicato gratis da **GitHub Pages**: ogni modifica salvata qui
su GitHub va online da sola in 1–2 minuti, senza installare niente.

- **Anteprima:** https://surfteamtrieste-website.github.io/website/
- **Dominio definitivo (dopo il passaggio):** https://www.surfteamtrieste.com

Pagine, ognuna con la sua voce nel menu in cima: **Home** (video, il club, foto, gli ultimi eventi, vento e webcam di Barcola, «Prima di uscire») ·
**Meteo e webcam** (lo spot di Barcola, vento in tempo reale, webcam e previsioni) · **Lezioni** (corsi e
numero dell'istruttore) · **Eventi** (l'albo del club con video e foto).
In fondo a ogni pagina: contatti, statuto e regolamento.

---

## Come si modifica

### Dal pannello: Pages CMS (eventi, corsi, contatti, documenti)

Il pannello è su **https://app.pagescms.org**: si entra, si sceglie il sito e si compilano dei moduli
per **Eventi**, **Corsi**, **Contatti del club** e **Statuto e documenti**,
senza toccare il codice. Ogni salvataggio va online da solo in 1–2 minuti. La configurazione
del pannello è nel file `.pages.yml`.

**Attivarlo (una volta sola, da chi ha l'account GitHub `surfteamtrieste-website`):**

1. Vai su https://app.pagescms.org ed entra con GitHub come `surfteamtrieste-website`.
2. Pages CMS chiede di installare la sua app GitHub: installala sull'account
   `surfteamtrieste-website`, solo sul repository `website`.
3. Apri `website`, branch `main`: a sinistra compaiono le voci del pannello.

**Invitare i soci, anche senza account GitHub:** nel pannello, nella sezione dei collaboratori del
repository, aggiungi la loro email. Ricevono un link per entrare; possono modificare testi e foto,
non le impostazioni del pannello.

**Aggiungere un evento:** Eventi → nuovo evento → titolo, data, riassunto e testo; video, foto principale,
galleria e risultati sono facoltativi → salva.

- La **data per esteso** è facoltativa: se resta vuota sul sito si legge «12 giugno 2027».
  Serve per scritte come «Sabato 12 giugno 2027» o «Per tutto il 2027».
- Gli eventi compaiono nell'albo, diviso per anno, dal più recente. In home c'è in grande l'ultimo
  evento con un video o una foto, e accanto i quattro eventi più recenti.
- **Video YouTube:** basta incollare il link del video (es. `https://www.youtube.com/watch?v=…`).
  Il video si guarda dentro il sito, sotto l'evento nell'albo e nella sua pagina. Se non c'è un video,
  sotto l'evento compare la foto principale. Con **Copertina del video** si sceglie l'immagine che si vede
  prima di far partire il video (se resta vuota si usa quella di YouTube).
- Nel **testo** il pulsante dell'immagine inserisce foto tra un paragrafo e l'altro; la
  **galleria** mette le foto in griglia sotto il testo.
- Le foto finiscono in `assets/img/eventi/`. Subito dopo il salvataggio un'azione automatica
  (scheda **Actions**, «Foto eventi leggere») le porta a 1600 px di lato e toglie i dati del
  telefono, compresa la posizione GPS.
- **Tieni in cima agli elenchi** lascia un evento al primo posto anche se non è il più recente.
- Il nome del file, e quindi l'indirizzo della pagina, nasce da data e titolo quando si crea l'evento
  e poi non cambia: i link già condivisi restano validi anche se il titolo viene corretto.

Se qualcosa va storto, su GitHub nella cronologia del file (**History**) si torna a qualsiasi
versione precedente.

### Da GitHub (testi delle pagine)

I testi delle pagine non sono nel pannello: si cambiano su GitHub.

1. Apri il file da cambiare qui su GitHub e clicca la **matita** ✏️ in alto a destra.
2. Cambia il testo.
3. Clicca **Commit changes…** e poi di nuovo **Commit changes**.
4. Dopo 1–2 minuti la modifica è online (scheda **Actions** per vedere l'avanzamento).

> Nei file `.yml` conta l'allineamento a sinistra: mantieni gli stessi spazi delle righe vicine
> e metti tra virgolette `"…"` i testi che contengono i due punti.

| Cosa vuoi cambiare | Dove |
|---|---|
| Eventi | pannello → Eventi (file in `_eventi/`) |
| Istruttore e telefono, email, PEC, indirizzo, come arrivare | pannello → Contatti del club (`_data/club.yml`) |
| Corsi e sconti (i prezzi non si pubblicano) | pannello → Corsi (`_data/corsi.yml`) |
| Statuto, regolamento e altri PDF | pannello → Statuto e documenti (`_data/documenti.yml` + `documenti/`) |
| Testi della home (il club, «Prima di uscire») | `index.html` |
| Testi delle pagine Meteo e webcam, Lezioni, Eventi | `meteo.html`, `lezioni.html`, `eventi.html` |
| Avviso sul vecchio dominio, anteprima | `_config.yml` |

Un evento scritto a mano in `_eventi/AAAA-MM-GG-nome-evento.md` ha questa forma (gli stessi
campi del pannello):

```yaml
---
title: Quarto Summer Memorial
date: 2027-06-12                  # serve per l'ordine degli eventi
data_testo: Sabato 12 giugno 2027 # facoltativo
luogo: Surf Team Trieste, Barcola
disciplina: [SUP]
riassunto: Una riga che compare nell'elenco degli eventi.
video: https://www.youtube.com/watch?v=…         # facoltativo
video_copertina: /assets/img/eventi/memorial-2027-copertina.jpg  # facoltativo
immagine: /assets/img/eventi/memorial-2027.jpg   # facoltativo
galleria:                                        # facoltativo
  - /assets/img/eventi/memorial-2027-arrivo.jpg
---

Qui il racconto dell'evento, normale testo. **Grassetto** con due asterischi.
```

Per la classifica c'è il blocco `risultati:` come in `2025-10-19-barcola-big-air.md`.

---

## Pagina Meteo e webcam

La pagina mostra al suo interno [Vento Trieste](https://ventotrieste.info), con la centralina
del Terrapieno di Barcola. Non serve fare nulla: i dati si aggiornano da soli.
Sotto le previsioni Windguru c'è la stazione del club (Windguru 5307) e in fondo i link alle
guide di Vento Trieste. La centralina risulta offline quando non trasmette da 20 minuti, quando
segna 0 nodi di media e di raffica o quando Vento Trieste non risponde.

---

## Passaggio a www.surfteamtrieste.com (quando l'anteprima è approvata)

Il dominio è registrato su **Register.com** (scadenza **17 maggio 2027**: attivare il
rinnovo automatico). I passaggi:

1. In **Settings → Pages → Custom domain** scrivere `www.surfteamtrieste.com` e salvare.
2. Nel pannello DNS di Register.com:
   - record `CNAME` per `www` → `surfteamtrieste-website.github.io`
   - record `A` per il dominio senza www → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - **non toccare i record MX** (sono quelli della posta Google).
3. Quando GitHub mostra il dominio verificato, spuntare **Enforce HTTPS** (il certificato è gratuito).
4. In `_config.yml`: `url: "https://www.surfteamtrieste.com"`, `baseurl: ""`, `anteprima: false`.
5. Disattivare il vecchio sito su Weebly.

---

## Per chi sviluppa

Sito [Jekyll](https://jekyllrb.com) costruito da GitHub Pages (Settings → Pages →
*Deploy from a branch*, `main`, cartella `/`). Nessuna dipendenza esterna: caratteri
(Bricolage Grotesque per i titoli, Instrument Sans per i testi, licenza OFL in `assets/fonts/`), stile e script
sono tutti nel repository.

Anteprima in locale: `jekyll serve` e poi http://127.0.0.1:4000/website/
