import { CurrentMembership } from './current-membership.js';

export interface MembershipType {
  name: string;
  description: string;
  price: number;
  memberships: CurrentMembership[];
}
