import IExercise from './IExercise.interface.js';
import IExerciseRoutine from './IExerciseRoutine.inteface.js';
import ITrainer from './ITrainer.interface.js';

export default interface IRoutine {
  id: number;
  start: Date;
  end: Date;
  exercisesRoutine: IExerciseRoutine[];
  trainer: ITrainer;
}
