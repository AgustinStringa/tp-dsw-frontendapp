import { Component } from '@angular/core';
import { IExerciseRoutine } from '../../../core/interfaces/exercise-routine.inteface.js';
import { environment } from '../../../../environments/environment.js';
import { formatDate, NgFor, NgIf } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import IRoutine from '../../../core/interfaces/IRoutine.interface.js';
import { FormsModule } from '@angular/forms';
import { DialogAddWeightComponent } from '../dialog-add-weight/dialog-add-weight.component.js';
import { AuthService } from '../../../services/auth.service.js';

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
  currentWeek: string = '';
  currentDayName: string = '';
  currentDayNumber: number = 0;
  showModal: boolean = false;
  selectedExerciseRoutine: IExerciseRoutine | null = null;
  selectedWeight: number | null = null;
  dayToday: number = new Date().getDay();
  userId: string = '';

  private urlRoutine: string = `${environment.routinesUrl}`;
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
  //TODO: Enviar sesión del cliente por el modal.
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
