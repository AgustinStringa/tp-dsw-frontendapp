import { IExercise } from './exercise.interface';

export interface IExerciseRoutine {
  exercise: IExercise | null;
  series: number;
  reps: number;
  internalIndex?: number;
  day: number;
  week: number;
  weight?: number;
}
