import { IMembershipType } from './membership-type.interface';
import { IUser } from './user.interface';

export interface IMembership {
  dateFrom: Date;
  dateTo: Date;
  type: IMembershipType;
  client: IUser;
  //payment
}
