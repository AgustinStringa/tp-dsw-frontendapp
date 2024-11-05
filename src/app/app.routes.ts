import { Routes } from '@angular/router';
import { ClassListComponent } from './pages/Class-Registration/class-list/class-list.component.js';
import { ClassListComponent as ClassListCrud } from './pages/class-crud/class-list/class-list.component.js';
import { ClassTypeListComponent } from './pages/class-type-crud/class-type-list/class-type-list.component.js';
import { ClientListComponent } from './pages/client-crud/clients-list/client-list.component.js';
import { CreateRoutinePageComponent } from './pages/Create Routine/create-routine-page/create-routine-page.component.js';
import { DailyRoutineComponent } from './pages/Record-Exercise-Execution/daily-routine/daily-routine.component.js';
import { ExerciseListComponent } from './pages/exercise-crud/exercise-list/exercise-list.component.js';
import { LoginComponent } from './login/login.component.js';
import { MembershipListComponent } from './pages/membership-crud/membership-list/membership-list.component.js';
import { MembershipTypeListComponent } from './pages/membership-type-crud/membership-type-list/membership-type-list.component.js';
import { TrainerListComponent } from './pages/trainer-crud/trainer-list/trainer-list.component.js';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'classes', component: ClassListCrud },
  { path: 'class-types', component: ClassTypeListComponent },
  { path: 'clients', component: ClientListComponent },
  { path: 'create-routine', component: CreateRoutinePageComponent },
  { path: 'exercises', component: ExerciseListComponent },
  { path: 'memberships', component: MembershipListComponent },
  {
    path: 'membership-types',
    component: MembershipTypeListComponent,
  },
  { path: 'record-exercise-execution', component: DailyRoutineComponent },
  { path: 'registration', component: ClassListComponent },
  { path: 'trainers', component: TrainerListComponent },
];
