/**
 * Primary action control.
 * @startingPoint section="Core" subtitle="Button variants, sizes and states" viewport="700x220"
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** primary = the single amber CTA per screen. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  /** Lucide icon name shown before the label. */
  icon?: string;
  /** Lucide icon name shown after the label. */
  iconRight?: string;
  fullWidth?: boolean;
  pill?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;
