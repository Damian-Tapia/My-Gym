/**
 * Full-width selectable row — the checkbox/radio pattern used all through onboarding.
 * @startingPoint section="Forms" subtitle="Selectable rows for onboarding choices" viewport="700x240"
 */
export interface OptionRowProps {
  title: string;
  subtitle?: string;
  icon?: string;
  selected?: boolean;
  /** Square indicator (checkbox) instead of round (radio). */
  multi?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function OptionRow(props: OptionRowProps): JSX.Element;
