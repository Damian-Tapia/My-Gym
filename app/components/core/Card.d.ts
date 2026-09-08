/**
 * Surface container for grouped content.
 * @startingPoint section="Core" subtitle="Card surfaces and padding scale" viewport="700x220"
 */
export interface CardProps {
  children?: React.ReactNode;
  variant?: 'default' | 'raised' | 'accent' | 'outline';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function Card(props: CardProps): JSX.Element;
