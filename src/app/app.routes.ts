import { Routes } from '@angular/router';
import { ClientsListComponent } from './clients-list/clients-list.component.js';
import { TrainersListComponent } from './trainers-list/trainers-list.component.js';
import { LoginComponent } from './login/login.component.js';
import { ClassListComponent } from './class-list/class-list.component.js';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'clients', component: ClientsListComponent },
  { path: 'trainers', component: TrainersListComponent },
  { path: 'registration', component: ClassListComponent },
];
