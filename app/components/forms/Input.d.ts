/** Single-line text field used across onboarding and logging forms. */
export interface InputProps {
  label?: string;
  value?: string | number;
  placeholder?: string;
  /** Helper text below the field. */
  hint?: string;
  /** Error message; replaces hint and turns the border red. */
  error?: string;
  /** Icon name rendered inside the field, before the text. */
  icon?: string;
  /** Static trailing unit, e.g. "kg". */
  suffix?: string;
  type?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}
export declare function Input(props: InputProps): JSX.Element;
