import React from 'react';
import { IconButton } from '../core/IconButton';

export interface StepperProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  size?: 'md' | 'lg';
  onChange?: (value: number) => void;
  style?: React.CSSProperties;
}

export function Stepper({
  value = 0,
  min = 0,
  max = 999,
  step = 1,
  unit,
  size = 'md',
  onChange,
  style,
  ...rest
}: StepperProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof StepperProps>) {
  const set = (n: number) => onChange && onChange(Math.min(max, Math.max(min, n)));
  const big = size === 'lg';
  return (
    <div {...rest} style={{ display: 'inline-flex', alignItems: 'center', gap: big ? 16 : 10, ...style }}>
      <IconButton icon="minus" label="Restar" variant="solid" size={big ? 'lg' : 'md'} disabled={value <= min} onClick={() => set(value - step)} />
      <span style={{
        minWidth: big ? 96 : 64, textAlign: 'center', font: 'var(--text-metric)',
        fontSize: big ? 'var(--fs-metric-xl)' : 'var(--fs-metric)', color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums',
      }}>
        {value}{unit ? <span style={{ fontSize: big ? 20 : 13, color: 'var(--text-muted)', marginLeft: 4 }}>{unit}</span> : null}
      </span>
      <IconButton icon="plus" label="Sumar" variant="solid" size={big ? 'lg' : 'md'} disabled={value >= max} onClick={() => set(value + step)} />
    </div>
  );
}
