import IExercise from './IExercise.interface.js';
export default interface IExerciseRoutine {
  id?: string;
  exercise: IExercise | null;
  series: number | null;
  repetitions: number | null;
  internalIndex?: number | null;
  day: number | null;
  week: number | null;
  weight?: number | null;
}
