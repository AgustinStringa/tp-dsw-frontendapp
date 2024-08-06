import { Routes } from '@angular/router';
import { ClientsListComponent } from './clients-list/clients-list.component.js';
import { TrainersListComponent } from './trainers-list/trainers-list.component.js';
export const routes: Routes = [
  { path: 'clients', component: ClientsListComponent },
  { path: 'trainers', component: TrainersListComponent },
];
