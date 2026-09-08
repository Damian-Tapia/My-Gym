/**
 * Lucide glyph rendered as a currentColor-tinted mask. My-Gym's only icon system.
 */
export interface IconProps {
  /** Lucide icon file name without extension, e.g. "dumbbell". */
  name: string;
  /** Preset key or explicit pixel size. */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  /** CSS color; defaults to currentColor so it inherits from text. */
  color?: string;
  /** Override the assets/icons/ base path (or set window.MYGYM_ICON_BASE). */
  base?: string;
  style?: React.CSSProperties;
}
export declare function Icon(props: IconProps): JSX.Element;
