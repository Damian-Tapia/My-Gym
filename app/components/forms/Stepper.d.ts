/**
 * Thumb-sized numeric stepper for reps, weight and sets during a workout.
 * @startingPoint section="Forms" subtitle="Numeric stepper for reps and weight" viewport="700x180"
 */
export interface StepperProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  /** Unit suffix rendered small beside the number, e.g. "kg". */
  unit?: string;
  size?: 'md' | 'lg';
  onChange?: (value: number) => void;
  style?: React.CSSProperties;
}
export declare function Stepper(props: StepperProps): JSX.Element;
