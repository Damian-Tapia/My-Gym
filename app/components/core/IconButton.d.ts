/** Square icon-only control for toolbars, headers and set steppers. */
export interface IconButtonProps {
  /** Lucide icon name. */
  icon: string;
  /** Accessible label — required, the button has no visible text. */
  label: string;
  variant?: 'ghost' | 'solid' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
