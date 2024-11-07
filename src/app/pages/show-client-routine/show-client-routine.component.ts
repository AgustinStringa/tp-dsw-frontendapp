import { Component } from '@angular/core';
import { differenceInWeeks } from 'date-fns';
import { formatDate } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  MatExpansionModule,
  MatExpansionPanel,
} from '@angular/material/expansion';
import { environment } from '../../../environments/environment.js';
import IRoutine from '../../core/interfaces/IRoutine.interface.js';
import { AuthService } from '../../services/auth.service.js';
import { IExerciseRoutine } from '../../core/interfaces/exercise-routine.inteface.js';

@Component({
  selector: 'app-show-client-routine',
  standalone: true,
  imports: [MatExpansionPanel, MatExpansionModule],
  templateUrl: './show-client-routine.component.html',
  styleUrl: './show-client-routine.component.css',
})
export class ShowClientRoutineComponent {
  currentDayName: string = '';
  currentDayNumber: number = 0;
  userId: string = '';
  routine: IRoutine | null = null;
  exercisesRoutine: IExerciseRoutine[] = [];
  startDate: string = '';
  endDate: string = '';
  currentWeek: number = 0;
  totalWeeks: number[] = [];
  errorCode: number = -1;

  private daysOfWeek: string[] = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
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

  constructor(private http: HttpClient, private authService: AuthService) {
    const user = this.authService.getUser();
    if (user) {
      this.userId = user.id;
      this.loadRoutine();
    } else {
      console.error('No user found in session. Redirecting or handling error.');
    }
  }

  loadRoutine(): void {
    const today = new Date();
    this.currentDayName = this.getDayName(today.getDay());
    this.currentDayNumber = today.getDate();

    this.http
      .get<{ message: string; data: IRoutine }>(
        `${environment.routinesUrl}/${this.userId}/current`
      )
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

  activePanels: { [key: number]: boolean } = {};

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
