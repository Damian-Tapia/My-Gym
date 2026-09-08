Renders a Lucide glyph tinted with currentColor — use it for every icon in My-Gym rather than inlining SVG.

```jsx
<Icon name="dumbbell" size="lg" />
<Icon name="flame" color="var(--amber-500)" />
```

Sizes: xs 14 / sm 16 / md 20 / lg 24 / xl 32, or pass a number. Icon files live in `assets/icons/`; set `window.MYGYM_ICON_BASE` once per page so the relative path resolves.
