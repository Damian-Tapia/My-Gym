/** Horizontal completion bar for routines, sets and weekly goals. */
export interface ProgressBarProps {
  value?: number;
  max?: number;
  label?: string;
  /** Show "value/max" on the right of the label row. */
  showValue?: boolean;
  tone?: 'accent' | 'success';
  height?: number;
  style?: React.CSSProperties;
}
export declare function ProgressBar(props: ProgressBarProps): JSX.Element;
