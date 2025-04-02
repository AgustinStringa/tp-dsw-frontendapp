import { IExerciseRoutine } from './exercise-routine.inteface.js';
import { IUser } from './user.interface.js';

export interface IRoutine {
  id: number;
  start: Date;
  end: Date;
  exercisesRoutine: IExerciseRoutine[];
  trainer: IUser;
}
