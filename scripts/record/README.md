# Recording the help clips

Every `::help-video` in an article is a short, silent screen recording of the
real app, made by a script rather than by hand -- so when a screen changes,
re-running the script replaces the clip and no article needs touching.

Clips are recorded in Spanish, against **Clínica Demo**: a fictional clinic
whose every person, phone and address is invented. Never record production,
the real clinic, or real patients. `record.mjs` refuses any non-local URL.

## One-off setup

1. A QuiroFlow checkout of current `main`, with its own Supabase stack so a
   `db reset` elsewhere can't wipe the demo clinic: in that checkout only, set
   `project_id = "quiroflow-help"` in `supabase/config.toml` and move every
   port by +600 (api 54921, db 54922, ...). Never commit that change.
2. `supabase start -x studio,vector,logflare,imgproxy,edge-runtime`
3. Seed the demo clinic (QuiroFlow's own script), then this repo's extras:

   ```bash
   # in the QuiroFlow checkout
   NUXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54921 npx jiti scripts/seed-demo-clinic.ts
   # here
   node scripts/record/seed.mjs
   ```

4. Run the app against that stack on its own port, with no `.env`:
   `NUXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54921 NUXT_PUBLIC_SUPABASE_KEY=<local anon key> NUXT_SUPABASE_SECRET_KEY=<local service key> npx nuxt dev --no-fork --port 3961`

## Recording

```bash
BASE_URL=http://localhost:3961 node scripts/record/record.mjs            # everything
BASE_URL=http://localhost:3961 node scripts/record/record.mjs calendar-- # one collection
```

Output lands in `scripts/record/out/<clip-id>.mp4` and `.jpg` (the poster).
A failed clip leaves a screenshot in `scripts/record/.frames/<id>-failure.png`.

Record after 10:18 Madrid time: the browser clock is then set to 10:18 so
"now" sits in a working morning (before that, the real time is used).

To watch clips in the site before uploading them:

```bash
npx serve -l 3962 --cors scripts/record/out
NUXT_PUBLIC_HELP_VIDEO_BASE=http://localhost:3962 npm run dev
```

## Publishing

```bash
SUPABASE_SERVICE_ROLE_KEY=... node scripts/record/upload.mjs [filter]
```

Uploads to the public `help-videos` bucket of the production project (created
on first run). Names are stable, so a re-record replaces the clip in place.

## Writing a clip

Clips live in `clips/<collection>.mjs`, one array per collection:

```js
{
  id: 'calendar--book-new-patient',  // <collection-ish>--<what>, unique; the file name
  path: '/calendar',                 // where the page starts (not recorded)
  ready: 'text=+ Nueva Cita',        // wait for this before recording
  as: 'owner',                       // who is signed in ('anon' for public pages)
  async prepare(h) {},               // optional, NOT recorded: open a tab, scroll, close a toast
  async run(h) {                     // recorded
    await h.click(h.page.getByRole('button', { name: '+ Nueva Cita' }))
    await h.type(h.page.getByPlaceholder('Buscar por nombre, teléfono o email…'), 'Irene Campos')
  },
  hold: 1600,                        // ms to rest on the result before the loop restarts
}
```

`h` has `click`, `type`, `select`, `hover`, `press`, `scroll`, `pause` and
`moveAway`, each paced for someone watching (the cursor glides, clicks
ripple). `h.page` is the Playwright page for anything else.

Keep clips to one task, 8-30 seconds. Start from a page that is already
loaded and end on the result. A clip that saves something should still work
when run twice (search for a patient instead of creating one, or pick a
name that can repeat).

Extra demo data a clip needs goes in `seed/<collection>.mjs` (a default
export taking the context from `seed.mjs`), and must be safe to re-run.
