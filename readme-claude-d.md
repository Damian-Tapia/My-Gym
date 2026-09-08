# MyGym Design System

MyGym is a free iOS and Android app for people who train without a coach and can't pay for a gym plan. You tell it which machines your gym actually has, it builds a routine around them, and you log your sets as you go. The AI assistant suggests — it never nags.

The system here covers one product surface: the **mobile app**. There is no marketing site, no dashboard, no slide template, because none were supplied.

## Sources

- **GitHub — https://github.com/Damian-Tapia/My-Gym** (attached as the source of truth). The repository is **empty**: no tree, README, or source is returned on `main` or `master`. Nothing in this design system is derived from it. Explore it once code is pushed — rebuilding the UI kit from real components will always beat what is here.
- Two neighbouring repositories on the same account were visible but not used: https://github.com/Damian-Tapia/Sports-app (Next.js + Tailwind, sports news) and https://github.com/Damian-Tapia/Sports (private). Neither is a gym tracker.
- Everything below was authored from the product brief and a direction form answered by the owner: dark gym-floor aesthetic, amber accent `#FF9F1C`, Spanish-first copy, iOS-leaning, quiet-assistant AI tone.

**This is therefore an original system, not a recreation.** Treat every value as a proposal open to correction, not as documentation of shipped design.

---

## Index

| Path | What it is |
| --- | --- |
| `styles.css` | Global entry point — `@import`s every token file. Link this one file. |
| `tokens/` | `colors.css`, `typography.css`, `spacing.css`, `radius.css`, `elevation.css`, `motion.css`, `fonts.css` |
| `components/core/` | Button, IconButton, Icon, Card, Badge, Tag |
| `components/forms/` | Input, Stepper, Switch, SegmentedControl, OptionRow |
| `components/data/` | StatTile, ProgressBar, ListRow, SetRow, ExerciseCard |
| `components/navigation/` | NavBar, TabBar, StepDots |
| `components/feedback/` | AICallout, RestTimer, EmptyState, Sheet |
| `ui_kits/app/` | Click-through recreation of the mobile app — open `index.html` |
| `guidelines/` | Foundation specimen cards (colors, type, spacing, brand) |
| `assets/icons/` | 28 Lucide SVGs, the app's full icon set |
| `SKILL.md` | Agent Skills wrapper for use in Claude Code |

### Components

Every component is a named export; consumers reach them on the compiled namespace.

**Core** — `Button`, `IconButton`, `Icon`, `Card`, `Badge`, `Tag`
**Forms** — `Input`, `Stepper`, `Switch`, `SegmentedControl`, `OptionRow`
**Data** — `StatTile`, `ProgressBar`, `ListRow`, `SetRow`, `ExerciseCard`
**Navigation** — `NavBar`, `TabBar`, `StepDots`
**Feedback** — `AICallout`, `RestTimer`, `EmptyState`, `Sheet`

#### Intentional additions

No source defined a component inventory, so the set above was authored from scratch against the app's real jobs. Four of them are product-specific rather than generic primitives, and exist because the app cannot be built without them:

- `Stepper` — weight and rep entry mid-set; a text input is unusable with chalk on your hands.
- `SetRow` / `ExerciseCard` — the two units a routine is made of.
- `RestTimer` — the between-sets countdown.
- `AICallout` — the one place the assistant is allowed to speak.
- `Icon` — a thin wrapper that masks the Lucide SVGs so they take `currentColor`.

Deliberately absent: Toast, Tooltip, Avatar, Tabs, Dialog, Accordion. Nothing in the app needs them. Anything that would be a modal dialog is a `Sheet`.

---

## Content fundamentals

**Language.** Spanish first, neutral Latin American — not peninsular. `tú`, never `usted`, never `vos`. English strings exist only as a translation layer; if you write English, keep the same register (second person, short, no exclamation marks).

**Person.** The app addresses the user directly as `tú` and refers to itself in the first person plural only when describing what it will do: *"Dinos qué hay en tu gimnasio y armamos un plan."* It never says *"MyGym te recomienda"* — the product does not name itself in body copy.

**Casing.** Sentence case for everything: headings, buttons, list rows. The only uppercase is the 11px mono micro-label (`RACHA`, `SERIE 2 · PESO`), and that is a typographic device, not emphasis. No Title Case Buttons.

**Length.** Headings under six words. Body sentences under twenty. Buttons are one or two words plus an optional number: `Empezar`, `Continuar`, `Generar rutina · 3`.

**The AI voice.** Observation, then suggestion, then stop. Always optional, always dismissible.

> Llevas 3 semanas con el mismo peso en press de banca. Puedes subir a 42.5 kg.

> La banca está ocupada casi siempre a esta hora. Puedes hacer press con mancuernas y mantener el mismo estímulo.

Note what is missing: no *"¡Vamos!"*, no streak-shaming, no *"¿Sabías que…?"*. `Puedes` and `prueba` are the recommendation verbs. Never `debes` or `tienes que`.

**Numbers are never dressed up.** `4 × 10`, `42.5 kg`, `18.4 toneladas`, `12 días`. No "¡3 récords nuevos!" — the number carries the feeling.

**Empty states state the fact and offer one exit.** *"Sin rutinas todavía. Escanea las máquinas de tu gimnasio y te armamos una."*

**Emoji: never.** Not in UI, not in notifications, not in empty states. The icon set covers everything emoji would be used for, and emoji read as a paid-app growth tactic — exactly what this product is positioned against.

---

## Visual foundations

**The core idea.** A gym at night: near-black rubber floor, one hot amber light, chrome numbers. Every screen is dark; amber appears once per screen and means *the thing to do next*.

