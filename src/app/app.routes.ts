import { Routes } from '@angular/router';
import { ClassListComponent } from './pages/Class-Registration/class-list/class-list.component.js';
import { ClassListComponent as ClassListCrud } from './pages/class-crud/class-list/class-list.component.js';
import { ClassTypeListComponent } from './pages/class-type-crud/class-type-list/class-type-list.component.js';
import { ClientListComponent } from './pages/client-crud/clients-list/client-list.component.js';
import { CreateRoutinePageComponent } from './pages/Create Routine/create-routine-page/create-routine-page.component.js';
import { ExercisesListComponent } from './pages/Exercises/exercises-list/exercises-list.component.js';
import { LoginComponent } from './login/login.component.js';
import { MembershipTypesListComponent } from './membership-types-list/membership-types-list.component.js';
import { TrainersListComponent } from './trainers-list/trainers-list.component.js';
import { DailyRoutineComponent } from './pages/Record-Exercise-Execution/daily-routine/daily-routine.component.js';
import { MembershipsListComponent } from './memberships-list/memberships-list.component.js';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'classes', component: ClassListCrud },
  { path: 'class-types', component: ClassTypeListComponent },
  { path: 'clients', component: ClientListComponent },
  { path: 'create-routine', component: CreateRoutinePageComponent },
  { path: 'memberships', component: MembershipsListComponent },
  { path: 'record-exercise-execution', component: DailyRoutineComponent },
  { path: 'exercises', component: ExercisesListComponent },
  {
    path: 'membershiptypes',
    component: MembershipTypesListComponent,
  },
  { path: 'registration', component: ClassListComponent },
  { path: 'trainers', component: TrainersListComponent },
];
