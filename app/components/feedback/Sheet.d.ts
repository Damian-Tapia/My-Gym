/** Bottom sheet for secondary tasks; slides up over the current screen. */
export interface SheetProps {
  children?: React.ReactNode;
  title?: string;
  open?: boolean;
  /** Called when the scrim is tapped. */
  onClose?: () => void;
  style?: React.CSSProperties;
}
export declare function Sheet(props: SheetProps): JSX.Element;
