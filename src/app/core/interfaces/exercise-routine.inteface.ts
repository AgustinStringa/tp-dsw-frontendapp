import { IExercise } from './exercise.interface';

export interface IExerciseRoutine {
  id?: string;
  internalIndex?: number;
  exercise: IExercise;
  series: number;
  repetitions: number;
  week: number;
  day: number;
  weight?: number;
}
