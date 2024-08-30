import MembershipType from './membershipType.interface.js';

export default interface CurrentMembership {
  dateFrom: Date;
  dateTo: Date;
  type: MembershipType;
}
