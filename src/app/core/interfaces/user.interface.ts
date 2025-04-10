export interface IUser {
  id: string;
  lastName: string;
  firstName: string;
  dni: string;
  email: string;
  userType?: 'client' | 'trainer';
  password?: string;
}
