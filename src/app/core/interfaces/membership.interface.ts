import { IMembershipType } from './membership-type.interface';
import { IUser } from './user.interface';

export interface IMembership {
  id?: string; //no se que paso cuando hice el merge y le tuve que poner el signo
  dateFrom: Date;
  dateTo: Date;
  type: IMembershipType;
  client: IUser;
  //payment
}
