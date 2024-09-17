import MembershipType from './IMembershipType.interface.js';

export default interface ICurrentMembership {
  dateFrom: Date;
  dateTo: Date;
  type: MembershipType;
}
