/** Hairline-separated list row for settings, history and exercise lists. */
export interface ListRowProps {
  title: string;
  subtitle?: string;
  /** Node on the left — icon, thumbnail or index number. */
  leading?: React.ReactNode;
  /** Node on the right — Switch, Badge or value text. */
  trailing?: React.ReactNode;
  chevron?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function ListRow(props: ListRowProps): JSX.Element;
