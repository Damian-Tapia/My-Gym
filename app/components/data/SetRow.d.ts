/** One logged set inside an exercise: index, weight, reps and a done tick. */
export interface SetRowProps {
  index: number;
  weight: number | string;
  reps: number | string;
  unit?: string;
  done?: boolean;
  /** Currently-in-progress set; gets the amber-soft treatment. */
  active?: boolean;
  onToggle?: () => void;
  style?: React.CSSProperties;
}
export declare function SetRow(props: SetRowProps): JSX.Element;
