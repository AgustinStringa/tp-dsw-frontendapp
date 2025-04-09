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

  daysPerWeekCount: { week: number; daysCount: number }[] = [];
  maxWeek = 0;
  maxWeekDaysCount = 0;

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

        this.calcleDaysPerWeek();

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

  calcleDaysPerWeek() {
    const weeks: Record<number, Set<number>> = this.exercisesRoutine.reduce(
      (acc, exercise) => {
        if (!acc[exercise.week]) {
          acc[exercise.week] = new Set<number>();
        }
        acc[exercise.week].add(exercise.day);
        return acc;
      },
      {} as Record<number, Set<number>>
    );

    this.daysPerWeekCount = Object.keys(weeks).map((week) => ({
      week: parseInt(week),
      daysCount: weeks[parseInt(week)].size,
    }));

    this.maxWeek = Math.max(
      ...this.daysPerWeekCount.map((weekInfo) => weekInfo.week)
    );
    this.maxWeekDaysCount =
      this.daysPerWeekCount.find((weekInfo) => weekInfo.week === this.maxWeek)
        ?.daysCount || 0;
  }

  getCurrentWeek(startDate: Date): number {
    return differenceInWeeks(new Date(), startDate) + 1;
  }

  nextDay() {
    const currentWeekDaysCount = this.daysPerWeekCount.find(
      (aux) => aux.week === this.selectedWeek
    )?.daysCount;

    if (currentWeekDaysCount && this.selectedDay + 1 <= currentWeekDaysCount) {
      this.selectedDay++;
    } else {
      const nextWeekDays = this.daysPerWeekCount.find(
        (aux) => aux.week === this.selectedWeek + 1
      )?.daysCount;

      if (nextWeekDays && nextWeekDays >= 1) {
        this.selectedWeek++;
        this.selectedDay = 1;
      }
    }
  }

  previousDay() {
    if (this.selectedDay - 1 > 0) this.selectedDay--;
    else {
      const previousWeekDays = this.daysPerWeekCount.find(
        (aux) => aux.week === this.selectedWeek - 1
      )?.daysCount;

      if (previousWeekDays && previousWeekDays >= 1) {
        this.selectedWeek--;
        this.selectedDay = previousWeekDays;
      }
    }
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
