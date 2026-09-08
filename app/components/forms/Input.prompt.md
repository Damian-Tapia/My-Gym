One-line text field with optional label, leading icon and trailing unit; use for any free text or numeric entry that isn't a set count.

```jsx
<Input label="Peso corporal" value="72" suffix="kg" icon="user" hint="Se usa para estimar calorías" />
```

Pass `error` to show a red border and message. For rep/weight adjustment during a set, use `Stepper` instead — it is thumb-friendly mid-workout.
