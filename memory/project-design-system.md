---
name: project-design-system
description: MyGym design system — tokens, component API, visual language, language (Spanish UI)
metadata:
  type: project
---

## Visual identity

Dark-first native-feeling gym app. Near-black backgrounds, amber (#FF9F1C) as the single brand accent. No light mode defined — committed dark.

**Surfaces** (darkest → lightest):
- `--surface-app` = #0B0B0C (root background)
- `--surface-sheet` = #121214
- `--surface-card` = #17171A
- `--surface-raised` = #1E1E22
- `--surface-input` = #17171A

**Accent:** amber-500 `#FF9F1C` — buttons, active states, glows, text-accent. One CTA per screen uses `variant="primary"`.

**Text roles:** `--text-primary` (off-white), `--text-secondary`, `--text-muted`, `--text-disabled`, `--text-accent` (amber), `--text-success` (green), `--text-danger` (red).

## Typography

- Display: **Bricolage Grotesque** (fw-black, -0.03em tracking)
- Body/UI: **Archivo** (regular/medium/semibold)
- Mono/metrics: **IBM Plex Mono** (metric values, labels)
- Scale: display 44px → h1 32 → h2 24 → h3 20 → body-lg 17 → body 15 → caption 13 → micro 11
- Metric sizes: xl 56px, regular 28px (used for stat tiles)

## Spacing / layout

- `--gutter-screen: 20px` — horizontal page padding
- `--card-padding: 16px`, `--sheet-padding: 20px`
- `--nav-height: 56px`, `--tabbar-height: 64px`
- `--tap-min: 44px` — minimum touch target

## Radius

- Cards: `--radius-lg` (16px) via `--radius-card`
- Sheets/modals: `--radius-2xl` (28px) via `--radius-sheet`
- Controls (inputs, buttons): `--radius-md` (12px)
- Pills/chips: `--radius-pill` (999px)

## Elevation / shadows

Dark glass style — hairlines and glow, not soft grey drops:
- `--shadow-card`: subtle top-inner highlight + deep bottom shadow
- `--shadow-accent-glow`: amber glow (`0 6px 24px -8px rgba(255,159,28,0.55)`)
- `--shadow-focus`: amber focus ring

## Motion

- Durations: instant 80ms → fast 140ms → base 220ms → slow 320ms → sheet 380ms
- Easing: `--ease-standard` (spring-ish), `--ease-out` (entries), `--ease-in` (exits)
- Press: scale 0.97

## Component library (`window.MyGymDesignSystem_8243f3`)

Loaded from `app/_ds_bundle.js`. Components accessed as named exports.

**Core:** `Button`, `IconButton`, `Card`, `Badge`, `Tag`, `Icon`
- Button variants: `primary` (amber CTA), `secondary`, `ghost`, `outline`, `danger`
- Button sizes: `sm`, `md`, `lg`; supports `pill`, `icon`, `iconRight`, `fullWidth`
- Card variants: `default`, `raised`, `accent`, `outline`; padding: `none`/`sm`/`md`/`lg`; `interactive`

**Navigation:** `NavBar`, `TabBar`, `StepDots`
- NavBar: `title`, `subtitle` (large mode), `onBack`, `action` node, `large` (iOS-style large title)
- TabBar: tabs array `{id, icon, label}`, `value`, `onChange`

**Data:** `ExerciseCard`, `ListRow`, `ProgressBar`, `SetRow`, `StatTile`
- ExerciseCard: `name`, `machine`, `sets`, `reps`, `note`, `status` (todo/active/done), `aiSuggested`
- StatTile: `label`, `value`, `unit`, `icon`, `delta`, `deltaTone` (success/danger)

**Forms:** `Input`, `OptionRow`, `SegmentedControl`, `Stepper`, `Switch`

**Feedback:** `AICallout`, `EmptyState`, `RestTimer`, `Sheet`
- AICallout: `title` (default "Sugerencia"), `action`, `onAction`, `onDismiss`

## Language

UI copy is **Spanish**. Exercise names, labels, and copy all in Spanish (e.g. "Empezar", "Hoy", "Progreso", "Entrenamiento activo").

## App screens

Defined in `app/ui_kits/app/`: OnboardingScreens, HomeScreen, WorkoutScreen, ProfileScreen (+ ProgressScreen, RoutinesScreen).

**Why:** The design was imported from Claude Design as a full token + component system. It's the authoritative source of truth for visual decisions.
**How to apply:** Use these tokens directly in CSS/inline styles. Don't invent new colors or spacing — reference tokens. When adding screens, follow the same dark surface hierarchy. One amber CTA per screen. Spanish copy.
