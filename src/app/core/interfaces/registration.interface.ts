import { IClass } from './class.interface';
import { IUser } from './user.interface';

export interface IRegistration {
  id: string;
  class: IClass;
  client: IUser;
}
