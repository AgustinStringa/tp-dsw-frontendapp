import IExercise from './IExercise.interface.js';
export default interface IExerciseRoutine {
  exercise: IExercise | null;
  series: number;
  reps: number;
  internalIndex?: number;
  day: number;
  week: number;
  weight?: number;
}
