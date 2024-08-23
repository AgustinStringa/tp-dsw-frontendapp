export interface Class {
  id: string;
  day: number;
  startTime: string;
  endTime: string;
  maxCapacity: number;
  location: string;
  active: boolean;
  classType: string;
  trainer: string;
}

export interface ClassType {
  id: string;
  name: string;
  description: string;
  classes: Class[];
}
