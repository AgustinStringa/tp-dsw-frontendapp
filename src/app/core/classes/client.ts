import { IMembership } from '../interfaces/membership.interface';
import { IUser } from '../interfaces/user.interface';

export default class Client implements IUser {
  id: string;
  lastName: string;
  firstName: string;
  dni: string;
  email: string;
  currentMembership: IMembership;

  constructor(
    id: string,
    lastName: string,
    firstName: string,
    dni: string,
    email: string,
    currentMembership: IMembership
  ) {
    this.id = id;
    this.lastName = lastName;
    this.firstName = firstName;
    this.dni = dni;
    this.email = email;
    this.currentMembership = currentMembership;
  }
}
