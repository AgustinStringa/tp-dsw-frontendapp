import { IUser } from './user.interface';

export interface IGoal {
  id: string;
  createdAt: Date;
  done: boolean;
  bodyMeasurements: string;
  fatPercentage: number;
  client: IUser;
}
