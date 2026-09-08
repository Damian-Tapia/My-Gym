/**
 * Compact metric tile — the building block of the progress grid.
 * @startingPoint section="Data" subtitle="Metric tiles with delta" viewport="700x170"
 */
export interface StatTileProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: string;
  /** Change note, e.g. "+2.5 kg vs. semana pasada". */
  delta?: string;
  deltaTone?: 'success' | 'danger';
  style?: React.CSSProperties;
}
export declare function StatTile(props: StatTileProps): JSX.Element;
