/** Placeholder for a list or screen with nothing in it yet. */
export interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  /** Label for the single secondary button. */
  action?: string;
  onAction?: () => void;
  style?: React.CSSProperties;
}
export declare function EmptyState(props: EmptyStateProps): JSX.Element;
