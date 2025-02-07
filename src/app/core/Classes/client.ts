import { IGoal } from '../interfaces/goal.interface.js';
import { IMembership } from '../interfaces/membership.interface';
import { IProgress } from '../interfaces/progress.interface.js';

export default class Client {
  id: string;
  lastName: string;
  firstName: string;
  dni: string;
  email: string;
  currentMembership: IMembership;
  goals: IGoal[];
  progresses: IProgress[];

  constructor(
    id: string,
    lastName: string,
    firstName: string,
    dni: string,
    email: string,
    currentMembership: IMembership,
    goals: IGoal[] = [],
    progresses: IProgress[] = []
  ) {
    this.id = id;
    this.lastName = lastName;
    this.firstName = firstName;
    this.dni = dni;
    this.email = email;
    this.currentMembership = currentMembership;
    this.goals = goals;
    this.progresses = progresses;
  }
}
