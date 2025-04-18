import { authGuard } from './core/guards/auth.guard.js';
import { ClassListComponent } from './pages/class-crud/class-list/class-list.component.js';
import { ClassListComponent as ClassListComponentForClient } from './pages/class-registration/class-list/class-list.component.js';
import { ClassTypeListComponent } from './pages/class-type-crud/class-type-list/class-type-list.component.js';
import { clientGuard } from './core/guards/client.guard.js';
import { ClientListComponent } from './pages/client-crud/clients-list/client-list.component.js';
import { CreateRoutinePageComponent } from './pages/create-routine/create-routine-page/create-routine-page.component.js';
import { DailyRoutineComponent } from './pages/record-exercise-execution/daily-routine/daily-routine.component.js';
import { ExerciseListComponent } from './pages/exercise-crud/exercise-list/exercise-list.component.js';
import { GoalListComponent } from './pages/goal-crud/goal-list/goal-list.component.js';
import { HomeComponent } from './pages/home/home/home.component.js';
import { LoginComponent } from './pages/login/login.component';
import { MembershipListComponent } from './pages/membership-crud/membership-list/membership-list.component.js';
import { MembershipTypeListComponent } from './pages/membership-type-crud/membership-type-list/membership-type-list.component.js';
import { ProgressListComponent } from './pages/progress-crud/progress-list/progress-list.component.js';
import { Routes } from '@angular/router';
import { ShowClientRoutineComponent } from './pages/show-client-routine/show-client-routine.component.js';
import { trainerGuard } from './core/guards/trainer.guard.js';
import { TrainerListComponent } from './pages/trainer-crud/trainer-list/trainer-list.component.js';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'class-types',
    canActivate: [trainerGuard],
    component: ClassTypeListComponent,
  },
  {
    path: 'classes',
    canActivate: [trainerGuard],
    component: ClassListComponent,
  },
  {
    path: 'clients',
    component: ClientListComponent,
    canActivate: [trainerGuard],
  },
  {
    path: 'create-routine',
    component: CreateRoutinePageComponent,
    canActivate: [trainerGuard],
  },
  {
    path: 'exercises',
    component: ExerciseListComponent,
    canActivate: [trainerGuard],
  },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  {
    path: 'memberships',
    component: MembershipListComponent,
    canActivate: [trainerGuard],
  },
  {
    path: 'membership-types',
    component: MembershipTypeListComponent,
    canActivate: [trainerGuard],
  },
  {
    path: 'record-exercise-execution',
    component: DailyRoutineComponent,
    canActivate: [clientGuard],
  },
  {
    path: 'registration',
    component: ClassListComponentForClient,
    canActivate: [clientGuard],
  },
  {
    path: 'showClientRoutine',
    component: ShowClientRoutineComponent,
    canActivate: [clientGuard],
  },

  {
    path: 'goals',
    component: GoalListComponent,
    canActivate: [clientGuard],
  },

  {
    path: 'progresses',
    component: ProgressListComponent,
    canActivate: [clientGuard],
  },

  {
    path: 'trainers',
    component: TrainerListComponent,
    canActivate: [trainerGuard],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
