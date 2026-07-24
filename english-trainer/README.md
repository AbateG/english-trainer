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

**All six levels (A1–C2)**: 18 skills, **99 exercises** total (nearly doubled from the
first full pass), validated end to end (every mcq answer exists in its own options,
no duplicate options, every exercise has both ES and EN text, all skill/view IDs
cross-checked between HTML and JS).

- A1: greetings, numbers & age, family
- A2: daily routine, past simple, shopping
- B1: present perfect, future plans (going to/will), comparatives & superlatives
- B2: modals of deduction, passive voice, reported speech
- C1: mixed conditionals, phrasal verbs & collocations, advanced connectors & cohesion
- C2: inversion & emphatic structures, nuanced idioms & register, subtle academic discourse

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

- 🔊 Pronunciation playback via the browser's free SpeechSynthesis API
- New "listen" exercise type (hear a phrase, type what you heard)
- Exercises and multiple-choice options shuffle on every attempt, so replaying a
  skill doesn't mean memorizing answer positions
- Scores are kept as "best attempt" — a weaker retry doesn't erase a earlier pass
- Wrong answers are listed for review on the results screen
- Switching ES/EN now refreshes whatever screen is currently open, not just the level map

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
