import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard.js';
import { ClassListComponent } from './pages/class-crud/class-list/class-list.component.js';
import { ClassTypeListComponent } from './pages/class-type-crud/class-type-list/class-type-list.component.js';
import { clientGuard } from './guards/client.guard.js';
import { ClientListComponent } from './pages/client-crud/clients-list/client-list.component.js';
import { CreateRoutinePageComponent } from './pages/create-routine/create-routine-page/create-routine-page.component.js';
import { DailyRoutineComponent } from './pages/Record-Exercise-Execution/daily-routine/daily-routine.component.js';
import { ExerciseListComponent } from './pages/exercise-crud/exercise-list/exercise-list.component.js';
import { HomePageComponent } from './pages/home-page/home-page.component.js';
import { LoginComponent } from './login/login.component.js';
import { MembershipListComponent } from './pages/membership-crud/membership-list/membership-list.component.js';
import { MembershipTypeListComponent } from './pages/membership-type-crud/membership-type-list/membership-type-list.component.js';
import { trainerGuard } from './guards/trainer.guard.js';
import { TrainerListComponent } from './pages/trainer-crud/trainer-list/trainer-list.component.js';
import { ShowClientRoutineComponent } from './pages/show-client-routine/show-client-routine.component.js';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'class-types',
    canActivate: [authGuard, trainerGuard],
    component: ClassTypeListComponent,
  },
  {
    path: 'classes',
    canActivate: [authGuard, trainerGuard],
    component: ClassListComponent,
  },
  {
    path: 'clients',
    component: ClientListComponent,
    canActivate: [authGuard, trainerGuard],
  },
  {
    path: 'create-routine',
    component: CreateRoutinePageComponent,
    canActivate: [authGuard, trainerGuard],
  },
  {
    path: 'exercises',
    component: ExerciseListComponent,
    canActivate: [authGuard, trainerGuard],
  },
  { path: 'home', component: HomePageComponent, canActivate: [authGuard] },
  {
    path: 'memberships',
    component: MembershipListComponent,
    canActivate: [authGuard, trainerGuard],
  },
  {
    path: 'membership-types',
    component: MembershipTypeListComponent,
    canActivate: [authGuard, trainerGuard],
  },
  {
    path: 'record-exercise-execution',
    component: DailyRoutineComponent,
    canActivate: [authGuard, clientGuard],
  },
  {
    path: 'registration',
    component: ClassListComponent,
    canActivate: [authGuard, clientGuard],
  },
  {
    path: 'showClientRoutine',
    component: ShowClientRoutineComponent,
    canActivate: [authGuard, clientGuard],
  },

  {
    path: 'trainers',
    component: TrainerListComponent,
    canActivate: [authGuard, trainerGuard],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
