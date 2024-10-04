import { IMembershipType } from './membership-type.interface';
import { IUser } from './user.interface';

export interface IMembership {
  id: string;
  dateFrom: Date;
  dateTo: Date;
  type: IMembershipType;
  client: IUser;
  //payment
}
