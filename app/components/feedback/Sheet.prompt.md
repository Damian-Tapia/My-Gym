Bottom sheet with grab handle and scrim. Its parent must be `position: relative` — it fills the phone frame, not the page.

```jsx
<Sheet open={open} title="Editar serie" onClose={close}><Stepper value={40} unit="kg" /></Sheet>
```

Modal dialogs are not part of this system; anything that would be a dialog is a sheet.
