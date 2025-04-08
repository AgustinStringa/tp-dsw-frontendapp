import { AddWeightDialogComponent } from '../add-weight-dialog/add-weight-dialog.component';
import { AuthService } from '../../../core/services/auth.service';
import { Component } from '@angular/core';
import { differenceInWeeks } from 'date-fns';
import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { IExerciseRoutine } from '../../../core/interfaces/exercise-routine.inteface';
import { IRoutine } from '../../../core/interfaces/routine.interface';
import { RoutineService } from '../../../core/services/routine.service';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-daily-routine',
  standalone: true,
  imports: [AddWeightDialogComponent],
  templateUrl: './daily-routine.component.html',
  styleUrl: '../../../../assets/styles/client-pages.css',
})
export class DailyRoutineComponent {
  routine: IRoutine | null = null;
  exercisesRoutine: IExerciseRoutine[] = [];
  startDate = '';
  endDate = '';
  currentWeek = 0;
  currentDayName = '';
  currentDayNumber = 0;
  showModal = false;
  selectedExerciseRoutine: IExerciseRoutine | null = null;
  selectedWeight: number | null = null;
  dayToday: number = new Date().getDay();
  userId = '';

  private daysOfWeek: string[] = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

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
    } else {
      //TODO quitar
      console.error('No user found in session. Redirecting or handling error.');
    }
  }

  loadRoutine(): void {
    const today = new Date();
    this.currentDayName = this.getDayName(today.getDay());
    this.currentDayNumber = today.getDate();

    this.routineService.getCurrentByClient(this.userId).subscribe({
      next: (res) => {
        this.routine = res.data;
        if (this.routine) {
          this.startDate =
            formatDate(this.routine.start, 'yyyy-MM-dd', 'en-US') || '';
          this.endDate =
            formatDate(this.routine.end, 'yyyy-MM-dd', 'en-US') || '';

          this.exercisesRoutine = this.routine.exercisesRoutine.map(
            (exerciseRoutine) => ({
              id: exerciseRoutine.id,
              exercise: exerciseRoutine.exercise,
              series: exerciseRoutine.series || 0,
              repetitions: exerciseRoutine.repetitions || 0,
              day: exerciseRoutine.day,
              week: exerciseRoutine.week,
              weight: exerciseRoutine.weight,
            })
          );

          this.currentWeek = this.getCurrentWeek(new Date(this.routine.start));
        }
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

  private getDayName(dayIndex: number): string {
    return this.daysOfWeek[dayIndex] || '';
  }

  getCurrentWeek(startDate: Date): number {
    return differenceInWeeks(new Date(), startDate) + 1;
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
