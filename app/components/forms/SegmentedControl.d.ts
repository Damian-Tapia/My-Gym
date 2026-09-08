/** Two-to-four mutually exclusive filters, iOS-style. */
export interface SegmentedControlProps {
  /** Strings, or { value, label } pairs. */
  options?: Array<string | { value: string; label: string }>;
  value?: string;
  onChange?: (value: string) => void;
  fullWidth?: boolean;
  style?: React.CSSProperties;
}
export declare function SegmentedControl(props: SegmentedControlProps): JSX.Element;
