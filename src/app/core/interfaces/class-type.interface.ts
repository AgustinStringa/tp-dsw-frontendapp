import { IClass } from './class.interface';

export interface IClassType {
  id: string;
  name: string;
  description: string;
  classes: IClass[];
}
