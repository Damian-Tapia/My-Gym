/** Bottom tab bar — the app's root navigation. */
export interface TabBarProps {
  tabs?: Array<{ id: string; icon: string; label: string }>;
  value?: string;
  onChange?: (id: string) => void;
  style?: React.CSSProperties;
}
export declare function TabBar(props: TabBarProps): JSX.Element;
