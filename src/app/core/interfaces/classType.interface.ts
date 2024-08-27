import { User } from './user.interface.js';
import { Class } from './class.interface.js';

export interface ClassType {
  id: string;
  name: string;
  description: string;
  classes: Class[];
}
