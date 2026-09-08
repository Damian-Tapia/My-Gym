Inset iOS-style segmented picker for switching a view's scope (week/month, kg/lb).

```jsx
<SegmentedControl options={['Semana','Mes','Año']} value={range} onChange={setRange} />
```

Cap at four segments; beyond that use `Tag` chips in a scrolling row.
