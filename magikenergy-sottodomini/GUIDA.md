# Magikenergy — collegare le landing ai sottodomini

Il sito `www.magikenergy.it` (progetto Cloudflare `magikenergy-it`) NON si tocca.
Si lavora solo sul progetto Pages `magikenergy-offerte`.

| Sottodominio | Cosa mostra |
|---|---|
| `offerta.magikenergy.it` | landing `/12000/` |
| `almese.magikenergy.it` | landing `/rata/` |
| `risparmio.magikenergy.it` | landing `/risparmio/` |
| `crm.magikenergy.it` | CRM (`/crm/`) |

## Passo 1 — Codice (sul Mac, cartella «Landing page/Sito Web Codice»)

1. Copia `functions/_middleware.js` di questa cartella in `functions/_middleware.js` del progetto
   (nella cartella `functions/` principale, accanto ad `api/`, `crm/`, `video/`).
2. In `statici/_routes.json` aggiungi `"/"` in cima all'elenco `include` (file pronto qui in `statici/_routes.json`).
3. `npm run build` → controlla che `dist/_routes.json` contenga `"/"`.
4. `npm run deploy:prova`, poi `npm run deploy`.

Il codice non cambia niente su `magikenergy-offerte.pages.dev`: i link attuali continuano a funzionare.

## Passo 2 — Cloudflare (dash.cloudflare.com, account «OnlinePerTutti Batch 1»)

Per ognuno dei 4 sottodomini:

1. Workers & Pages → `magikenergy-offerte` → **Custom domains** → **Set up a custom domain**.
2. Scrivi il sottodominio (es. `almese.magikenergy.it`) → Continue → **Activate domain**.
3. Cloudflare crea da solo il record CNAME `almese → magikenergy-offerte.pages.dev` (proxato).
   Dopo qualche minuto lo stato diventa **Active** e il certificato SSL è pronto.

NON toccare: i record `www` e `magikenergy.it`, e i 30 record della posta Aruba (tutti «DNS only»).
Non creare record jolly (`*`).

## Passo 3 — Prova

- `https://offerta.magikenergy.it` → landing 12.000 €
- `https://almese.magikenergy.it` → landing rata
- `https://risparmio.magikenergy.it` → landing risparmio
- `https://crm.magikenergy.it` → login del CRM
- `https://www.magikenergy.it` → sito principale, invariato
- Un lead di prova SOLO sull'anteprima (`prova.magikenergy-offerte.pages.dev`), mai sul CRM vero.

## Passo 4 — Annunci Meta

Nuovo link: `https://almese.magikenergy.it/?cr=<creatività>&utm_source=facebook&utm_medium=paid&utm_campaign=<campagna>&utm_content=<creatività>`
(stessa cosa con `offerta.` e `risparmio.`). I vecchi link `pages.dev` restano validi.

## Facoltativo

- `config/comune.json` → `site.url` è ancora `https://magikenergy-offerte.pages.dev` (serve per anteprima del link e immagine
  di WhatsApp/Facebook). Funziona così com'è; si può passare a `https://offerta.magikenergy.it` quando si vuole.
- Nuova creatività con pagina nuova (es. `/12000-b/`): basta il link `offerta.magikenergy.it/12000-b/`, oppure un nuovo
  sottodominio = una riga in `LANDING` + Custom domain su Cloudflare.
