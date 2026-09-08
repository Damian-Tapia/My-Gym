/** Binary toggle for settings and opt-ins. */
export interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  style?: React.CSSProperties;
}
export declare function Switch(props: SwitchProps): JSX.Element;
