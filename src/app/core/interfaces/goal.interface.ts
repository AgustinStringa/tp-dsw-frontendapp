import { IUser } from './user.interface';

export interface IGoal {
  createdAt: Date;
  fatPercentage: number;
  bodyMeasurements: string;
  done: boolean;
  client: IUser;
}
