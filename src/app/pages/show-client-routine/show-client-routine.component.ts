import {
  MatExpansionModule,
  MatExpansionPanel,
} from '@angular/material/expansion';
import { AuthService } from '../../core/services/auth.service';
import { Component } from '@angular/core';
import { differenceInWeeks } from 'date-fns';
import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { IExerciseRoutine } from '../../core/interfaces/exercise-routine.inteface';
import { IRoutine } from '../../core/interfaces/routine.interface';
import { RoutineService } from '../../core/services/routine.service';

@Component({
  selector: 'app-show-client-routine',
  standalone: true,
  imports: [MatExpansionPanel, MatExpansionModule],
  templateUrl: './show-client-routine.component.html',
  styleUrls: [
    './show-client-routine.component.css',
    '../../../assets/styles/client-pages.css',
  ],
})
export class ShowClientRoutineComponent {
  currentDayName = '';
  currentDayNumber = 0;
  userId = '';
  routine: IRoutine | null = null;
  exercisesRoutine: IExerciseRoutine[] = [];
  startDate = '';
  endDate = '';
  currentWeek = 0;
  totalWeeks: number[] = [];
  errorCode = -1;

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
  currentMonthName = this.months[this.currentDate.getMonth()];

  constructor(
    private authService: AuthService,
    private routineService: RoutineService
  ) {
    const user = this.authService.getUser();
    if (user) {
      this.userId = user.id;
      this.loadRoutine();
    }
  }

  loadRoutine(): void {
    const today = new Date();
    this.currentDayName = this.getDayName(today.getDay());
    this.currentDayNumber = today.getDate();

    this.routineService.getCurrentByClient(this.userId)
      .subscribe({
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

            this.currentWeek = this.getCurrentWeek(
              new Date(this.routine.start)
            );
            this.totalWeeks = this.getWeeksArray(
              new Date(this.routine.start),
              new Date(this.routine.end)
            );
          }
        },
        error: (err: HttpErrorResponse) => {
          this.errorCode = err.status;
        },
      });
  }

  getDayName(dayIndex: number): string {
    return this.daysOfWeek[dayIndex] || '';
  }

  getCurrentWeek(startDate: Date): number {
    return differenceInWeeks(new Date(), startDate) + 1;
  }

  getWeeksArray(startDate: Date, endDate: Date): number[] {
    const totalWeeks = differenceInWeeks(endDate, startDate) + 1;
    return Array.from({ length: totalWeeks }, (_, index) => index + 1);
  }

  activePanels: Record<number, boolean> = {};

  togglePanel(week: number): void {
    this.activePanels[week] = !this.activePanels[week];
  }

  hasExercisesForWeek(week: number): boolean {
    return this.exercisesRoutine.some((routine) => routine.week === week);
  }

  hasExercisesForDay(week: number, day: number): boolean {
    return this.exercisesRoutine.some(
      (routine) => routine.week === week && routine.day === day
    );
  }

  getExercisesForWeekAndDay(week: number, day: number): IExerciseRoutine[] {
    return this.exercisesRoutine.filter(
      (routine) => routine.week === week && routine.day === day
    );
  }

  getExerciseStatus(exerciseRoutine: IExerciseRoutine): string {
    if (exerciseRoutine.weight === 0) return 'Realizado';
    if (exerciseRoutine.weight === null) return 'No realizado';
    return `Realizado con ${exerciseRoutine.weight} Kg`;
  }

  Array(count: number) {
    return new Array(count).fill(0);
  }
}
