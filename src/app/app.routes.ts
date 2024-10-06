import { Routes } from '@angular/router';
import { ClientsListComponent } from './clients-list/clients-list.component.js';
import { TrainersListComponent } from './trainers-list/trainers-list.component.js';
import { LoginComponent } from './login/login.component.js';
import { MembershipTypesListComponent } from './membership-types-list/membership-types-list.component.js';
import { CurrentMembershipsListComponent } from './current-memberships-list/current-memberships-list.component.js';
import { ClassListComponent } from './pages/Class-Registration/class-list/class-list.component.js';
import { CreateRoutinePageComponent } from './pages/Create Routine/create-routine-page/create-routine-page.component.js';
import { authGuard } from './guards/auth.guard.js';
import { DailyRoutineComponent } from './pages/Record-Exercise-Execution/daily-routine/daily-routine.component.js';
import { ExercisesListComponent } from './pages/Exercises/exercises-list/exercises-list.component.js';
import { HomePageComponent } from './pages/home-page/home-page.component.js';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'clients',
    component: ClientsListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'trainers',
    component: TrainersListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'registration',
    component: ClassListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'create-routine',
    component: CreateRoutinePageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'currentmemberships',
    component: CurrentMembershipsListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'record-exercise-execution',
    component: DailyRoutineComponent,
    canActivate: [authGuard],
  },
  {
    path: 'membershiptypes',
    component: MembershipTypesListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'trainers',
    component: TrainersListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'exercises',
    component: ExercisesListComponent,
    canActivate: [authGuard],
  },
  { path: 'home', component: HomePageComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
