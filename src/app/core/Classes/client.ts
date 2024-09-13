import CurrentMembership from '../interfaces/ICurrentMembership.interface.js';

export default class Client {
  id: string;
  lastName: string;
  firstName: string;
  dni: string;
  email: string;
  currentMembership: CurrentMembership;

  constructor(
    id: string,
    lastName: string,
    firstName: string,
    dni: string,
    email: string,
    currentMembership: CurrentMembership
  ) {
    this.id = id;
    this.lastName = lastName;
    this.firstName = firstName;
    this.dni = dni;
    this.email = email;
    this.currentMembership = currentMembership;
  }
}
