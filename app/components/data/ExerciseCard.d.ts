/**
 * An exercise inside a routine: name, machine, prescribed sets × reps.
 * @startingPoint section="Data" subtitle="Exercise cards in a routine" viewport="700x260"
 */
export interface ExerciseCardProps {
  name: string;
  /** Machine or equipment this uses, as detected in the user's gym. */
  machine?: string;
  sets?: number | string;
  reps?: number | string;
  /** Short plain-language note from the AI assistant. */
  note?: string;
  status?: 'todo' | 'active' | 'done';
  /** Shows the amber "IA" badge. */
  aiSuggested?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function ExerciseCard(props: ExerciseCardProps): JSX.Element;
