import { formatDate, NgStyle } from '@angular/common';
import { AddWeightDialogComponent } from '../add-weight-dialog/add-weight-dialog.component';
import { AuthService } from '../../../core/services/auth.service';
import { Component } from '@angular/core';
import { differenceInWeeks } from 'date-fns';
import { HttpErrorResponse } from '@angular/common/http';
import { IExerciseRoutine } from '../../../core/interfaces/exercise-routine.inteface';
import { IRoutine } from '../../../core/interfaces/routine.interface';
import { RoutineService } from '../../../core/services/routine.service';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-daily-routine',
  standalone: true,
  imports: [AddWeightDialogComponent, NgStyle],
  templateUrl: './daily-routine.component.html',
  styleUrls: [
    './daily-routine.component.css',
    '../../../../assets/styles/client-pages.css',
  ],
})
export class DailyRoutineComponent {
  routine: IRoutine | null = null;
  exercisesRoutine: IExerciseRoutine[] = [];
  startDate = '';
  endDate = '';
  selectedWeek = 0;
  selectedDay = 0;

  showModal = false;
  selectedExerciseRoutine: IExerciseRoutine | null = null;
  selectedWeight: number | null = null;
  userId = '';

  months: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  currentDate = new Date();
  currentNameOfTheMonth = this.months[this.currentDate.getMonth()];

  constructor(
    private authService: AuthService,
    private routineService: RoutineService,
    private snackbarService: SnackbarService
  ) {
    const user = this.authService.getUser();
    if (user) {
      this.userId = user.id;
      this.loadRoutine();
    }
  }

  loadRoutine(): void {
    this.routineService.getCurrentByClient(this.userId).subscribe({
      next: (res) => {
        this.routine = res.data;
        this.startDate =
          formatDate(this.routine.start, 'yyyy-MM-dd', 'en-US') || '';
        this.endDate =
          formatDate(this.routine.end, 'yyyy-MM-dd', 'en-US') || '';

        this.exercisesRoutine = this.routine.exercisesRoutine;
        this.selectedWeek = this.getCurrentWeek(new Date(this.routine.start));
        this.selectedDay = 1;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status !== 404) {
          if (err.error.isUserFriendly)
            this.snackbarService.showError(err.error.message);
          else
            this.snackbarService.showError(
              'Error al obtener su rutina actual.'
            );
        }
      },
    });
  }

  getCurrentWeek(startDate: Date): number {
    return differenceInWeeks(new Date(), startDate) + 1;
  }

  nextDay() {
    this.selectedDay++;
  }

  previousDay() {
    this.selectedDay--;
  }

  openModal(exerciseRoutine: IExerciseRoutine): void {
    this.selectedExerciseRoutine = exerciseRoutine;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveWeight(weight: number): void {
    if (this.selectedExerciseRoutine) {
      this.selectedExerciseRoutine.weight = weight;
      this.closeModal();
    }
  }

  getExerciseStatus(exerciseRoutine: IExerciseRoutine): string {
    if (exerciseRoutine.weight === 0) return 'Realizado';
    if (exerciseRoutine.weight === null) return 'No realizado';
    return `Realizado con ${exerciseRoutine.weight} Kg`;
  }
}
