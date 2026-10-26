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

## Come si modifica (dal browser, senza programmi)

1. Apri il file da cambiare qui su GitHub e clicca la **matita** ✏️ in alto a destra.
2. Cambia il testo.
3. Clicca **Commit changes…** e poi di nuovo **Commit changes**.
4. Dopo 1–2 minuti la modifica è online (scheda **Actions** per vedere l'avanzamento).

Se qualcosa va storto, nella cronologia del file (**History**) si torna a qualsiasi versione precedente.

> Nei file `.yml` conta l'allineamento a sinistra: mantieni gli stessi spazi delle righe vicine
> e metti tra virgolette `"…"` i testi che contengono i due punti.

### Dove sono i testi

| Cosa vuoi cambiare | File |
|---|---|
| Telefoni, email, PEC, indirizzo, come arrivare | `_data/club.yml` |
| Corsi e sconti (i prezzi non si pubblicano) | `_data/corsi.yml` |
| Statuto, regolamento e altri PDF | `_data/documenti.yml` + cartella `documenti/` |
| Consiglio Direttivo (oggi nascosto) | `_data/direttivo.yml` → `mostra: true` |
| Eventi | cartella `_eventi/` |
| Testi della home (storia, giornale di bordo) | `index.html` |
| Testi delle pagine Lezioni, Meteo, Eventi | `lezioni.html`, `meteo.html`, `eventi.html` |
| Avviso sul vecchio dominio, anteprima, modulo | `_config.yml` |

### Aggiungere un evento

1. Entra nella cartella `_eventi/` e apri un evento esistente, per esempio
   `2025-10-19-barcola-big-air.md`; copia tutto il contenuto.
2. Torna in `_eventi/`, clicca **Add file → Create new file** e chiamalo
   `AAAA-MM-GG-nome-evento.md` (es. `2027-06-12-memorial-summer.md`).
3. Incolla e cambia i campi in alto:

```yaml
---
title: Quarto Summer Memorial
date: 2027-06-12            # data dell'evento: serve per l'ordine e per "prossimi appuntamenti"
data_testo: Sabato 12 giugno 2027
luogo: Surf Team Trieste, Barcola
disciplina: SUP
immagine: ""                # oppure assets/img/nome-foto.jpg
riassunto: Una riga che compare nell'elenco degli eventi.
---

Qui il racconto dell'evento, normale testo. **Grassetto** con due asterischi.
```

Gli eventi con data futura compaiono da soli in **Prossimi appuntamenti**; passata la data
scendono nell'albo, divisi per anno. Per tenere un evento in cima agli elenchi anche se non è il
più recente, aggiungi in alto la riga `in_cima: true`. Per la classifica si può aggiungere il blocco
`risultati:` come in `2025-10-19-barcola-big-air.md`.

### Cambiare o aggiungere foto

Carica la foto in `assets/img/` (**Add file → Upload files**), larga al massimo 2000 px e
sotto i 500 KB, con un nome senza spazi (es. `barcolana-fun-2026.jpg`). Poi scrivi il
percorso nel campo `immagine:` dell'evento, per esempio `assets/img/barcolana-fun-2026.jpg`.

### Aggiornare statuto e regolamento

Carica il PDF in `documenti/` e in `_data/documenti.yml` scrivi il nome del file nel campo
`file:`. Se `file:` è vuoto, sul sito il documento risulta "in aggiornamento".

---

## Modulo "Scrivici per una lezione"

Oggi il modulo apre l'app di posta di chi scrive con il messaggio già compilato per
surfteamtrieste@gmail.com: funziona subito, senza servizi esterni.
Per ricevere le richieste direttamente (anche da chi non ha un'app di posta sul telefono):

1. crea un account gratuito su [formspree.io](https://formspree.io) con surfteamtrieste@gmail.com;
2. crea un form e copia l'indirizzo che ti dà (tipo `https://formspree.io/f/abcdwxyz`);
3. incollalo in `_config.yml` alla voce `form_endpoint: ""`.

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