**Color.** Four near-black surfaces (`#0B0B0C` app → `#121214` sheet → `#17171A` card → `#1E1E22` raised), a single amber ramp anchored at `#FF9F1C`, and three semantic hues (green `#3ED598`, red `#FF4D4D`, blue `#4DA3FF`) each paired with a 14%-alpha background. There is no second brand color and no gradient anywhere — not in backgrounds, not in buttons, not behind cards. Amber at 12% alpha (`--surface-accent-soft`) is the only tint used as a fill.

**Type.** Bricolage Grotesque (700–800, tracking −0.03em) for anything display-scale; Archivo for all UI text; IBM Plex Mono with `tabular-nums` for every number the user tracks. That third rule is the strongest one in the system: weights, reps, streaks, volume, and timers are always mono, so columns of sets line up and a changing digit doesn't shift the layout.

**Spacing.** 20px screen gutters, 16px card padding, 12px between stacked cards, 28px between sections. Tap targets never below 44px.

**Corners.** 12px on controls, 16px on cards, 28px on the top corners of sheets, full pill on chips and progress tracks. Nothing is square except the 4px badge.

**Backgrounds.** Flat color only. No photography, no illustration, no pattern, no texture, no grain — partly a brand decision (the numbers are the content) and partly honest: no imagery was supplied. Where a product photo or exercise video belongs, the UI kit leaves an explicit dashed placeholder rather than inventing one.

**Depth.** On a near-black app, grey drop shadows turn into smudge. Depth comes from a 1px hairline (`#1E1E22` subtle, `#2E2E36` default) plus a very dark, very diffuse shadow (`0 8px 24px -12px rgba(0,0,0,0.9)`). The one glow in the system is amber, under the primary button only: `0 6px 24px -8px rgba(255,159,28,0.55)`.

**Transparency and blur.** Exactly two places: the top nav and the bottom tab bar, both `rgba(11,11,12,0.86)` with `blur(16px)`, so content scrolls under them. Sheet scrims are `rgba(0,0,0,0.66)` with a 2px blur. Nothing else is translucent — no frosted cards.

**Cards.** `#17171A` fill, 1px `#1E1E22` hairline, 16px radius, 16px padding, the diffuse shadow. Selected cards swap the hairline for amber and the fill for amber-12%. Never a colored left border.

**Motion.** Fast and flat. 80ms for press feedback, 140ms for color changes, 220ms for toggles and bars, 380ms for a sheet. Easing is `cubic-bezier(0.32,0.72,0,1)` standard and `cubic-bezier(0.16,1,0.3,1)` on the way out. No bounce, no spring overshoot, no attention-seeking loops.

**Press states.** `transform: scale(0.97)` plus the loss of the amber glow — that is the whole feedback vocabulary for touch. **Hover** barely exists (this is a phone app); where a pointer is present, surfaces step one level lighter (`--surface-hover`). **Focus** is a 3px amber ring at 35%, never a browser outline.

**Disabled** is `opacity: 0.4` with the fill intact — never a grey fill swap.

**Layout rules.** Every screen is a fixed 390 × 844 column: a fixed nav, one scrolling region, and a fixed bottom element (tab bar, or a CTA footer during a flow). Content never scrolls under the notch or over the home indicator. Only one primary amber button is visible at a time.

---

## Iconography

**Lucide**, 24px grid, 1.5px stroke, round caps — copied into `assets/icons/` as 28 individual SVGs, not linked from a CDN. Chosen for the same reason the type is: an open, neutral, free set with a stroke weight light enough not to compete with amber.

Icons are rendered through the `Icon` component, which applies the SVG as a CSS mask and fills it with `backgroundColor`. That means an icon takes `currentColor` or any token, and one file serves every color state. Set `window.MYGYM_ICON_BASE` (or the `base` prop) to the path of `assets/icons/` from wherever you're rendering.

Sizes: `xs` 14, `sm` 16, `md` 20, `lg` 24, `xl` 32. In a row of text, icons sit at the text's optical size, never larger.

The set, and what each is for:

`dumbbell` exercises and equipment · `flame` streak · `timer` rest · `sparkles` **AI, and only AI** · `scan-line` / `camera` machine scanning · `trophy` records · `trending-up` deltas · `chart-no-axes-column` progress tab · `list-checks` routines tab · `house` today tab · `user` profile tab · `calendar` history · `bell` reminders · `settings` preferences · `play` / `pause` / `repeat` workout transport · `plus` / `minus` steppers · `check` / `circle-check-big` completion · `chevron-left` / `chevron-right` navigation · `search` · `info` · `triangle-alert` · `x` dismiss.

`sparkles` is reserved. If it appears, the content came from the assistant.

**No emoji, ever.** No unicode glyphs standing in for icons (no `→`, `✓`, `•` as UI elements). No icon font. No decorative or spot illustration — the system has none, and inventing one would be a guess.

**Logo: none exists.** No logo file was supplied, and none has been drawn. Wherever a mark belongs, the wordmark is set in type: Bricolage Grotesque 800 at −0.04em, `My` in `--text-primary` and `Gym` in amber, or the whole word knocked out of an amber block. See the Wordmark card in `guidelines/`. **Send a real logo and this should be replaced.**

---

## Fonts — substitution notice

No font files were supplied. All three families are Google Fonts, loaded from the Google CSS API in `tokens/fonts.css`:

| Role | Family | Why |
| --- | --- | --- |
| Display | Bricolage Grotesque | Tight, slightly odd grotesque with real weight at 800 — sport energy without a condensed-poster cliché |
| UI | Archivo | Neutral, high x-height, excellent at 13–17px on dark |
| Numerals | IBM Plex Mono | Tabular by default, unambiguous digits |

**If MyGym has licensed brand fonts, send them.** Swap the `@import` in `tokens/fonts.css` for self-hosted `@font-face` rules and the rest of the system follows automatically.
