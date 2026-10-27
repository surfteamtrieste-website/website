# Sito del Surf Team Trieste A.S.D.

Il sito del windsurf club del Terrapieno di Barcola.
È un sito statico pubblicato gratis da **GitHub Pages**: ogni modifica salvata qui
su GitHub va online da sola in 1–2 minuti, senza installare niente.

- **Anteprima:** https://surfteamtrieste-website.github.io/website/
- **Dominio definitivo (dopo il passaggio):** https://www.surfteamtrieste.com

Pagine: **Home** (storia, chi siamo, il club) · **Lezioni** (corsi e modulo di
contatto) · **Meteo** (spot di Barcola e vento in tempo reale da Vento Trieste) · **Eventi**.
In fondo a ogni pagina: contatti, statuto e regolamento.

---

## Come si modifica

### Dal pannello: Pages CMS (eventi, corsi, contatti, documenti)

Il pannello è su **https://app.pagescms.org**: si entra, si sceglie il sito e si compilano dei moduli
per **Eventi**, **Corsi**, **Contatti del club**, **Statuto e documenti** e **Consiglio Direttivo**,
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

**Aggiungere un evento:** Eventi → nuovo evento → titolo, data, riassunto e testo; foto principale,
galleria e risultati sono facoltativi → salva.

- La **data per esteso** è facoltativa: se resta vuota sul sito si legge «12 giugno 2027».
  Serve per scritte come «Sabato 12 giugno 2027» o «Per tutto il 2027».
- Gli eventi con data futura vanno in **Prossimi appuntamenti**; passata la data scendono nell'albo,
  diviso per anno, al primo aggiornamento successivo del sito (basta un qualsiasi salvataggio).
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
| Telefoni, email, indirizzo, come arrivare | pannello → Contatti del club (`_data/club.yml`) |
| Corsi e sconti (i prezzi non si pubblicano) | pannello → Corsi (`_data/corsi.yml`) |
| Statuto, regolamento e altri PDF | pannello → Statuto e documenti (`_data/documenti.yml` + `documenti/`) |
| Consiglio Direttivo (oggi nascosto) | pannello → Consiglio Direttivo (`_data/direttivo.yml`) |
| Testi della home (storia, giornale di bordo) | `index.html` |
| Testi delle pagine Lezioni, Meteo, Eventi | `lezioni.html`, `meteo.html`, `eventi.html` |
| Avviso sul vecchio dominio, anteprima, modulo | `_config.yml` |

Un evento scritto a mano in `_eventi/AAAA-MM-GG-nome-evento.md` ha questa forma (gli stessi
campi del pannello):

```yaml
---
title: Quarto Summer Memorial
date: 2027-06-12                  # serve per l'ordine e per "prossimi appuntamenti"
data_testo: Sabato 12 giugno 2027 # facoltativo
luogo: Surf Team Trieste, Barcola
disciplina: [SUP]
riassunto: Una riga che compare nell'elenco degli eventi.
immagine: /assets/img/eventi/memorial-2027.jpg   # facoltativo
galleria:                                        # facoltativo
  - /assets/img/eventi/memorial-2027-arrivo.jpg
---

Qui il racconto dell'evento, normale testo. **Grassetto** con due asterischi.
```

Per la classifica c'è il blocco `risultati:` come in `2025-10-19-barcola-big-air.md`.

---

## Modulo "Scrivici per una lezione"

Le richieste arrivano direttamente a surfteamtrieste@gmail.com tramite
[FormSubmit](https://formsubmit.co), un servizio gratuito che non chiede account: l'oggetto
è «Lezione di <corso> - <nome>» e il pulsante Rispondi scrive a chi ha mandato la richiesta.
FormSubmit va attivato una volta sola, con il link che manda alla casella del club al primo invio;
se il sito cambia indirizzo (surfteamtrieste.com) può chiedere di nuovo la conferma.
Se il servizio non risponde, il modulo propone a chi scrive la stessa mail già pronta
da mandare con la sua posta (app, Gmail o Outlook).

L'indirizzo del servizio sta in `_config.yml` alla voce `form_endpoint`. Lasciandolo vuoto
(`form_endpoint: ""`) il modulo apre direttamente l'app di posta di chi scrive.

## Pagina Meteo

La pagina mostra al suo interno [Vento Trieste](https://ventotrieste.info), con la centralina
del Terrapieno di Barcola. Non serve fare nulla: i dati si aggiornano da soli.

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
(Archivo, licenza OFL in `assets/fonts/`), stile e script sono tutti nel repository.

Anteprima in locale: `jekyll serve` e poi http://127.0.0.1:4000/website/
