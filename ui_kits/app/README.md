# MyGym — mobile app UI kit

A click-through recreation of the MyGym iOS app in a 390 × 844 frame. Open `index.html`.

The left phone is interactive and runs the real flow:

1. **Onboarding** — welcome → objetivo → máquinas de tu gimnasio (with a camera-scan affordance) → días por semana. `OnboardingScreens.jsx`
2. **Hoy** — today's AI-built routine, week stats, exercise list, gym equipment chips. `HomeScreen.jsx`
3. **Entrenamiento activo** — big weight stepper, set rows, rest timer, exercise-info sheet. `WorkoutScreen.jsx`
4. **Rutinas / Progreso / Perfil** — the other three tabs. `HomeScreen.jsx`, `ProfileScreen.jsx`

Every screen composes the published components; nothing is re-implemented locally except `PhoneFrame`, which is device chrome, not product UI.

## Known placeholders

- The exercise-demo video area in the workout sheet is an explicit dashed placeholder — no product imagery was supplied.
- The camera scan flow stops at the entry point; the scanner screen itself was not specified.
