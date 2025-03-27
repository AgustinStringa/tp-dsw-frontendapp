import { IExerciseRoutine } from './exercise-routine.inteface.js';
import { ITrainer } from './trainer.interface.js';

export interface IRoutine {
  id: number;
  start: Date;
  end: Date;
  exercisesRoutine: IExerciseRoutine[];
  trainer: ITrainer;
}
