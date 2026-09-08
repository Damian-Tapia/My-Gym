/** Pill-shaped filter or multi-select chip — used heavily for machine and muscle-group pickers. */
export interface TagProps {
  children?: React.ReactNode;
  icon?: string;
  selected?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function Tag(props: TagProps): JSX.Element;
