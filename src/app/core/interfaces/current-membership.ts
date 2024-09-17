import { MembershipType } from './membership-type.js';
import User from './user.interface.js';

export interface CurrentMembership {
  dateFrom: Date;
  dateTo: Date;
  type: MembershipType;
  client: User;
  //payment
}
