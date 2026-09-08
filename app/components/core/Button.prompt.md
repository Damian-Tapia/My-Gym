The main action control — one `primary` button per screen, everything else secondary or ghost.

```jsx
<Button variant="primary" size="lg" fullWidth icon="play">Empezar rutina</Button>
<Button variant="secondary" icon="repeat">Cambiar</Button>
```

Variants: primary (amber, glows), secondary (raised + hairline), ghost, outline, danger. Sizes sm 36 / md 44 / lg 54 — never below 44px for a real tap target on mobile. Presses scale to 0.97.
