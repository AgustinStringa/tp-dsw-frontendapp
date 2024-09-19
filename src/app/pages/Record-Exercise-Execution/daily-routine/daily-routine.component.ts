import { Component } from '@angular/core';
import IExerciseRoutine from '../../../core/interfaces/IExerciseRoutine.inteface.js';
import { environment } from '../../../../environments/environment.js';
import { formatDate, NgFor, NgIf } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import IRoutine from '../../../core/interfaces/IRoutine.interface.js';
import { FormsModule } from '@angular/forms';
import { DialogAddWeightComponent } from '../dialog-add-weight/dialog-add-weight.component.js';

@Component({
  selector: 'app-daily-routine',
  standalone: true,
  imports: [NgFor, NgIf, HttpClientModule, DialogAddWeightComponent],
  templateUrl: './daily-routine.component.html',
  styleUrl: './daily-routine.component.css',
})
export class DailyRoutineComponent {
  routine: IRoutine | null = null;
  exercisesRoutine: IExerciseRoutine[] = [];
  startDate: string = '';
  endDate: string = '';
  currentWeekAndMonth: string = '';
  currentDayName: string = '';
  showModal: boolean = false;
  selectedExerciseRoutine: IExerciseRoutine | null = null;
  selectedWeight: number | null = null;

  userId: string = '66e9b19b100c4d9c3024fc97'; // ID hardcodeado del usuario

  private urlRoutine: string = `${environment.routinesUrl}`;
  private daysOfWeek: string[] = [
    'domingo',
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
  ];
  private monthsOfYear: string[] = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ];

  constructor(private http: HttpClient) {
    this.loadRoutine();
  }

  loadRoutine(): void {
    const today = new Date();
    this.currentDayName = this.getDayName(today.getDay());
    this.currentWeekAndMonth = this.getCurrentWeekAndMonth(today);

    this.http
      .get<{ message: string; data: IRoutine }>(
        `${this.urlRoutine}/${this.userId}/current`
      )
      .subscribe(
        (response) => {
          console.log('Routine response:', response);
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
            // Actualiza la semana actual con el mes
            this.currentWeekAndMonth = this.getCurrentWeekAndMonth(
              new Date(this.routine.start)
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

  private getCurrentWeekAndMonth(date: Date): string {
    const start = new Date(date.getFullYear(), 0, 1);
    const diff = date.getTime() - start.getTime();
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    const weekNumber = Math.floor(diff / oneWeek) + 1;
    const monthName = this.monthsOfYear[date.getMonth()]; // Obtener el nombre del mes

    return `${monthName} - Semana ${weekNumber}`;
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
}
