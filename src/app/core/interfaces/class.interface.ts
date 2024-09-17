import { ClassType } from './classType.interface.js';
import User from './user.interface.js';

export interface Class {
  id: string;
  day: number;
  startTime: string;
  endTime: string;
  maxCapacity: number;
  location: string;
  active: boolean;
  classType: ClassType;
  trainer: User;
}
