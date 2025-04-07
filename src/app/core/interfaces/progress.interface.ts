import { IUser } from './user.interface';

export interface IProgress {
  id: string;
  date: Date;
  weight: number;
  fatPercentage: number;
  bodyMeasurements: string;
  client: IUser;
}
