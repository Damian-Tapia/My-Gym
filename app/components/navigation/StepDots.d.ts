/** Progress dots for the onboarding flow; the current step stretches into a bar. */
export interface StepDotsProps {
  count?: number;
  /** Zero-based current step. */
  index?: number;
  style?: React.CSSProperties;
}
export declare function StepDots(props: StepDotsProps): JSX.Element;
