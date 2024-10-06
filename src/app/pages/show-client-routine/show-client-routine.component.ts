import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.js';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import IRoutine from '../../core/interfaces/IRoutine.interface.js';
import { IExerciseRoutine } from '../../core/interfaces/exercise-routine.inteface.js';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-show-client-routine',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './show-client-routine.component.html',
  styleUrl: './show-client-routine.component.css',
})
export class ShowClientRoutineComponent {
  private urlRoutine: string = `${environment.routinesUrl}`;

  currentDayName: string = '';
  currentDayNumber: number = 0;
  userId: string = '6701c515d61090925fbbe8a1'; // ID hardcodeado del usuario
  routine: IRoutine | null = null;
  exercisesRoutine: IExerciseRoutine[] = [];
  startDate: string = '';
  endDate: string = '';
  currentWeek: string = '';
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

  constructor(private http: HttpClient) {
    this.loadRoutine();
  }

  loadRoutine(): void {
    const today = new Date();
    this.currentDayName = this.getDayName(today.getDay());
    this.currentDayNumber = today.getDate();

    this.http
      .get<{ message: string; data: IRoutine }>(
        `${this.urlRoutine}/${this.userId}/current`
      )
      .subscribe(
        (response) => {
          this.routine = response.data;
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
                weight: exerciseRoutine.weight || null,
              })
            );

            this.currentWeek = this.getCurrentWeek(
              new Date(this.routine.start),
              new Date(this.routine.end)
            );
          }
        },
        (error) => {
          console.error('Error loading routine:', error);
        }
      );
  }

  private getDayName(dayIndex: number): string {
    return this.daysOfWeek[dayIndex] || '';
  }

  private getCurrentWeek(dateStart: Date, dateEnd: Date): string {
    const start = new Date(dateStart);
    const end = new Date(dateEnd);
    const current = new Date();

    if (current < start || current > end) {
      return 'Fuera del rango de fechas';
    }

    const diffInMs = current.getTime() - start.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    const weekNumber = Math.floor(diffInDays / 7) + 1;
    return `${weekNumber}`;
  }
}
