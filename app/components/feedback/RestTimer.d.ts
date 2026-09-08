/** Between-sets countdown, docked above the tab bar during a workout. */
export interface RestTimerProps {
  /** Total rest length in seconds. */
  seconds?: number;
  /** Seconds left; drives the bar. */
  remaining?: number;
  running?: boolean;
  onToggle?: () => void;
  /** Providing this shows the "Saltar" link. */
  onSkip?: () => void;
  style?: React.CSSProperties;
}
export declare function RestTimer(props: RestTimerProps): JSX.Element;
