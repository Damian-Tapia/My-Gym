/** Top bar; compact by default, or iOS large-title style. */
export interface NavBarProps {
  title: string;
  /** Only shown in large mode. */
  subtitle?: string;
  onBack?: () => void;
  /** Node pinned right — usually an IconButton. */
  action?: React.ReactNode;
  /** Large-title layout for a screen's root view. */
  large?: boolean;
  style?: React.CSSProperties;
}
export declare function NavBar(props: NavBarProps): JSX.Element;
