import { IUser } from './user.interface';

export interface IProgress {
  date: Date;
  weight: number;
  fatPercentage: number;
  bodyMeasurements: string;
  client: IUser;
}
