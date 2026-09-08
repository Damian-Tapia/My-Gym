/**
 * The assistant's voice in the UI — a suggestion the user can take or ignore.
 * @startingPoint section="Feedback" subtitle="AI suggestion callout" viewport="700x180"
 */
export interface AICalloutProps {
  children?: React.ReactNode;
  /** Micro label; defaults to "Sugerencia". */
  title?: string;
  /** Text of the single inline action link. */
  action?: string;
  onAction?: () => void;
  /** Providing this shows a dismiss ×. */
  onDismiss?: () => void;
  style?: React.CSSProperties;
}
export declare function AICallout(props: AICalloutProps): JSX.Element;
