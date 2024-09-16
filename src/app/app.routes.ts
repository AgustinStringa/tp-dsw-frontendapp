import { Routes } from '@angular/router';
import { ClientsListComponent } from './clients-list/clients-list.component.js';
import { TrainersListComponent } from './trainers-list/trainers-list.component.js';
import { LoginComponent } from './login/login.component.js';
import { MembershipTypesListComponent } from './membership-types-list/membership-types-list.component.js';
import { CurrentMembershipsListComponent } from './current-memberships-list/current-memberships-list.component.js';
import { CreateRoutinePageComponent } from './pages/Create Routine/create-routine-page/create-routine-page.component.js';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'clients', component: ClientsListComponent },
  { path: 'create-routine', component: CreateRoutinePageComponent },
  { path: 'currentmemberships', component: CurrentMembershipsListComponent },
  {
    path: 'membershiptypes',
    component: MembershipTypesListComponent,
  },
  { path: 'trainers', component: TrainersListComponent },
];
