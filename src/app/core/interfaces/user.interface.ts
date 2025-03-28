export interface IUser {
  id: string;
  lastName: string;
  firstName: string;
  dni: string;
  email: string;
  entity?: 'client' | 'trainer';
}
