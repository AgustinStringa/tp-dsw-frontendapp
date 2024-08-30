import CurrentMembership from './currentMembership.interface.js';

export default class Client {
  id: string;
  lastName: string;
  firstName: string;
  dni: string;
  email: string;
  memberships: CurrentMembership[];

  constructor(
    id: string,
    lastName: string,
    firstName: string,
    dni: string,
    email: string,
    memberships: CurrentMembership[]
  ) {
    this.id = id;
    this.lastName = lastName;
    this.firstName = firstName;
    this.dni = dni;
    this.email = email;
    this.memberships = memberships;
  }

  getCurrentMembership() {
    const arrayMemberships = Array.from(this.memberships).sort((a, b) => {
      if (a.dateTo != null && b.dateTo != null) {
        if (a.dateTo > b.dateTo) {
          return 1;
        }
        if (a.dateTo < b.dateTo) {
          return -1;
        }
        return 0;
      } else {
        return 0;
      }
    });
    return arrayMemberships[0];
  }
}
