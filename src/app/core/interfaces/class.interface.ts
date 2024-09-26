import { IClassType } from './class-type.interface';
import { IUser } from './user.interface';

export interface IClass {
  id: string;
  day: number;
  startTime: string;
  endTime: string;
  maxCapacity: number;
  location: string;
  active: boolean;
  classType: IClassType;
  trainer: IUser;
}
