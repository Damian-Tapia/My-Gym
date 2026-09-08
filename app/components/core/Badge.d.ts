/** Small uppercase status marker — counts, states, "IA" labels. */
export interface BadgeProps {
  children?: React.ReactNode;
  tone?: 'neutral' | 'accent' | 'success' | 'danger' | 'info';
  icon?: string;
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}
export declare function Badge(props: BadgeProps): JSX.Element;
