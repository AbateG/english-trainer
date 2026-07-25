# English Trainer A1–C2

Offline, free, zero-dependency English trainer for Spanish-speaking beginners.
Same philosophy as Deutsch Trainer: open `index.html` in any browser — no
server, no install, no internet required after the first download.

## How it works

- **index.html** — page shell, all views (levels → skills → exercises → result)
- **css/style.css** — visual identity (ink/amber "journey" theme)
- **js/db.js** — IndexedDB wrapper; stores completion + score per skill, per level, on-device
- **js/data.js** — the curriculum itself: levels, skills, exercises (plain JS objects,
  not fetched JSON — this avoids `file://` CORS issues when double-clicking `index.html`)
- **js/exercises.js** — renders one exercise (`mcq` or `fill`) and checks the answer
- **js/app.js** — navigation and state: level list → skill list → exercise session → result

## Current content status

**All six levels (A1–C2)**: 36 skills, **157 exercises** total, validated end to end
(automated checks: mcq answers exist in their own options, no duplicate options,
every exercise has both ES and EN text, no duplicate skill IDs anywhere in the
curriculum, all element IDs cross-checked between HTML and JS).

Each level now has **6 skills**, added in a logical sequence building on what came
before:

- **A1**: greetings, numbers & age, family, reading (an ordinary day), colors &
  objects, days & time
- **A2**: daily routine, past simple, shopping, reading (a weekend), prepositions
  of place, asking for directions
- **B1**: present perfect, future plans, comparatives & superlatives, reading
  (changing careers), modals of obligation (must/have to/should), first & second
  conditionals
- **B2**: modals of deduction, passive voice, reported speech, reading (remote
  work), relative clauses, "used to"/"would" for past habits
- **C1**: mixed conditionals, phrasal verbs & collocations, advanced connectors &
  cohesion, reading (the growth dilemma), causative (have/get something done),
  nominalization & formal register
- **C2**: inversion & emphatic structures, nuanced idioms & register, subtle
  academic discourse, reading (a nuanced essay), cleft sentences, subtle
  hypothetical distance

### Honest scope note

This app teaches grammar, vocabulary, and reading comprehension well, with real
breadth per level now. It still has **no writing or speaking practice** — a fully
comprehensive CEFR course needs those two skills too. Writing is feasible offline
as a self-review prompt; speaking practice is much harder to do meaningfully
without a grader, since there's no server-side model to evaluate pronunciation
or fluency in this zero-cost, offline architecture.

## Feedback & analytics (new)

Since this is offline-first with no server, there's no way to automatically see what
happens on other people's devices. Instead, the app tracks locally which specific
exercises a learner gets wrong most often (per-exercise attempt/error counts,
stable across shuffles), surfaces that as a **"📊 Progreso"** view ranked by error rate,
and gives the learner:
- A free-text box to describe what confused them
- An **"Export & share"** button that downloads a JSON summary (weakest grammar points +
  their comments) they can send you directly (WhatsApp, email, etc.) — this is the
  practical substitute for a backend: the learner explicitly chooses to share it.

## Recent improvements

- **Bug fix**: skill card titles were rendering unreadable black text on the dark
  background. Root cause: `<button>` elements don't inherit text color from the
  page by default in browsers (unlike divs/paragraphs) — you have to set it
  explicitly. The skill card title never had an explicit color, so it fell back
  to the browser's native black button text. Fixed by setting `color` explicitly
  on `.skill-card` and `.skill-card h3`, and audited every other button/input in
  the app to confirm none of them had the same silent gap.
- 🔊 Pronunciation playback via the browser's free SpeechSynthesis API
- "listen" exercise type (hear a phrase, type what you heard)
- Reading comprehension: passages with a tap-to-reveal translation, one per level
- Exercises and multiple-choice options shuffle on every attempt
- Scores kept as "best attempt" — a weaker retry doesn't erase an earlier pass
- "Practicar errores" / "Practice mistakes" — redo just the wrong items after a session
- Switching ES/EN refreshes whatever screen is currently open
- **Keyboard shortcuts**: press 1–4 to answer multiple-choice questions, Enter to
  submit fill-in/listening answers — numbered badges on each option make this discoverable
- **Instant visual feedback**: a subtle pulse on correct answers, a shake on incorrect
  ones, so the response doesn't feel flat
- **Streak counter**: a 🔥 badge appears after 2+ correct answers in a row during a session
- **Perfect-score celebration**: a small animated flourish on the results screen when
  a learner gets 100% on a skill
- Audited: no duplicate analytics keys within any skill, all element IDs referenced
  in JS cross-checked against the HTML (both verified via script after every change)

## Adding content

Open `js/data.js` and add to `CURRICULUM[<LEVEL>].skills`. Each skill:

```js
{
  id: 'a1-unique-id',
  title_es: '...', title_en: '...',
  desc_es: '...',  desc_en: '...',
  exercises: [
    { type:'mcq', prompt_es:'...', prompt_en:'...', options:['...','...'], answer:'...' },
    { type:'fill', prompt_es:'...', prompt_en:'...', answer:'...' },
  ]
}
```

To add a new exercise **type** (e.g. listening, matching, ordering), add a case
for it in `js/exercises.js` inside `Exercises.render()`.

## Possible next layers (no cost, still offline)

- Browser **SpeechSynthesis API** for pronunciation playback (robotic but free, offline)
- Spaced-repetition scheduling on top of the existing IndexedDB progress records
- Export/import progress as JSON so a learner can move between devices manually

## Getting it online (no cost, no account required to start)

Right now the app can be shared as a zip file, but that means every learner has
to download, extract, and double-click `index.html` — real friction, especially
on a phone. Since this is a fully static app (no backend), it can be hosted for
free with a single link:

1. Go to **https://app.netlify.com/drop** in your browser.
2. Drag the entire `english-trainer` folder (or a zip of it) onto the drop zone.
3. Netlify publishes it instantly and gives you a live URL like
   `https://random-name-123.netlify.app` — no signup needed for this step.
4. Share that URL with learners. It works on phones and computers, and once
   someone visits it once, the app keeps working **fully offline** afterward
   (see "Offline support" below).
5. Optional: create a free Netlify account afterward to "claim" the site so the
   link doesn't expire and you can update it later by dragging the folder again.

Alternatives that work the same way: **Cloudflare Pages** and **GitHub Pages**
are also free for static sites like this one, if you'd rather use one of those.

## Offline support (installable app)

The app now includes:
- **manifest.json** — lets a learner "Add to Home Screen" on their phone, so it
  opens like a real app icon instead of a browser tab
- **service-worker.js** — caches all app files the first time someone visits the
  hosted URL, so every visit after that works with **zero internet connection**,
  even though it was reached via a link instead of a downloaded folder

This only activates when the app is hosted at a URL (`http`/`https`); it's
automatically skipped when someone just double-clicks `index.html` locally, so
that original zero-setup use case still works exactly as before.
